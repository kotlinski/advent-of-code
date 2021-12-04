import Solver from '../../solver';

export default class Day02Solver extends Solver {
  constructor(raw_input: string) {
    super(raw_input);
  }
  parse(raw_input: string): number[] {
    return raw_input.split('\n').map((number) => parseInt(number, 10));
  }
  solvePartOne(): number {
    return 4711;
  }
  solvePartTwo(): number {
    return 4711;
  }
}
