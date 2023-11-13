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
      it(`should be ${output}`, () => {
        solver = new ChronalCalibrationSolver(input);
        expect(solver.solvePartOne()).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '+1\n' + '-2\n' + '+3\n' + '+1\n', output: 2 },
      { input: '+1\n' + '-1\n', output: 0 },
      { input: '+3\n' + '+3\n' + '+4\n' + '-2\n' + '-4\n', output: 10 },
      { input: '-6\n' + '+3\n' + '+8\n' + '+5\n' + '-6\n', output: 5 },
      { input: '+7\n' + '+7\n' + '-2\n' + '-7\n' + '-4\n', output: 14 },
    ];
    describe.each(cases)('input', ({ input, output }: TestCase) => {
      it(`should be ${output}`, () => {
        solver = new ChronalCalibrationSolver(input);
        expect(solver.solvePartTwo()).toEqual(output);
      });
    });
  });
});
