import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

const calculate_fuel_needed = (mass: number) => Math.floor(mass / 3) - 2;

const recursive_mass_needed = (mass: number): number => {
  const fuel_needed = calculate_fuel_needed(mass);
  if (fuel_needed <= 0) {
    return 0;
  }
  return recursive_mass_needed(fuel_needed) + fuel_needed;
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
    const fuel_requirements = mass_list.map(calculate_fuel_needed);
    return fuel_requirements.reduce(summarize);
  }

  solvePartTwo(): number {
    const mass_list = this.input;
    const fuel_requirements = mass_list.map(recursive_mass_needed);
    return fuel_requirements.reduce(summarize);
  }
}
