import Solver from '../../../../advent-of-code-solver/solver';
import CosmicExpansionSolver from '../solver';

describe('day 11', () => {
  let solver: Solver<string>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          '...#......\n' +
          '.......#..\n' +
          '#.........\n' +
          '..........\n' +
          '......#...\n' +
          '.#........\n' +
          '.........#\n' +
          '..........\n' +
          '.......#..\n' +
          '#...#.....\n',
        output: 374,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new CosmicExpansionSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          '...#......\n' +
          '.......#..\n' +
          '#.........\n' +
          '..........\n' +
          '......#...\n' +
          '.#........\n' +
          '.........#\n' +
          '..........\n' +
          '.......#..\n' +
          '#...#.....',
        output: 82000210,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new CosmicExpansionSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
