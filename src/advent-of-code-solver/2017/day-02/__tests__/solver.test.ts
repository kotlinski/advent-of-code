import Solver from '../../../../advent-of-code-solver/solver';
import CorruptionChecksumSolver from '../solver';

describe('day 2', () => {
  let solver: Solver<number[][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '5 1 9 5\n', output: 8 },
      { input: '7 5 3\n', output: 4 },
      { input: '2 4 6 8\n', output: 6 },
      { input: '5 1 9 5\n' + '7 5 3\n' + '2 4 6 8', output: 18 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new CorruptionChecksumSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: ')\n', output: 4711 },
      { input: '()())\n', output: 4711 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new CorruptionChecksumSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
