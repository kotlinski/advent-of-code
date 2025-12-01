import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

type ParsedType = number[];

export default class SecretEntranceSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => {
        const parsed = line.replace('L', '-').replaceAll('R', '');
        return Number(parsed);
      });
  }

  solvePartOne(): number {
    let count = 0;
    this.input.reduce((value, line) => {
      const new_value = (value + line) % 100;
      if (new_value === 0) count++;
      console.log(`new_value: ${JSON.stringify(new_value, null, 2)}`);
      return new_value;
    }, 50);
    return count;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
