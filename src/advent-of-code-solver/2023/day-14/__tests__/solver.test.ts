import Solver from '../../../../advent-of-code-solver/solver';
import ParabolicReflectorDishSolver from '../solver';

describe('day 14', () => {
  let solver: Solver<string>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          'O....#....\n' +
          'O.OO#....#\n' +
          '.....##...\n' +
          'OO.#O....O\n' +
          '.O.....O#.\n' +
          'O.#..O.#.#\n' +
          '..O..#O..O\n' +
          '.......O..\n' +
          '#....###..\n' +
          '#OO..#....\n',
        output: 136,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new ParabolicReflectorDishSolver(input);
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
          'O....#....\n' +
          'O.OO#....#\n' +
          '.....##...\n' +
          'OO.#O....O\n' +
          '.O.....O#.\n' +
          'O.#..O.#.#\n' +
          '..O..#O..O\n' +
          '.......O..\n' +
          '#....###..\n' +
          '#OO..#....\n',
        output: 64,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new ParabolicReflectorDishSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
