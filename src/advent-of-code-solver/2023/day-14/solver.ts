import { MirrorDisc } from './mirror-disc';
import Solver from '../../../advent-of-code-solver/solver';

export default class ParabolicReflectorDishSolver extends Solver<string> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string {
    return raw_input;
  }
  solvePartOne(): number {
    const mirror = new MirrorDisc(this.input);
    mirror.flipNorth();
    return mirror.countLoad();
  }

  solvePartTwo(): number {
    return 4711;
  }
}
