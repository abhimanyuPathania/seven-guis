export function getCellId(row, column) {
  return `${row}${column}`;
}

export function isValueAFormula(value) {
  return value[0] === '=';
}

export const rangeFormulaRegex = new RegExp(
  '^=([a-z]+)\\(([a-z]\\d+):([a-z]\\d+)\\)$',
);

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
      return (sum / (rowEnd - rowStart + 1)).toFixed(2);
    default:
      return '';
  }
}
