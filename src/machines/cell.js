import { Machine, assign, sendParent, actions } from 'xstate';

export function getCellId(row, column) {
  return `${row}${column}`;
}

function sanitizeCellValue(value) {
  const trimmedValue = value.trim();
  let sanitizedValue = trimmedValue;

  if (trimmedValue[0] === '=') {
    // formula
    sanitizedValue = trimmedValue;
  } else if (!Number.isNaN(Number(trimmedValue))) {
    // entered value is a valid number
    sanitizedValue = trimmedValue;
  } else {
    // clear all other values
    sanitizedValue = '';
  }

  return sanitizedValue;
}

function isValueFormula(value) {
  return value[0] === '=';
}

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
      },
      states: {
        [cellStates.VIEWING]: {
          initial: cellStates.VIEWING_VALUE,
          entry: actions.choose([
            {
              cond: 'hasValueChanged',
              actions: [
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
              actions: actions.log('child::CELL_FORMULA_COMPUTED'),
            },
          },
        },
        [cellStates.EDITING]: {
          entry: assign({ previousValue: (context) => context.value }),
          on: {
            [cellActions.UPDATE_VALUE]: {
              actions: assign({ value: (_, event) => event.value }),
            },
            [cellActions.VIEW_CELL]: cellStates.VIEWING,
          },
          exit: assign({
            value: (context) => sanitizeCellValue(context.value),
          }),
        },
      },
    },
    {
      actions: {},
      guards: {
        isValueFormula: (context) => isValueFormula(context.value),
        isValue: (context) => !isValueFormula(context.value),
        hasValueChanged: (context) => context.previousValue !== context.value,
      },
    },
  );
