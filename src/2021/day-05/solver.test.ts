import Solver from '../../solver';
import HydrothermalVentureSolver, { Vector } from './solver';

describe('day 5', () => {
  let day: Solver<Vector[]>;
  beforeEach(() => {
    const raw_input =
      '0,9 -> 5,9\n' +
      '8,0 -> 0,8\n' +
      '9,4 -> 3,4\n' +
      '2,2 -> 2,1\n' +
      '7,0 -> 7,4\n' +
      '6,4 -> 2,0\n' +
      '0,9 -> 2,9\n' +
      '3,4 -> 1,4\n' +
      '0,0 -> 8,8\n' +
      '5,5 -> 8,2';
    day = new HydrothermalVentureSolver(raw_input);
  });
  describe('part one', () => {
    it('should have a total number of 5 points', () => {
      expect(day.solvePartOne()).toEqual(5);
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(day.solvePartTwo()).toEqual(4711);
    });
  });
});
