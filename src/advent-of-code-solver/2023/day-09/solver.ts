import { OasisAndSandInstabilitySensor } from './oasis-and-sand-instability-sensor.js';
import Solver from '../../../advent-of-code-solver/solver.js';

export default class MirageMaintenanceSolver extends Solver<string> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string {
    return raw_input;
  }

  solvePartOne(): number {
    const sensor = new OasisAndSandInstabilitySensor(this.input);
    return sensor.values.reduce((sum: number, value_array: number[]) => sum + sensor.extrapolate(value_array), 0);
  }

  solvePartTwo(): number {
    const sensor = new OasisAndSandInstabilitySensor(this.input);
    return sensor.values.reduce((sum: number, value_array: number[]) => sum + sensor.extrapolate(value_array.reverse()), 0);
  }
}
