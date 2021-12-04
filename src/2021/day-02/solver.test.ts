import Day02Solver from './solver';
import Solver from '../../solver';

describe('day 2', () => {
  let day: Solver;
  beforeEach(() => {
    const raw_input = 'forward 5\n' + 'down 5\n' + 'forward 8\n' + 'up 3\n' + 'down 8\n' + 'forward 2';
    day = new Day02Solver(raw_input);
  });
  describe('first', () => {
    it('should be 7', () => {
      expect(day.solvePartOne()).toEqual(150);
    });
  });
});
