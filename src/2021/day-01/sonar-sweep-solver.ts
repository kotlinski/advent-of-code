import Solver from '../../solver';

export default class SonarSweepSolver extends Solver<number> {
  constructor(raw_input: string) {
    super(raw_input);
  }
  parse(raw_input: string): number[] {
    return raw_input.split('\n').map((number) => parseInt(number, 10));
  }
  solvePartOne(): number {
    return this.countNumberOfIncreases(this.input);
  }
  solvePartTwo(): number {
    const values = this.input.map(
      (value: number, index: number, numbers: number[]) => value + numbers[index + 1] + numbers[index + 2],
    );
    return this.countNumberOfIncreases(values);
  }

  private readonly countNumberOfIncreases = (numbers: number[]): number => {
    let prev = Number.MAX_VALUE;
    return numbers.filter((value: number) => prev < (prev = value)).length;
  };
}
