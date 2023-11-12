import Solver from '../../../../advent-of-code-solver/solver';
import ReportRepairSolver from '../solver';

describe('day 1', () => {
  let solver: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '1721\n' + '979\n' + '366\n' + '299\n' + '675\n' + '1456\n';
    solver = new ReportRepairSolver(raw_input);
  });
  describe('part one', () => {
    it('should be 514579', () => {
      expect(solver.solvePartOne()).toEqual(514579);
    });
  });
  describe('part two', () => {
    it('should be 241861950', () => {
      expect(solver.solvePartTwo()).toEqual(241861950);
    });
  });
});
