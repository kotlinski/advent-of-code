import Solver from '../../solver';

export default class CalorieCounting extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  private summarize(accumulator: number, number: string) {
    if (isNaN(parseInt(number, 10))) {
      return accumulator;
    }
    return accumulator + parseInt(number, 10);
  }

  parse(raw_input: string): number[] {
    return raw_input
      .split('\n\n')
      .map((carrier: string) => {
        console.log(`carrier: ${JSON.stringify(carrier, null, 2)}`);
        return carrier.split('\n');
      })
      .map((numbers: string[]) => numbers.reduce(this.summarize, 0));
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
