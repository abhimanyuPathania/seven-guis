import { Machine, assign } from 'xstate';

function buildCellDataMap(rows, colums) {
  const map = {};

  for (let r = 1; r <= rows; r += 1) {
    for (let c = 1; c <= colums; c += 1) {
      if (!map[r]) {
        map[r] = {};
      }
      map[r][c] = { row: r, column: c };
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
    colums: INITIAL_COLUMNS,
    cells: buildCellDataMap(INITIAL_ROWS, INITIAL_COLUMNS),
  },
  states: {
    active: {
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
