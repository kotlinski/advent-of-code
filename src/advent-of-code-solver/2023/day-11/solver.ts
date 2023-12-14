import { CosmicExpansion } from './space/cosmic-expansion';
import Solver from '../../../advent-of-code-solver/solver';

export default class CosmicExpansionSolver extends Solver<string> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string {
    return raw_input;
  }

  solvePartOne(): number {
    const cosmic_expansion = new CosmicExpansion(this.input);
    return cosmic_expansion.findShortestPairs(1);
  }

  solvePartTwo(): number {
    const cosmic_expansion = new CosmicExpansion(this.input);
    return cosmic_expansion.findShortestPairs(1_000_000 - 1);
  }
}
