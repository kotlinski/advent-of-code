import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import Solver from '../../solver';

export default class SevenSegmentSearchSolver extends Solver<string[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[][] {
    const notes = raw_input.split('\n');
    return notes
      .map((note) => note?.split('|')[1]?.split(' ').filter(removeEmptyLinesPredicate))
      .filter(removeEmptyLinesPredicate);
  }

  solvePartOne(): number {
    const output_notes = this.input;
    let count = 0;
    output_notes.forEach((output_note) => {
      output_note.forEach((output_value) => {
        switch (output_value.length) {
          case 2:
          case 3:
          case 4:
          case 7:
            count++;
            break;
        }
      });
    });

    return count;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
