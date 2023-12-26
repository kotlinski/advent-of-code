import { Direction } from './interface';
import { Tile } from './tile';
import { Coordinate } from '../interface';

export function coordinateToString({ x, y }: Coordinate): string {
  return JSON.stringify({ x, y });
}
export class Grid<V extends string, T extends Tile<V> = Tile<V>> {
  private readonly grid_map: Map<string, T>;
  private readonly matrix: T[][];
  public readonly height: number;
  public readonly width: number;
  constructor(
    raw_matrix: V[][],
    private readonly tile_creator: (coordinate: Coordinate, value: V) => T = (coordinate, value) =>
      new Tile(coordinate, value) as T,
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
  getNextTileInDirection(tile: T, direction: Direction): T | undefined {
    const next_coordinate = tile.findCoordinateInDirection(direction);
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
