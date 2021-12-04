import Solver from '../../solver';

export default class BinaryDiagnosticSolver extends Solver<number> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').map((number) => parseInt(number, 10));
  }

  solvePartOne(): number {
    return 47;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
