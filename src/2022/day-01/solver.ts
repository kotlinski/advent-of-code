import Solver from '../../solver';
import { summarize } from '../../array-operations/reduce';
import { stringToNumber } from '../../array-operations/map';

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
          .map(stringToNumber)
          .filter((i) => !isNaN(i)),
      )
      .map((numbers: number[]) => numbers.reduce(summarize, 0));
  }

  solvePartOne(): number {
    return Math.max(...this.input);
  }

  solvePartTwo(): number {
    const ordered_carriers = this.input.sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });
    return ordered_carriers[0] + ordered_carriers[1] + ordered_carriers[2];
  }
}
