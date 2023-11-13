import Solver from '../../../../advent-of-code-solver/solver';
import TheTyrannyOfTheRocketEquationSolver from '../solver';

describe('day 1', () => {
  let solver: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '12\n' + '14\n' + '1969\n' + '100756\n';
    solver = new TheTyrannyOfTheRocketEquationSolver(raw_input);
  });
  describe('part one', () => {
    it('should be 34,241', () => {
      expect(solver.solvePartOne()).toEqual(2 + 2 + 654 + 33583);
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '14', output: 2 },
      { input: '1969', output: 966 },
      { input: '100756', output: 50346 },
    ];
    describe.each(cases)('input', ({ input, output }: TestCase) => {
      it('should', () => {
        solver = new TheTyrannyOfTheRocketEquationSolver(input);
        expect(solver.solvePartTwo()).toEqual(output);
      });
    });
  });
});
