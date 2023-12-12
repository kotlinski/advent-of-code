import { Direction } from '../../common/matrix/grid/interface';

export function getCompareValuesInDirection(
  direction: Direction,
  row_index: number,
  tree_matrix: number[][],
  column_index: number,
  row: number[],
) {
  const compare_values: number[] = [];
  switch (direction) {
    case 'up':
      for (let row_i = 0; row_i < row_index; row_i++) {
        compare_values.push(tree_matrix[row_i][column_index]);
      }
      break;
    case 'down':
      for (let row_i = row_index + 1; row_i < tree_matrix.length; row_i++) {
        compare_values.push(tree_matrix[row_i][column_index]);
      }
      compare_values.reverse();
      break;
    case 'left':
      compare_values.push(...row.slice(0, column_index));
      break;
    case 'right':
      compare_values.push(...row.slice(column_index + 1, row.length));
      compare_values.reverse();
      break;
  }
  return compare_values;
}

export function isFullyVisibleInDirection(
  tree_matrix: number[][],
  row_index: number,
  column_index: number,
): (direction: Direction) => boolean {
  const tree_height = tree_matrix[row_index][column_index];
  const row = tree_matrix[row_index];
  return (direction: Direction): boolean => {
    const compare_values = getCompareValuesInDirection(direction, row_index, tree_matrix, column_index, row);
    return compare_values.every((compare_value) => compare_value < tree_height);
  };
}

export function numberOfVisibleTreesInDirection(
  tree_matrix: number[][],
  row_index: number,
  column_index: number,
): (direction: Direction) => number {
  const tree_height = tree_matrix[row_index][column_index];
  const row = tree_matrix[row_index];
  return (direction: Direction): number => {
    const compare_values = getCompareValuesInDirection(direction, row_index, tree_matrix, column_index, row);
    let count = 0;
    while (compare_values.length > 0) {
      count++;
      if (compare_values.pop()! >= tree_height) {
        return count;
      }
    }
    return count;
  };
}
