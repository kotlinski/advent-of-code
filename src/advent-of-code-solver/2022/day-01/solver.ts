import Solver from '../../solver.js';
import { summarize } from '../../common/array-operations/reduce.js';
import { highToLowCompareFunction } from '../../common/array-operations/sort.js';

export default class CalorieCounting extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input
      .split('\n\n')
      .map((carrier: string) =>
        carrier
          .split('\n')
          .map(Number)
          .filter((i) => !isNaN(i)),
      )
      .map((numbers: number[]) => numbers.reduce(summarize, 0));
  }

  solvePartOne(): number {
    return Math.max(...this.input);
  }

  solvePartTwo(): number {
    const ordered_carriers = this.input.sort(highToLowCompareFunction());
    return ordered_carriers[0] + ordered_carriers[1] + ordered_carriers[2];
  }
}
