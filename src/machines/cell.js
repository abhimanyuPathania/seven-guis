import { Machine, assign, sendParent, actions } from 'xstate';

import { getCellId, sanitizeCellValue, getInputErrors } from '../commons/cells';

export const cellStates = {
  VIEWING: 'VIEWING',
  EDITING: 'EDITING',
};

export const cellActions = {
  EDIT_CELL: 'EDIT_CELL',
  VIEW_CELL: 'VIEW_CELL',
  UPDATE_VALUE: 'UPDATE_VALUE',
  CELL_VALUE_CHANGED: 'CELL_VALUE_CHANGED',
  CELL_FORMULA_COMPUTED: 'CELL_FORMULA_COMPUTED',
};

export const createCellMachine = ({ row, column }) =>
  Machine(
    {
      id: getCellId(row, column),
      initial: cellStates.VIEWING,
      context: {
        row,
        column,
        value: '',
        previousValue: '',
        computedValue: '',
        inputError: '',
      },
      states: {
        [cellStates.VIEWING]: {
          initial: cellStates.VIEWING_VALUE,
          entry: actions.choose([
            {
              cond: 'hasValueChanged',
              actions: [
                assign({
                  computedValue: () => '',
                }),
                sendParent((context) => ({
                  type: cellActions.CELL_VALUE_CHANGED,
                  row: context.row,
                  column: context.column,
                  value: context.value,
                })),
              ],
            },
          ]),
          on: {
            [cellActions.EDIT_CELL]: cellStates.EDITING,
            [cellActions.CELL_FORMULA_COMPUTED]: {
              actions: assign({
                computedValue: (_, event) => event.computedValue,
              }),
            },
          },
        },
        [cellStates.EDITING]: {
          entry: assign({
            previousValue: (context) => context.value,
            inputError: '',
          }),
          on: {
            [cellActions.UPDATE_VALUE]: {
              actions: assign({ value: (_, event) => event.value }),
            },
            [cellActions.VIEW_CELL]: cellStates.VIEWING,
          },
          exit: assign({
            inputError: (context) => getInputErrors(context.value),
            value: (context) => sanitizeCellValue(context.value),
          }),
        },
      },
    },
    {
      actions: {},
      guards: {
        hasValueChanged: (context) => context.previousValue !== context.value,
      },
    },
  );
