import { TileType } from './solver.js';

import { Grid } from '../../common/matrix/grid/grid.js';

export class MirrorFinder {
  private readonly room: Grid<TileType>;

  constructor(
    room_of_mirrors: TileType[][],
    private readonly scanner: MirrorScanner,
  ) {
    this.room = new Grid<TileType>(room_of_mirrors);
  }

  public countPatternNotes(): number {
    const row_number: number | undefined = this.findMirror(this.getRows());
    const column_number: number | undefined = this.findMirror(this.getColumns());
    return 100 * (row_number ?? 0) + (column_number ?? 0);
  }

  private findMirror(sequence: string[]): number | undefined {
    for (let i = 0; i < sequence.length; i++) {
      if (this.scanner.scanForMirror(sequence, i)) return i;
    }
    return undefined;
  }

  private getRows(): string[] {
    return this.room.traverseRows<string[]>((rows, _row, _index, values) => {
      rows.push(values.join(''));
      return rows;
    }, []);
  }
  private getColumns(): string[] {
    return this.room.traverseColumns<string[]>((columns, _column, _index, values) => {
      columns.push(values.join(''));
      return columns;
    }, []);
  }
}
export abstract class Scanner {
  abstract scanForMirror(lines: string[], reflection_line: number): boolean;
  protected splitLinesForMirroring(lines: string[], reflection_line: number) {
    const copy_of_lines = [...lines];
    const first_half = copy_of_lines.splice(0, reflection_line).reverse();
    const second_half = copy_of_lines;
    const min_length = Math.min(first_half.length, second_half.length);
    return { first_half, second_half, min_length };
  }
}
export class MirrorScanner extends Scanner {
  scanForMirror(lines: string[], reflection_line: number) {
    const { first_half, second_half, min_length } = this.splitLinesForMirroring(lines, reflection_line);
    if (min_length === 0) return false;
    for (let i = 0; i < min_length; i++) {
      if (first_half.at(i) !== second_half.at(i)) return false;
    }
    return true; // mirror found
  }
}
export class SmudgyMirrorScanner extends Scanner {
  scanForMirror(lines: string[], reflection_line: number) {
    const { first_half, second_half, min_length } = this.splitLinesForMirroring(lines, reflection_line);
    if (min_length === 0) return false;
    let smudge = 0;
    for (let i = 0; i < min_length && smudge < 2; i++) {
      const first = first_half[i];
      const second = second_half[i];
      for (let j = 0; j < second.length; j++) {
        if (first[j] !== second[j]) smudge++;
      }
    }
    return smudge === 1; // mirror found
  }
}
