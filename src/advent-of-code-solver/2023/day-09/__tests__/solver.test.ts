import Solver from '../../../../advent-of-code-solver/solver';
import MirageMaintenanceSolver from '../solver';

describe('day 9', () => {
  let solver: Solver<string>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '0 3 6 9 12 15\n', output: 18 },
      { input: '1 3 6 10 15 21\n', output: 28 },
      { input: '10 13 16 21 30 45\n', output: 68 },
      { input: '0 3 6 9 12 15\n' + '1 3 6 10 15 21\n' + '10 13 16 21 30 45\n', output: 114 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new MirageMaintenanceSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '0 3 6 9 12 15\n' + '1 3 6 10 15 21\n' + '10 13 16 21 30 45\n', output: 4711 },
      { input: '()())\n', output: 4711 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new MirageMaintenanceSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
