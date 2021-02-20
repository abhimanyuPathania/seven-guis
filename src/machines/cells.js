import { Machine, assign, spawn, actions, send } from 'xstate';

import { createCellMachine, cellActions } from './cell';
import {
  getCellId,
  isValueAFormula,
  computeFormula,
  getColumnCode,
  getCellFromCellId,
  INITIAL_COLUMNS,
  INITIAL_ROWS,
} from '../commons/cells';

function buildCellDataMap(rows, colums) {
  const map = {};

  for (let r = 1; r <= rows; r += 1) {
    for (let c = 1; c <= colums; c += 1) {
      if (!map[r]) {
        map[r] = {};
      }
      const columnCode = getColumnCode(c);
      map[r][columnCode] = {
        row: r,
        column: columnCode,
        value: '',
        ref: spawn(createCellMachine({ row: r, column: columnCode }), {
          name: getCellId(r, columnCode),
        }),
      };
    }
  }

  return map;
}

const cellsMachine = Machine(
  {
    id: 'cells',
    initial: 'active',
    context: {
      rows: INITIAL_ROWS,
      columns: INITIAL_COLUMNS,
      cells: null,
      formulas: {},
    },
    states: {
      active: {
        entry: assign({
          cells: (context) => buildCellDataMap(context.rows, context.columns),
        }),
        on: {
          [cellActions.CELL_VALUE_CHANGED]: {
            actions: [
              'updateCellValueAndFormulas',
              'computeFormulas',
              'notifyFormulaCells',
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      updateCellValueAndFormulas: assign((context, event) => {
        const { formulas, cells } = context;
        const { value, row, column } = event;
        const isFormula = isValueAFormula(value);
        const cellId = getCellId(row, column);

        // add to formulas
        if (isFormula) formulas[cellId] = value;
        // remove from formulas if it was earlier a formula
        if (!isFormula && formulas[cellId]) delete formulas[cellId];
        // update cell value
        cells[row][column].value = value;

        return { formulas, cells };
      }),
      computeFormulas: assign((context) => {
        const { formulas, cells } = context;
        const computedFormulas = {};
        // compute all formulas
        Object.keys(formulas).forEach((cellId) => {
          const cellFormula = formulas[cellId];
          const computedValue = computeFormula(cellFormula, cells);
          computedFormulas[cellId] = computedValue;
        });
        // update cell values to computed values
        Object.keys(computedFormulas).forEach((cellId) => {
          const computedValue = computedFormulas[cellId];
          const cell = getCellFromCellId(cells, cellId);
          cell.value = computedValue;
        });
        return { cells: { ...cells } };
      }),
      notifyFormulaCells: actions.pure((context) => {
        const { formulas, cells } = context;
        const events = Object.keys(formulas).map((cellId) => {
          const cell = getCellFromCellId(cells, cellId);
          return send(
            {
              type: cellActions.CELL_FORMULA_COMPUTED,
              computedValue: cell.value,
            },
            { to: cell.ref },
          );
        });

        return events;
      }),
    },
  },
);

export default cellsMachine;
