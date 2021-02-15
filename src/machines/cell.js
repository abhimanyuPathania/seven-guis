import { Machine, assign, sendParent, actions } from 'xstate';

function getCellId(row, column) {
  return `${row}${column}`;
}

export const cellStates = {
  ACTIVE: 'ACTIVE',
};

export const cellActions = {
  UPDATE_VALUE: 'UPDATE_VALUE',
};

export const createCellMachine = ({ row, column }) =>
  Machine(
    {
      id: getCellId(row, column),
      initial: cellStates.ACTIVE,
      context: {
        row,
        column,
        value: '',
      },
      states: {
        [cellStates.ACTIVE]: {
          on: {
            [cellActions.UPDATE_VALUE]: {
              actions: assign({ value: (_, event) => event.value }),
            },
          },
        },
      },
    },
    {
      actions: {},
      guards: {},
    },
  );
