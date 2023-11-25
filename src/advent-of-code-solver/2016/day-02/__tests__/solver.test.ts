import Solver from '../../../../advent-of-code-solver/solver';
import BathroomSecuritySolver, { Instructions } from '../solver';

describe('day 2', () => {
  let solver: Solver<Instructions[]>;
  type TestCase = { input: string; output: string };
  describe('part one', () => {
    const cases: TestCase[] = [{ input: 'ULL\n' + 'RRDDD\n' + 'LURDL\n' + 'UUUUD\n', output: '1985' }];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new BathroomSecuritySolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    const cases: TestCase[] = [{ input: 'ULL\n' + 'RRDDD\n' + 'LURDL\n' + 'UUUUD\n', output: '5DB3' }];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new BathroomSecuritySolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
