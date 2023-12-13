import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { summarize } from '../../common/array-operations/reduce';

export default class ChronalCalibrationSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(Number);
  }

  solvePartOne(): number {
    return this.input.reduce(summarize);
  }

  solvePartTwo(): number {
    const set = new Set<number>();
    let frequency = 0;
    for (let i = 0; !set.has(frequency); i = (i + 1) % this.input.length) {
      set.add(frequency);
      frequency += this.input[i];
    }
    return frequency;
  }
}
