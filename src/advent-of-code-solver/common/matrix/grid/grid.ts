import { all_directions, Direction } from './interface';
import { Tile } from './tile';
import { removeEmptyLinesPredicate } from '../../array-operations/filter';
import { Coordinate } from '../interface';

export function coordinateToString({ x, y }: Coordinate): string {
  return `${x};${y}`;
}

export function parseStringToMatrix<V>(raw_input: string, mapper_fn: (value: string) => V): V[][] {
  return raw_input
    .split('\n')
    .filter(removeEmptyLinesPredicate)
    .map((row) => row.split('').map(mapper_fn));
}
export function createEmptyMatrix<V = undefined>(width: number, height: number, default_value?: V): V[][] {
  const empty_city_blocks: V[][] = [];
  for (let i = 0; i < height; i++) {
    empty_city_blocks[i] = new Array<V>(width);
    if (default_value) {
      for (let j = 0; j < empty_city_blocks[i].length; j++) {
        empty_city_blocks[i][j] = default_value;
      }
    }
  }
  return empty_city_blocks;
}
type TileCreator<V, T> = (coordinate: Coordinate, value: V) => T;
export class Grid<V extends string | number | object | undefined, T extends Tile<V> = Tile<V>> {
  private readonly grid_map: Map<string, T>;
  private readonly matrix: T[][];
  public readonly height: number;
  public readonly width: number;

  constructor(
    raw_matrix: V[][],
    private readonly tile_creator: TileCreator<V, T> = (coordinate, value) => new Tile(coordinate, value) as T,
  ) {
    const { grid_map, matrix } = this.populateGrid(raw_matrix);
    this.grid_map = grid_map;
    this.matrix = matrix;
    this.width = raw_matrix[0].length;
    this.height = raw_matrix.length;
  }
  toString(): string {
    const rows = this.traverseRows((output: string[], _row, _index, values) => {
      output.push(values.join(''));
      return output;
    }, []);
    return rows.join('\n');
  }
  getTileAtCoordinate(coordinate: Coordinate): T | undefined {
    return this.grid_map.get(coordinateToString(coordinate));
  }
  getNeighbours(coordinate: Coordinate): { tile: T; direction: Direction }[] {
    return all_directions.reduce((neighbours: { tile: T; direction: Direction }[], direction: Direction) => {
      const next_tile = this.getNextTileInDirection(coordinate, direction);
      if (next_tile) neighbours.push({ tile: next_tile, direction });
      return neighbours;
    }, []);
  }
  getNextTileInDirection(tile: T | Coordinate, direction: Direction): T | undefined {
    const tile_from_coordinate = this.getTileAtCoordinate({ x: tile.x, y: tile.y });
    const next_coordinate = tile_from_coordinate?.findCoordinateInDirection(direction);
    if (!next_coordinate) return undefined;
    return this.getTileAtCoordinate(next_coordinate);
  }

  private populateGrid(raw_matrix: V[][]) {
    const grid_map = new Map<string, T>();
    const matrix: T[][] = [];
    for (let y = 0; y < raw_matrix.length; y++) {
      const row = raw_matrix[y];
      matrix[y] = [];
      for (let x = 0; x < row.length; x++) {
        const tile = this.tile_creator({ x, y }, row[x]);
        grid_map.set(tile.toString(), tile);
        matrix[y].push(tile);
      }
    }
    return { grid_map, matrix };
  }

  traverseTiles(callback: (tile: T) => void) {
    for (const row of this.matrix) {
      for (const tile of row) {
        callback(tile);
      }
    }
  }
  traverseRows(callback: (prev: T, row: T[], index: number, values: V[]) => T | void): T;
  traverseRows<TResult>(callback: (prev: TResult, row: T[], index: number, values: V[]) => TResult, init: TResult): TResult;
  /**
   * Will traverse row by row in a `reduce`like fashion.
   */
  traverseRows<TResult extends T>(
    callback: (prev: TResult | T, column: T[], index: number, values: V[]) => TResult | T,
    init?: TResult | T,
  ): TResult | T {
    let cumulative = init ?? this.matrix[0][0]!;
    for (const [y, row] of this.matrix.entries()) {
      const row_values = row.map((tile) => tile.value);
      cumulative = callback(cumulative, row, y, row_values);
    }
    return cumulative;
  }
  traverseColumns(callback: (prev: T, column: T[], index: number, values: V[]) => T | void): T;
  traverseColumns<TResult>(
    callback: (prev: TResult, column: T[], index: number, values: V[]) => TResult,
    init: TResult,
  ): TResult;
  /**
   * Will traverse column by column in a `reduce`like fashion.
   */
  traverseColumns<TResult extends T>(
    callback: (prev: TResult | T, column: T[], index: number, values: V[]) => TResult | T,
    init?: TResult | T,
  ): TResult | T {
    let cumulative = init ?? this.matrix[0][0]!;
    for (let x = 0; x < this.matrix[0].length; x++) {
      const column: T[] = [];
      const values: V[] = [];
      for (const row of this.matrix) {
        column.push(row[x]);
        values.push(row[x].value);
      }
      cumulative = callback(cumulative, column, x, values);
    }
    return cumulative;
  }
}
