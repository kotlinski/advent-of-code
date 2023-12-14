import { Tile } from './tile';

export class Grid<T> {
  private readonly grid_map: Map<string, Tile<T>>;
  private readonly matrix: Tile<T>[][];
  constructor(raw_matrix: T[][]) {
    const { grid_map, matrix } = this.populateGrid(raw_matrix);
    this.grid_map = grid_map;
    this.matrix = matrix;
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
  traverseRows(callback: (row: Tile<T>[], y: number) => void) {
    for (const [y, row] of this.matrix.entries()) {
      callback(row, y);
    }
  }
  traverseColumns(callback: (column: Tile<T>[], x: number) => void) {
    for (let x = 0; x < this.matrix[0].length; x++) {
      const column: Tile<T>[] = [];
      for (const row of this.matrix) {
        column.push(row[x]);
      }
      callback(column, x);
    }
  }
}
