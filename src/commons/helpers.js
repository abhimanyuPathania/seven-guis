export function roundToTwo(num) {
  return Math.round(num * 100 + Number.EPSILON) / 100;
}
