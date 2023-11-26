import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';
import { stringToNumber } from '../../common-operations/array-operations/map';
import { summarize } from '../../common-operations/array-operations/reduce';
import { any_space } from '../../common-operations/array-operations/split';

export default class CorruptionChecksumSolver extends Solver<number[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((row_of_numbers) => row_of_numbers.split(any_space).map(stringToNumber));
  }

  solvePartOne(): number {
    const check_sums = this.input.map((row) => Math.max(...row) - Math.min(...row));
    return check_sums.reduce(summarize);
  }

  solvePartTwo(): number {
    const check_sums = this.input.map((row) => {
      for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
          if (row[j] % row[i] === 0) {
            return row[j] / row[i];
          } else if (row[i] % row[j] === 0) {
            return row[i] / row[j];
          }
        }
      }
      return 0;
    });
    return check_sums.reduce(summarize);
  }
}
