import Solver from '../../../../advent-of-code-solver/solver';
import InventoryManagementSystemSolver from '../solver';

describe('day 2', () => {
  let solver: Solver<string[][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: 'abcdef\n', output: 0 },
      { input: 'bababc\n', output: 1 },
      { input: 'abbcde\n', output: 0 },
      { input: 'abcccd\n', output: 0 },
      { input: 'aabcdd\n', output: 0 },
      { input: 'ababab\n', output: 0 },
      { input: 'abcdef\n' + 'bababc\n' + 'abbcde\n' + 'abcccd\n' + 'aabcdd\n' + 'abcdee\n' + 'ababab\n', output: 12 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new InventoryManagementSystemSolver(input);
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
        solver = new InventoryManagementSystemSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
