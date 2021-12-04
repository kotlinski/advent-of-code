import Solver from '../../solver';

export default class BinaryDiagnosticSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }
  parse(raw_input: string): number[][] {
    return raw_input
      .split('\n')
      .map((binary) => binary.split('').map((decimal) => parseInt(decimal, 10)))
      .filter((binary_array) => binary_array.length > 0);
  }

  solvePartOne(): number {
    const binary_count: number[] = [];
    for (let i = 0; i < this.input[0].length; i++) {
      binary_count[i] = 0;
      for (const item of this.input) {
        binary_count[i] += item[i];
      }
    }
    const gama_rate = binary_count.map((count) => (count * 2 > this.input.length ? '1' : '0')).join('');
    const epsilon_rate = binary_count.map((count) => (count * 2 > this.input.length ? '0' : '1')).join('');
    return parseInt(gama_rate, 2) * parseInt(epsilon_rate, 2);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
