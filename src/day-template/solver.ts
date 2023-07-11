import { removeEmptyLinesPredicate } from '../array-operations/filter';
import { stringToNumber } from '../array-operations/map';
import Solver from '../solver';

export default class TemplateSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(stringToNumber);
  }

  solvePartOne(): number {
    return 47;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
