import Solver from '../../solver';
import SmokeBasinSolver from './solver';

describe('day 9', () => {
  let day: Solver<number[][]>;
  beforeEach(() => {
    const raw_input = '2199943210\n' + '3987894921\n' + '9856789892\n' + '8767896789\n' + '9899965678';
    day = new SmokeBasinSolver(raw_input);
  });
  describe('part one', () => {
    it('should have a risk level sum of 15', () => {
      expect(day.solvePartOne()).toEqual(15);
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(day.solvePartTwo()).toEqual(4711);
    });
  });
});
