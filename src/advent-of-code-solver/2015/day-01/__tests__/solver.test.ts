import Solver from '../../../../advent-of-code-solver/solver';
import NotQuiteLispSolver from '../solver';

describe('2015 day 1', () => {
  let solver: Solver<('(' | ')')[]>;

  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '(())\n', output: 0 },
      { input: '()()\n', output: 0 },
      { input: '(((\n', output: 3 },
      { input: '(()(()(\n', output: 3 },
      { input: '))(((((\n', output: 3 },
      { input: '())\n', output: -1 },
      { input: '))(\n', output: -1 },
      { input: ')))\n', output: -3 },
      { input: ')())())\n', output: -3 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new NotQuiteLispSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(solver.solvePartTwo()).toEqual(4711);
    });
  });
});
