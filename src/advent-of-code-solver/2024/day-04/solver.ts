import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

export default class CeresSearchSolver extends Solver<string[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[][] {
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return lines.map((line) => line.split(''));
  }

  solvePartOne(): number {
    const words = [
      ...this.getHorizontalLines(),
      ...this.getVerticalLines(),
      ...this.getDiagonal(),
      ...this.getInvertedDiagonal(),
    ];
    const all_words = [...words, ...words.map((word) => word.split('').reverse().join(''))];

    return all_words.reduce((acc, line) => {
      const match = line.match(/XMAS/g);
      return match ? acc + match.length : acc;
    }, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }

  private getHorizontalLines() {
    const word: string[] = [];
    for (const row of this.input) {
      word.push(row.join(''));
    }
    return word;
  }

  private getVerticalLines() {
    const words: string[] = [];
    for (let col = 0; col < this.input[0].length; col++) {
      let column = '';
      for (const row of this.input) {
        column += row[col];
      }
      words.push(column);
    }
    return words;
  }

  private getInvertedDiagonal(): string[] {
    const words: string[] = [];
    const number_of_rows = this.input.length;
    const number_of_cols = this.input[0].length;

    for (let d = 0; d < number_of_rows + number_of_cols - 1; d++) {
      let diagonal = '';
      for (let row = 0; row < number_of_rows; row++) {
        const col = d - row;
        const inv_col = number_of_cols - col - 1;
        if (inv_col >= 0 && inv_col < number_of_cols) {
          diagonal += this.input[row][inv_col];
        }
      }
      if (diagonal) words.push(diagonal);
    }
    return words;
  }
  private getDiagonal(): string[] {
    const words: string[] = [];
    const number_of_rows = this.input.length;
    const number_of_cols = this.input[0].length;

    for (let d = 0; d < number_of_rows + number_of_cols - 1; d++) {
      let diagonal = '';
      for (let row = 0; row < number_of_rows; row++) {
        const col = d - row;
        if (col >= 0 && col < number_of_cols) {
          diagonal += this.input[row][col];
        }
      }
      if (diagonal) words.push(diagonal);
    }
    return words;
  }
}
