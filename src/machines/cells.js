import { Machine, assign, spawn, actions, send } from 'xstate';

import { createCellMachine, cellActions, getCellId } from './cell';

// columnNumber is '1' indexed
export function getColumnCode(columnNumber) {
  return String.fromCharCode(columnNumber + 64);
}

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
        ref: spawn(createCellMachine({ row: r, column: columnCode })),
      };
    }
  }

  return map;
}

export const cellsStates = {};

export const cellsActions = {};

const INITIAL_ROWS = 1;
const INITIAL_COLUMNS = 2;

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
              'onChangeCellValue',
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
      onChangeCellValue: assign((context, event) => {
        const { cells, formulas } = context;
        const { value, row, column } = event;
        const cellId = getCellId(row, column);
        console.log('onChangeCellValue', context);
        return { formulas };
      }),
      computeFormulas: assign((context, event) => {
        console.log('computeFormulas');
        return context;
      }),
      notifyFormulaCells: send(
        { type: cellActions.CELL_FORMULA_COMPUTED },
        {
          to: (context, event) => {
            const { cells } = context;
            const { row, column } = event;
            return cells[row][column].ref;
          },
        },
      ),
    },
  },
);

export default cellsMachine;
