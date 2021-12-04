import DiveProblemSolver, { Movement } from './dive-solver';
import Solver from '../../solver';

describe('day 2', () => {
  let day: Solver<Movement>;
  beforeEach(() => {
    const raw_input = 'forward 5\n' + 'down 5\n' + 'forward 8\n' + 'up 3\n' + 'down 8\n' + 'forward 2';
    day = new DiveProblemSolver(raw_input);
  });
  describe('part one', () => {
    it('should be 150', () => {
      expect(day.solvePartOne()).toEqual(150);
    });
  });
  describe('part two', () => {
    it('should be 900', () => {
      expect(day.solvePartOne()).toEqual(900);
    });
  });
});
