import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';
import { stringToNumber } from '../../common-operations/array-operations/map';

const calculateFuelNeeded = (mass: number) => Math.floor(mass / 3) - 2;

const recursiveMassNeeded = (mass: number): number => {
  const fuel_needed = calculateFuelNeeded(mass);
  if (fuel_needed <= 0) {
    return 0;
  }
  return recursiveMassNeeded(fuel_needed) + fuel_needed;
};

export default class TheTyrannyOfTheRocketEquationSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(stringToNumber);
  }

  solvePartOne(): number {
    const mass_list = this.input;
    const fuel_requirements = mass_list.map(calculateFuelNeeded);
    return fuel_requirements.reduce((sum: number, current: number) => sum + current, 0);
  }

  solvePartTwo(): number {
    const mass_list = this.input;
    const fuel_requirements = mass_list.map(recursiveMassNeeded);
    return fuel_requirements.reduce((sum: number, current: number) => sum + current, 0);
  }
}
