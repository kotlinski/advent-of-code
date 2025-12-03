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
    return this.findBiggest(this.input, 2);
  }
  solvePartTwo(): number {
    return this.findBiggest(this.input, 12);
  }
  private findLargeNumber(line: number[], digits: number, start_index: number): number[] {
    if (digits <= 0) {
      return [];
    }
    let largest = -1;
    let largest_index = -1;
    for (let i = start_index; i <= line.length - digits && largest !== 9; i++) {
      if (line[i] > largest) {
        largest = line[i];
        largest_index = i;
      }
    }
    return [largest_index, ...this.findLargeNumber(line, digits - 1, largest_index + 1)];
  }

  private findBiggest(input: number[][], digits: number) {
    const joltages = input.map((line) => {
      const indexes = this.findLargeNumber(line, digits, 0);
      return indexes.reduce((acc, cur, index) => {
        return acc + line[cur] * 10 ** (digits - 1 - index);
      }, 0);
    });
    return joltages.reduce(summarize);
  }
}
