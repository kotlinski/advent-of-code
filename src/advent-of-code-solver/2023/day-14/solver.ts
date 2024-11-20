import { checkForCycles } from './cycle-finder.js';
import { MirrorDisc } from './mirror-disc.js';
import Solver from '../../../advent-of-code-solver/solver.js';

export default class ParabolicReflectorDishSolver extends Solver<string> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string {
    return raw_input;
  }
  solvePartOne(): number {
    const mirror = new MirrorDisc(this.input);
    mirror.flip('up');
    return mirror.countLoad();
  }

  solvePartTwo(): number {
    const mirror = new MirrorDisc(this.input);
    const numberOfCycles = 1_000_000_000;
    const loads: number[] = [];
    let result: number | undefined;
    do {
      mirror.cycle();
      loads.push(mirror.countLoad());
      const cycle = checkForCycles(loads);
      if (cycle) {
        result = cycle.loads[(numberOfCycles - cycle.index - 1) % cycle.loads.length];
      }
    } while (result === undefined || loads.length === numberOfCycles);
    return result ?? loads.at(-1);
  }
}
