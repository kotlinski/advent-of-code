import Solver from '../../../../advent-of-code-solver/solver';
import InverseCaptchaSolver from '../solver';

describe('day 1', () => {
  let solver: Solver<number[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '1122\n', output: 3 },
      { input: '1111\n', output: 4 },
      { input: '1234\n', output: 0 },
      { input: '91212129\n', output: 9 },
    ];
    describe.each(cases)('$input', ({ input, output }: TestCase) => {
      it('should result with $output', () => {
        solver = new InverseCaptchaSolver(input);
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
