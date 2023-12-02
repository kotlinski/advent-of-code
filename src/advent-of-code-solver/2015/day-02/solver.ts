import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { stringToNumber } from '../../common/array-operations/map';
import { summarize } from '../../common/array-operations/reduce';
import { lowToHighNumber } from '../../common/array-operations/sort';

export interface Dimensions {
  l: number;
  w: number;
  h: number;
}

export default class IWasToldThereWouldBeNoMathSolver extends Solver<Dimensions[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Dimensions[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((present) => present.split('x').map(stringToNumber))
      .map((dimensions) => ({ l: dimensions[0], w: dimensions[1], h: dimensions[2] }));
  }

  solvePartOne(): number {
    return this.input.reduce((accumulator: number, { l, w, h }: Dimensions) => {
      const sides = [l * w, l * h, w * h];
      return accumulator + 2 * sides.reduce(summarize) + sides.sort(lowToHighNumber)[0];
    }, 0);
  }

  solvePartTwo(): number {
    return this.input.reduce((accumulator: number, { l, w, h }: Dimensions) => {
      const [a, b] = [l, w, h].sort(lowToHighNumber);
      return accumulator + a * 2 + b * 2 + l * w * h;
    }, 0);
  }
}
