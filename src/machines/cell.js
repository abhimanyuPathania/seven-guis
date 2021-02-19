import { Machine, assign, sendParent, actions } from 'xstate';

function getCellId(row, column) {
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
  VIEWING_VALUE: 'VALUE',
  VIEWING_FORMULA: 'FORMULA',
  EDITING: 'EDITING',
};

export const cellActions = {
  EDIT_CELL: 'EDIT_CELL',
  VIEW_CELL: 'VIEW_CELL',
  UPDATE_VALUE: 'UPDATE_VALUE',
  CLEAR_VALUE: 'CLEAR_VALUE',
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
      },
      states: {
        [cellStates.VIEWING]: {
          initial: cellStates.VIEWING_VALUE,
          states: {
            [cellStates.VIEWING_VALUE]: {},
            [cellStates.VIEWING_FORMULA]: {},
          },
          on: {
            [cellActions.EDIT_CELL]: cellStates.EDITING,
          },
        },
        [cellStates.EDITING]: {
          on: {
            [cellActions.UPDATE_VALUE]: {
              actions: assign({ value: (_, event) => event.value }),
            },
            [cellActions.CLEAR_VALUE]: {
              actions: assign({ value: () => '' }),
            },
            [cellActions.VIEW_CELL]: [
              {
                target: `${cellStates.VIEWING}.${cellStates.VIEWING_VALUE}`,
                cond: 'isValue',
              },
              {
                target: `${cellStates.VIEWING}.${cellStates.VIEWING_FORMULA}`,
                cond: 'isValueFormula',
              },
            ],
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
      },
    },
  );
