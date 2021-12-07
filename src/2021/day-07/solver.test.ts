import Solver from '../../solver';
import TheTreacheryOfWhalesSolver, { getAcceleratingFuelCostForDistance } from './solver';

describe('day 7', () => {
  let day: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '16,1,2,0,4,2,7,1,2,14';
    day = new TheTreacheryOfWhalesSolver(raw_input);
  });
  describe('part one', () => {
    it('should be solved with 37 fuel units', () => {
      expect(day.solvePartOne()).toEqual(37);
    });
  });
  describe('part two', () => {
    it('should be solved with 168 fuel units', () => {
      expect(day.solvePartTwo()).toEqual(168);
    });
  });
  describe('getAcceleratingFuelCostForDistance', () => {
    const table = [
      [Math.abs(16 - 5), 66],
      [Math.abs(1 - 5), 10],
      [Math.abs(14 - 5), 45],
      [Math.abs(4 - 5), 1],
    ];
    test.each(table)('A distance of %d, should have the fuel cost %d', (distance, fuel_cost) => {
      expect(getAcceleratingFuelCostForDistance(distance)).toEqual(fuel_cost);
    });
  });
});
