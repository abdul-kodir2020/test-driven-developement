export function getCombinations<T>(array: T[], size: number): T[][] {
  if (size === 0) return [[]];
  if (array.length === 0) return [];

  const [first, ...rest] = array;
  const withFirst = getCombinations(rest, size - 1).map(c => [first, ...c]);
  const withoutFirst = getCombinations(rest, size);

  return [...withFirst, ...withoutFirst];
}