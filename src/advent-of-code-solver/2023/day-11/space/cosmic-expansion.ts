import { removeEmptyLinesPredicate } from '../../../common/array-operations/filter.js';
import { Grid } from '../../../common/matrix/grid/grid.js';
import { Tile } from '../../../common/matrix/grid/tile.js';

export type SpaceChar = '#' | '.';
export type SpaceTile = Tile<SpaceChar>;

export class CosmicExpansion {
  private readonly space: Grid<SpaceChar>;
  private readonly galaxies: SpaceTile[];
  private readonly empty_x_indexes: number[];
  private readonly empty_y_indexes: number[];
  constructor(input: string) {
    const old_space_input = input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split('') as SpaceChar[]);

    this.space = new Grid<SpaceChar>(old_space_input);
    this.empty_x_indexes = this.space.traverseColumns((prev: number[], tiles: SpaceTile[], index: number) => {
      if (this.isEmpty(tiles)) {
        prev.push(index);
      }
      return prev;
    }, []);
    this.empty_y_indexes = this.space.traverseRows((prev: number[], tiles: SpaceTile[], index: number) => {
      if (this.isEmpty(tiles)) {
        prev.push(index);
      }
      return prev;
    }, []);

    this.galaxies = [];
    this.space.traverseTiles((tile) => {
      if (tile.value === '#') this.galaxies.push(tile);
    });
  }
  private isEmpty(tiles: SpaceTile[]) {
    return tiles.every((tile) => tile.value === '.');
  }

  findSumOfShortestPathDistances(multiplier: number) {
    let sum = 0;
    for (let i = 0; i < this.galaxies.length - 1; i++) {
      for (let j = i + 1; j < this.galaxies.length; j++) {
        sum += this.distanceBetweenTiles(this.galaxies[i], this.galaxies[j], multiplier);
      }
    }
    return sum;
  }
  public distanceBetweenTiles(tile_a: SpaceTile, tile_b: SpaceTile, multiplier: number): number {
    let crossings = 0;
    crossings += this.empty_x_indexes.filter((x) => (tile_a.x < x && tile_b.x > x) || (tile_a.x > x && tile_b.x < x)).length;
    crossings += this.empty_y_indexes.filter((y) => (tile_a.y < y && tile_b.y > y) || (tile_a.y > y && tile_b.y < y)).length;
    return crossings * multiplier + Math.abs(tile_a.x - tile_b.x) + Math.abs(tile_a.y - tile_b.y);
  }
}
