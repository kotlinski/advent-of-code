import Solver from '../../../../advent-of-code-solver/solver';
import ChronalCalibrationSolver from '../solver';

describe('day 1', () => {
  let solver: Solver<number[]>;

  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '+1\n' + '-2\n' + '+3\n' + '+1\n', output: 3 },
      { input: '+1\n' + '+1\n' + '+1\n', output: 3 },
      { input: '-1\n' + '-2\n' + '-3\n', output: -6 },
    ];
    describe.each(cases)('input', ({ input, output }: TestCase) => {
      it('should', () => {
        solver = new ChronalCalibrationSolver(input);
        expect(solver.solvePartOne()).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(solver.solvePartTwo()).toEqual(4711);
    });
  });
});
