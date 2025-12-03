import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

type ParsedType = number[][];

export default class LobbySolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    return raw_input
      .split('\n')
      .map((line) => line.split('').map(Number))
      .filter(removeEmptyLinesPredicate);
  }

  solvePartOne(): number {
    const joltages = this.input.map((line) => {
      let first = -1;
      let largest_index = -1;
      for (let i = 0; i < line.length - 1 && first !== 9; i++) {
        if (line[i] > first) {
          first = line[i];
          largest_index = i;
        }
      }
      let second = -1;
      for (let i = largest_index + 1; i <= line.length - 1 && second !== 9; i++) {
        if (line[i] > second) {
          second = line[i];
          largest_index = i;
        }
      }
      return first * 10 + second;
    });
    return joltages.reduce(summarize);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
