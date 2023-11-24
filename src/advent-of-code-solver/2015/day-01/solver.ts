import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';

export default class NotQuiteLispSolver extends Solver<('(' | ')')[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ('(' | ')')[] {
    return raw_input.split('').filter(removeEmptyLinesPredicate) as ('(' | ')')[];
  }

  solvePartOne(): number {
    const down = this.input.filter((char) => char === ')');
    const up = this.input.filter((char) => char === '(');
    return up.length - down.length;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
