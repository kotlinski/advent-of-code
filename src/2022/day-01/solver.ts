import { stringToNumber } from '../../array-operations/map';
import { summarize } from '../../array-operations/reduce';
import { highToLowCompareFunction } from '../../array-operations/sort';
import Solver from '../../solver';

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
    const ordered_carriers = this.input.sort(highToLowCompareFunction());
    return ordered_carriers[0] + ordered_carriers[1] + ordered_carriers[2];
  }
}
