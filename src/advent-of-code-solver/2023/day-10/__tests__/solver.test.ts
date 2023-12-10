import Solver from '../../../../advent-of-code-solver/solver';
import PipeMazeSolver from '../solver';

describe('day 10', () => {
  let solver: Solver<string>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '.....\n' + '.S-7.\n' + '.|.|.\n' + '.L-J.\n' + '.....\n', output: 4 },
      { input: '-L|F7\n' + '7S-7|\n' + 'L|7||\n' + '-L-J|\n' + 'L|-JF\n', output: 4 },
      { input: '..F7.\n' + '.FJ|.\n' + 'SJ.L7\n' + '|F--J\n' + 'LJ...\n', output: 8 },
      { input: '7-F7-\n' + '.FJ|7\n' + 'SJLL7\n' + '|F--J\n' + 'LJ.LJ', output: 8 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new PipeMazeSolver(input);
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
        solver = new PipeMazeSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
