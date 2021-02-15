import { Machine, assign, spawn } from 'xstate';

import { createCellMachine } from './cell';

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
        ref: spawn(createCellMachine({ row: r, column: columnCode })),
      };
    }
  }

  return map;
}

export const cellsStates = {};

export const cellsActions = {
  INCREMENT: 'INCREMENT',
  RESET: 'RESET',
};

const INITIAL_ROWS = 10;
const INITIAL_COLUMNS = 10;

const cellsMachine = Machine({
  id: 'cells',
  initial: 'active',
  context: {
    rows: INITIAL_ROWS,
    columns: INITIAL_COLUMNS,
    cells: null,
  },
  states: {
    active: {
      entry: assign({
        cells: (context) => buildCellDataMap(context.rows, context.columns),
      }),
      on: {
        [cellsActions.INCREMENT]: {
          actions: assign({ count: (context) => context.count + 1 }),
        },
        [cellsActions.RESET]: {
          actions: assign({ count: () => 0 }),
        },
      },
    },
  },
});

export default cellsMachine;
