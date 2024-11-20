import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate, removeNonNumbers } from '../../common/array-operations/filter.js';
import { stringToNumber } from '../../common/array-operations/map.js';

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
    const step_length = this.input.length / 2;
    return this.input.reduce((previous, current, index) => {
      const compare_index = (index + step_length) % this.input.length;
      const next_number: number = this.input[compare_index];
      return next_number === current ? previous + current : previous;
    }, 0);
  }
}
