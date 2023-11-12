import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';
import { stringToNumber } from '../../common-operations/array-operations/map';

export default class TheTyrannyOfTheRocketEquationSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(stringToNumber);
  }

  solvePartOne(): number {
    const fuel_requirements = this.input.map((mass) => Math.floor(mass / 3) - 2);
    return fuel_requirements.reduce((sum: number, current: number) => sum + current, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
