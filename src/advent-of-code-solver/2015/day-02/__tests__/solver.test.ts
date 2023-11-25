import Solver from '../../../../advent-of-code-solver/solver';
import IWasToldThereWouldBeNoMathSolver, { Dimensions } from '../solver';

describe('day 2', () => {
  let solver: Solver<Dimensions[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '2x3x4\n', output: 58 },
      { input: '1x1x10\n', output: 43 },
      { input: '2x3x4\n1x1x10\n', output: 43 + 58 },
      { input: '4x3x2\n', output: 2 * 4 * 3 + 2 * 3 * 2 + 2 * 2 * 4 + 3 * 2 },
      { input: '11x15x13\n', output: 2 * 11 * 15 + 2 * 15 * 13 + 2 * 13 * 11 + 13 * 11 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new IWasToldThereWouldBeNoMathSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '2x3x4\n', output: 34 },
      { input: '1x1x10\n', output: 14 },
      { input: '2x3x4\n1x1x10\n', output: 14 + 34 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new IWasToldThereWouldBeNoMathSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
