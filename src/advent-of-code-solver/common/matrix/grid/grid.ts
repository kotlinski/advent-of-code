import { Tile } from './tile';

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

  /**
   * Will traverse row by row in a `reduce`like fashion.
   */
  traverseRows<TResult>(callback: (prev: TResult, row: Tile<T>[], y: number, values: T[]) => TResult, init: TResult): TResult {
    let cumulative = init;
    for (const [y, row] of this.matrix.entries()) {
      const row_values = row.map((tile) => tile.value);
      cumulative = callback(cumulative, row, y, row_values);
    }
    return cumulative;
  }

  /**
   * Will traverse column by column in a `reduce`like fashion.
   */
  traverseColumns<TResult>(
    callback: (prev: TResult, column: Tile<T>[], x: number, values: T[]) => TResult,
    init: TResult,
  ): TResult {
    let cumulative = init;
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
