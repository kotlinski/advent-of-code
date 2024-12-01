import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import {summarize} from "../../common/array-operations/reduce.js";

export default class HistorianHysteriaSolver extends Solver<number[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][] {
    const all_lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return all_lines.reduce(
      (numbers: number[][], line) => {
        const [x, y] = line.split(' ').filter(removeEmptyLinesPredicate);
        numbers[0].push(Number(x));
        numbers[1].push(Number(y));
        return numbers;
      },
      [[], []],
    );
  }

  solvePartOne(): number {
    const [first, second] = this.input.map((numbers) => {
      return numbers.sort((a, b) => a - b);
    });
    const diffs = first.map((number, index) => {
      return Math.abs(number - second[index]);
    });
    return diffs.reduce(summarize);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
