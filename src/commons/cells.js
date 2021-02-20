import { roundToTwo } from './helpers';

export const INITIAL_ROWS = 10;
export const INITIAL_COLUMNS = 10;
export const rangeFormulaRegex = new RegExp(
  '^=([a-z]+)\\(([a-z]\\d+):([a-z]\\d+)\\)$',
);
export const OPERATIONS = ['sum', 'avg'];

export function getCellId(row, column) {
  return `${row}${column}`;
}

export function getCellFromCellId(cells, cellId) {
  const id = cellId.toUpperCase();
  return cells[id[0]][id[1]];
}

// columnNumber is '1' indexed
export function getColumnCode(columnNumber) {
  return String.fromCharCode(columnNumber + 64);
}

export function isValueAFormula(value) {
  return value[0] === '=';
}

export function getFormulaError(formula) {
  const matchResult = formula.toLowerCase().match(rangeFormulaRegex);

  if (!matchResult) {
    return `Invalid formula entered: ${formula}`;
  }

  let [, operation, fromCell, toCell] = matchResult;

  if (!OPERATIONS.includes(operation))
    return 'Only "sum" and "avg" operations are supported';

  const fromCellId = fromCell.toUpperCase();
  const toCellId = toCell.toUpperCase();
  const column = fromCellId[0];
  const columnIndex = column.charCodeAt() - 64;
  const rowStart = parseInt(fromCellId.slice(1), 0);
  const rowEnd = parseInt(toCellId.slice(1), 0);

  if (
    rowStart === 0 ||
    rowEnd === 0 ||
    rowStart > INITIAL_ROWS ||
    rowEnd > INITIAL_ROWS ||
    rowStart >= rowEnd ||
    columnIndex === 0 ||
    columnIndex > INITIAL_COLUMNS
  ) {
    return `Invalid range entered: ${fromCellId.toUpperCase()} to ${toCellId.toUpperCase()}`;
  }

  return '';
}

export function sanitizeCellValue(value) {
  const trimmedValue = value.trim();

  if (trimmedValue[0] === '=' && !getFormulaError(value)) {
    // valid formula
    return trimmedValue;
  } else if (!Number.isNaN(Number(trimmedValue))) {
    // entered value is a valid number
    return trimmedValue;
  } else {
    // clear all other values
    return '';
  }
}

export function getInputErrors(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) return '';

  if (trimmedValue[0] === '=') return getFormulaError(value);

  if (Number.isNaN(Number(trimmedValue))) {
    return 'Only numbers and formulas are allowed';
  }

  return '';
}

export function computeFormula(formula, cells) {
  let [, operation, fromCell, toCell] = formula
    .toLowerCase()
    .match(rangeFormulaRegex);
  const fromCellId = fromCell.toUpperCase();
  const toCellId = toCell.toUpperCase();
  const column = fromCellId[0];
  const rowStart = parseInt(fromCellId.slice(1), 0);
  const rowEnd = parseInt(toCellId.slice(1), 0);
  let sum = 0;

  for (let r = rowStart; r <= rowEnd; r += 1) {
    const cellValue = cells[r][column].value;
    const cellValueSanitized = Number.isNaN(cellValue)
      ? 0
      : parseFloat(cellValue);
    sum += cellValueSanitized;
  }

  switch (operation) {
    case 'sum':
      return sum.toString();
    case 'avg':
      return roundToTwo(sum / (rowEnd - rowStart + 1));
    default:
      return '';
  }
}
