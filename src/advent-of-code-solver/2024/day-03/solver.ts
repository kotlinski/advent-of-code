import Solver from '../../../advent-of-code-solver/solver.js';

export default class MullItOverSolver extends Solver<string[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[] {
    return raw_input.match(/don't|do|mul\([0-9]+,[0-9]+\)/g)!;
  }

  solvePartOne(): number {
    return this.input.reduce((acc, cur) => {
      if (cur === 'do' || cur === "don't") return acc;
      const [a, b] = cur.match(/[0-9]+/g)!.map(Number);
      return acc + a * b;
    }, 0);
  }

  solvePartTwo(): number {
    let mode = 'do';
    return this.input.reduce((acc, cur) => {
      if (cur === 'do' || cur === "don't") {
        mode = cur;
        return acc;
      }
      if (mode === "don't") return acc;
      const [a, b] = cur.match(/[0-9]+/g)!.map(Number);
      return acc + a * b;
    }, 0);
  }
}
