import { coordinateToString, Tile } from './tile';
import { Coordinate } from '../interface';

export class Grid<T> {
  private readonly grid_map: Map<string, Tile<T>>;
  private readonly matrix: Tile<T>[][];
  public readonly height: number;
  public readonly width: number;
  constructor(raw_matrix: T[][]) {
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
  getTileAtCoordinate(coordinate: Coordinate): Tile<T> | undefined {
    return this.grid_map.get(coordinateToString(coordinate));
  }

  private populateGrid(raw_matrix: T[][]) {
    const grid_map = new Map<string, Tile<T>>();
    const matrix: Tile<T>[][] = [];
    for (let y = 0; y < raw_matrix.length; y++) {
      const row = raw_matrix[y];
      matrix[y] = [];
      for (let x = 0; x < row.length; x++) {
        const tile = new Tile({ x, y }, row[x]);
        grid_map.set(tile.toString(), tile);
        matrix[y].push(tile);
      }
    }
    return { grid_map, matrix };
  }

  traverseTiles(callback: (tile: Tile<T>) => void) {
    for (const row of this.matrix) {
      for (const tile of row) {
        callback(tile);
      }
    }
  }
  traverseRows(callback: (prev: Tile<T>, row: Tile<T>[], index: number, values: T[]) => Tile<T> | void): Tile<T>;
  traverseRows<TResult>(
    callback: (prev: TResult, row: Tile<T>[], index: number, values: T[]) => TResult,
    init: TResult,
  ): TResult;
  /**
   * Will traverse row by row in a `reduce`like fashion.
   */
  traverseRows<TResult extends Tile<T>>(
    callback: (prev: TResult | Tile<T>, column: Tile<T>[], index: number, values: T[]) => TResult | Tile<T>,
    init?: TResult | Tile<T>,
  ): TResult | Tile<T> {
    let cumulative = init ?? this.matrix[0][0]!;
    for (const [y, row] of this.matrix.entries()) {
      const row_values = row.map((tile) => tile.value);
      cumulative = callback(cumulative, row, y, row_values);
    }
    return cumulative;
  }
  traverseColumns(callback: (prev: Tile<T>, column: Tile<T>[], index: number, values: T[]) => Tile<T> | void): Tile<T>;
  traverseColumns<TResult>(
    callback: (prev: TResult, column: Tile<T>[], index: number, values: T[]) => TResult,
    init: TResult,
  ): TResult;
  /**
   * Will traverse column by column in a `reduce`like fashion.
   */
  traverseColumns<TResult extends Tile<T>>(
    callback: (prev: TResult | Tile<T>, column: Tile<T>[], index: number, values: T[]) => TResult | Tile<T>,
    init?: TResult | Tile<T>,
  ): TResult | Tile<T> {
    let cumulative = init ?? this.matrix[0][0]!;
    for (let x = 0; x < this.matrix[0].length; x++) {
      const column: Tile<T>[] = [];
      const values: T[] = [];
      for (const row of this.matrix) {
        column.push(row[x]);
        values.push(row[x].value);
      }
      cumulative = callback(cumulative, column, x, values);
    }
    return cumulative;
  }
}
