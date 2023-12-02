import Solver from '../../../../advent-of-code-solver/solver';
import PasswordPhilosophySolver, { PasswordValidator } from '../solver';

describe('day 2', () => {
  let solver: Solver<PasswordValidator[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '1-3 a: abcde\n', output: 1 },
      { input: '1-3 b: cdefg\n', output: 0 },
      { input: '2-9 c: ccccccccc\n', output: 1 },
      { input: '1-3 a: abcde\n' + '1-3 b: cdefg\n' + '2-9 c: ccccccccc\n', output: 2 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new PasswordPhilosophySolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '1-3 a: abcde\n', output: 4711 },
      { input: '1-3 b: cdefg\n', output: 4711 },
      { input: '2-9 c: ccccccccc\n', output: 4711 },
      { input: '1-3 a: abcde\n' + '1-3 b: cdefg\n' + '2-9 c: ccccccccc\n', output: 4711 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new PasswordPhilosophySolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
