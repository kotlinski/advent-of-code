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
    return 4711;
  }
}
