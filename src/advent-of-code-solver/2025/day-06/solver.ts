import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

type ParsedType = { numbers: number[][]; operations: string[] };

export default class TrashCompactorSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    const all_lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    const separated = all_lines.map((line) => line.trim().split(/\s+/));
    const operations = separated.pop();

    return {
      numbers: separated.map((line) => line.map(Number)),
      operations: operations!,
    };
  }

  solvePartOne(): number {
    const math_builder: { numbers: number[]; operation: string }[] = [];

    for (let i = 0; i < this.input.numbers[0].length; i++) {
      const math_numbers: number[] = [];
      this.input.numbers.forEach((line: number[]) => {
        math_numbers.push(line[i]);
      });
      math_builder.push({ numbers: math_numbers, operation: this.input.operations[i] });
    }
    const sums: number[] = math_builder.map(this.calculateLine);
    return sums.reduce(summarize);
  }
  private calculateLine(line: { numbers: number[]; operation: string }): number {
    return line.numbers.reduce((sum: number, number: number) => {
      if (sum === 0) return number;
      if (line.operation === '+') {
        return sum + number;
      } else if (line.operation === '-') {
        return sum - number;
      } else if (line.operation === '*') {
        return sum * number;
      }
      throw new Error(`Unknown operation ${line.operation}`);
    }, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
