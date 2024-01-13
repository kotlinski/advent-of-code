import { RockType } from './mirror-disc';
import { Direction } from '../../common/matrix/grid/direction';

/**
 * Rock type '#' should be un touched
 * Round Rocks 'O' should roll over to empty Spots '.'
 */
export function sortRocks(direction: Direction, values: RockType[]) {
  const sort_direction = ['down', 'right'].includes(direction) ? -1 : 1;
  const chunks: RockType[][] = chunkByArrayItem(values, '#');
  return chunks.flatMap((num: RockType[], index: number) => {
    num.sort((s1: RockType, s2: RockType) => (s1 < s2 ? sort_direction : -sort_direction));
    if (index !== chunks.length - 1) num.push('#');
    return num;
  });
}

/**
 * Will omit the separator and return an array of arrays with the other array items
 */
function chunkByArrayItem(values: RockType[], separator: RockType): RockType[][] {
  return values.reduce(
    (group: RockType[][], value: RockType) => {
      if (value === separator) {
        group.push([]);
      } else {
        group.at(-1)!.push(value);
      }
      return group;
    },
    [[]],
  );
}
