import Solver from '../../../../advent-of-code-solver/solver';
import NoTimeForATaxicabSolver, { CoordinatedStep } from '../solver';

describe('day 1', () => {
  let solver: Solver<CoordinatedStep[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: 'R2, L3\n', output: 5 },
      { input: 'R2, R2, R2\n', output: 2 },
      { input: 'R5, L5, R5, R3\n', output: 12 },
      { input: 'R5, L5, R5, R3, R2 \n', output: 10 },
      { input: 'R5, L5, R5, R3, R10 \n', output: 2 },
    ];
    describe.each(cases)('$input', ({ input, output }: TestCase) => {
      it(`should be ${output}`, () => {
        solver = new NoTimeForATaxicabSolver(input);
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
