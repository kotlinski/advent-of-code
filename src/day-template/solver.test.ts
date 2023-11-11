import TemplateSolver from './solver';
import Solver from '../advent-of-code-solver/solver';

describe('day X', () => {
  let day: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '1\n';
    day = new TemplateSolver(raw_input);
  });
  describe('part one', () => {
    it('should be 47', () => {
      expect(day.solvePartOne()).toEqual(47);
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(day.solvePartTwo()).toEqual(4711);
    });
  });
});
