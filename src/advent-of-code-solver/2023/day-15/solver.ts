import { LavaHasher } from './lava-hasher';
import { LensBoxSetup } from './lens-boxes/lens-box-setup';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { summarize } from '../../common/array-operations/reduce';

export default class LensLibrarySolver extends Solver<string[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[] {
    return raw_input.split(/[,|\n]/).filter(removeEmptyLinesPredicate);
  }

  solvePartOne(): number {
    const hasher = new LavaHasher();
    const hash_values = this.input.map((word) => hasher.hash(word));
    return hash_values.reduce(summarize);
  }

  solvePartTwo(): number {
    const lens_box_setup = new LensBoxSetup(new LavaHasher(), this.input);
    while (lens_box_setup.performLensOperation()) {
      // run thru the entire configuration until no more steps available
    }
    return lens_box_setup.getConfigurationFocusingPower();
  }
}
