import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

export default class RopeBridgeSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(Number);
  }

  solvePartOne(): number {
    return 47;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
