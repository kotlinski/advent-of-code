import Solver from '../../solver';
import SonarSweepSolver from './solver';

describe('day 1', () => {
  let day: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '199\n' + '200\n' + '208\n' + '210\n' + '200\n' + '207\n' + '240\n' + '269\n' + '260\n' + '263';
    day = new SonarSweepSolver(raw_input);
  });
  describe('part one', () => {
    it('should be 7', () => {
      expect(day.solvePartOne()).toEqual(7);
    });
  });
  describe('part two', () => {
    it('should be 5', () => {
      expect(day.solvePartTwo()).toEqual(5);
    });
  });
});
