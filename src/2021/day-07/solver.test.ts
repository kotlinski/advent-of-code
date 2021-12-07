import Solver from '../../solver';
import TheTreacheryOfWhalesSolver from './solver';

describe('day X', () => {
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
    it('should be 4711', () => {
      expect(day.solvePartTwo()).toEqual(4711);
    });
  });
});
