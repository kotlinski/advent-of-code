import { sortRocks } from './rock-sorter';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { memoize } from '../../common/cache';
import { Direction } from '../../common/matrix/grid/direction';
import { Grid } from '../../common/matrix/grid/grid';
import { Tile } from '../../common/matrix/grid/tile';

export type RockType = '#' | '.' | 'O';

export class MirrorDisc {
  private readonly disc: Grid<RockType>;
  private readonly memo_sort: (direction: Direction, values: RockType[]) => RockType[];

  constructor(disc_input: string) {
    const disc_matrix = disc_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((row) => row.split('') as RockType[]);
    this.disc = new Grid<RockType>(disc_matrix);
    this.memo_sort = memoize<[Direction, RockType[]], RockType[]>(sortRocks, (input) => `${input[0]}${input[1].join()}`);
  }
  toString(): string {
    return this.disc.toString();
  }

  public countLoad(): number {
    return this.disc.traverseRows((sum, row, index, values) => {
      const count = values.filter((value) => value === 'O').length;
      sum += count * (this.disc.height - index);
      return sum;
    }, 0);
  }

  public flip(direction: Direction): void {
    const rock_roller_callback_function = this.getRockRollerCallback(direction);
    if (['up', 'down'].includes(direction)) {
      this.disc.traverseColumns(rock_roller_callback_function);
    } else {
      this.disc.traverseRows(rock_roller_callback_function);
    }
  }

  /**
   * Callback when traversing rows/columns
   * Will tilt to the given direction
   */
  private getRockRollerCallback(direction: Direction) {
    return (_prev: Tile<RockType>, tiles: Tile<RockType>[], index: number, values: RockType[]) => {
      // tilt values in row/column depending direction
      const sorted_values = this.memo_sort(direction, values);

      // replace values in the grid.
      for (let i = 0; i < tiles.length; i++) {
        tiles[i].value = sorted_values[i];
      }
    };
  }

  cycle() {
    // console.time('cycle');
    (['up', 'left', 'down', 'right'] as Direction[]).forEach((direction: Direction) => {
      this.flip(direction);
    });
    // console.timeEnd('cycle');
  }
}
