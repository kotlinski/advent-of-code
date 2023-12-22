import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { Grid } from '../../common/matrix/grid/grid';
import { Tile } from '../../common/matrix/grid/tile';

type GridType = '#' | '.' | 'O';

export class MirrorDisc {
  private readonly disc: Grid<GridType>;
  constructor(disc_input: string) {
    const disc_matrix = disc_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((row) => row.split('') as GridType[]);
    this.disc = new Grid<GridType>(disc_matrix);
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
  public flipNorth(): void {
    this.disc.traverseColumns((_prev, column) => {
      let swap_count = 0;
      do {
        swap_count = 0;
        for (const tile of column) {
          if (['#'].includes(tile.value)) continue; // non moving tile types
          const tile_down = this.disc.getTileAtCoordinate(tile.findCoordinateInDirection('down'));
          if (!tile_down || ['#', '.'].includes(tile_down.value)) continue; // non movable spaces
          if (tile.value === tile_down.value) continue;
          this.swapValues(tile, tile_down);
          swap_count++;
        }
      } while (swap_count !== 0);
    });
  }

  private swapValues(tile_a: Tile<GridType>, tile_b: Tile<GridType>) {
    const swap = tile_a.value;
    tile_a.value = tile_b.value;
    tile_b.value = swap;
  }
}
