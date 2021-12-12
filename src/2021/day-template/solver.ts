import Solver from '../../solver';

export default class TemplateSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input
      .split('\n')
      .filter((line: string) => line.length > 0)
      .map((number) => parseInt(number, 10));
  }

  solvePartOne(): number {
    return 47;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
