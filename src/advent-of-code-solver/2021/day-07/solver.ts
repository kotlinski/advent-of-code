import { memoize } from '../../common/cache';
import Solver from '../../solver';

function getConstantFuelCost(distance: number) {
  return distance;
}

export default class TheTreacheryOfWhalesSolver extends Solver<number[]> {
  public readonly memo: (distance: number) => number;

  constructor(raw_input: string) {
    super(raw_input);
    this.memo = memoize<[number], number>(this.getAcceleratingFuelCostForDistance(), (input) => `${input[0]}`);
  }
  private getAcceleratingFuelCostForDistance() {
    return (distance: number): number => {
      let count = 0;
      for (let i = 1; i <= distance; i++) {
        count += i;
      }
      return count;
    };
  }

  parse(raw_input: string): number[] {
    return raw_input.split(',').map(Number);
  }

  solvePartOne(): number {
    const crab_positions = this.input;
    const fuel_calculator = getConstantFuelCost;
    return this.calculateCheapestFuelConsumption(crab_positions, fuel_calculator);
  }

  private getPossibleCrabPositions(crab_positions: number[]) {
    const min = Math.min(...crab_positions);
    const max = Math.max(...crab_positions);
    return Array.from(new Array(max - min + 1), (_x, i) => i + min);
  }

  solvePartTwo(): number {
    const crab_positions = this.input;
    const fuel_calculator = this.memo;
    return this.calculateCheapestFuelConsumption(crab_positions, fuel_calculator);
  }

  private calculateCheapestFuelConsumption(crab_positions: number[], fuel_calculator: (distance: number) => number) {
    const horizontal_positions = this.getPossibleCrabPositions(crab_positions);
    horizontal_positions.forEach((horizontal_position) => {
      const aggregator = (total_distance: number, crab_position: number) =>
        total_distance + fuel_calculator(Math.abs(horizontal_position - crab_position));
      horizontal_positions[horizontal_position] = crab_positions.reduce(aggregator, 0);
    });
    return Math.min(...horizontal_positions);
  }
}
