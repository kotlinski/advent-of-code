import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate, removeNonNumbers } from '../../common-operations/array-operations/filter';
import { stringToNumber } from '../../common-operations/array-operations/map';

export default class InverseCaptchaSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }
  parse(raw_input: string): number[] {
    return raw_input.split('').filter(removeEmptyLinesPredicate).map(stringToNumber).filter(removeNonNumbers);
  }
  solvePartOne(): number {
    return this.input.reduce((previous, current, index) => {
      const next_number: number = this.input[!this.input[index + 1] ? 0 : index + 1];
      return next_number === current ? previous + current : previous;
    }, 0);
  }
  solvePartTwo(): number {
    return 4711;
  }
}
