import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

export type BridgeInput = {
  result: number;
  numbers: number[];
};

export default class BridgeRepairSolver extends Solver<BridgeInput[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): BridgeInput[] {
    const rows = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return rows.map((row) => {
      const [result, numbers] = row.split(': ');
      return {
        result: parseInt(result),
        numbers: numbers.split(' ').map((number) => parseInt(number)),
      };
    });
  }

  solvePartOne(): number {
    const correct_results = this.input.filter(({ numbers, result }) => {
      const possible_results: number[] = recursiveMath(numbers.reverse(), result);
      return possible_results.includes(result);
    });
    return correct_results.map(({ result }) => result).reduce(summarize, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
function recursiveMath(numbers: number[], cap: number): number[] {
  if (numbers.length === 1) return numbers;
  const [first, ...rest] = numbers;
  const sub_results = recursiveMath(rest, cap).filter((result) => result <= cap);
  const enriched = sub_results.map((sub_result) => {
    return [first + sub_result, first * sub_result];
  });
  const flat = enriched.flat();
  return flat;
}
