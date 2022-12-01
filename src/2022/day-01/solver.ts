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

    /* .reduce((previous_value: number[], current_value: string) => {
      if (current_value === undefined) {
        previous_value.push(0)
      } else {
        const number = parseInt(current_value, 10);
        previous_value[previous_value.length - 1] += number
      }
      return previous_value;
    }, [])*/
  }

  solvePartOne(): number {
    return Math.max(...this.input);
  }

  solvePartTwo(): number {
    return 42;
  }
}
