import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { summarize } from '../../common/array-operations/reduce';

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
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(Number);
  }

  solvePartOne(): number {
    const mass_list = this.input;
    const fuel_requirements = mass_list.map(calculateFuelNeeded);
    return fuel_requirements.reduce(summarize);
  }

  solvePartTwo(): number {
    const mass_list = this.input;
    const fuel_requirements = mass_list.map(recursiveMassNeeded);
    return fuel_requirements.reduce(summarize);
  }
}
