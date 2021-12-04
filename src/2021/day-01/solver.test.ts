import Day01Solver from './solver';
import Solver from '../../solver';

describe('day 1', () => {
  let day: Solver;
  beforeEach(() => {
    const raw_input = '199\n' + '200\n' + '208\n' + '210\n' + '200\n' + '207\n' + '240\n' + '269\n' + '260\n' + '263';
    day = new Day01Solver(raw_input);
  });
  describe('first', () => {
    it('should be 7', () => {
      expect(day.solvePartOne()).toEqual(7);
    });
  });
  describe('second', () => {
    it('should be 5', () => {
      expect(day.solvePartTwo()).toEqual(5);
    });
  });
});
