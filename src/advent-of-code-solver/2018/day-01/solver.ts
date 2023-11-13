import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';
import { stringToNumber } from '../../common-operations/array-operations/map';
import { summarize } from '../../common-operations/array-operations/reduce';

export default class ChronalCalibrationSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(stringToNumber);
  }

  solvePartOne(): number {
    return this.input.reduce(summarize);
  }

  solvePartTwo(): number {
    const set = new Set<number>();
    let frequency = 0;
    let final_frequency: number | undefined;
    set.add(0);
    do {
      for (const change of this.input) {
        frequency += change;
        if (set.has(frequency)) {
          final_frequency = frequency;
          break;
        }
        set.add(frequency);
      }
    } while (final_frequency === undefined);
    return final_frequency;
  }
}
