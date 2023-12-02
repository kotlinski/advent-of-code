import Solver from '../../../../advent-of-code-solver/solver';
import CubeConundrumSolver, { Game } from '../solver';

describe('day 2', () => {
  let solver: Solver<Game[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          'Game 1: 7 red, 14 blue; 2 blue, 3 red, 3 green; 4 green, 12 blue, 15 red; 3 green, 12 blue, 3 red; 11 red, 2 green\n',
        output: 0,
      },
      { input: 'Game 6: 12 red, 13 green, 14 blue\n', output: 6 },
      { input: 'Game 7: 12 red, 13 green, 14 blue;1 blue\n', output: 7 },
      { input: 'Game 8: 10 red, 10 green, 10 blue; 1 red, 1 green, 1 blue\n', output: 8 },
      {
        input:
          'Game 10: 12 green, 7 red, 1 blue; 6 red, 12 green; 6 red, 7 green, 1 blue; 1 red, 1 blue, 18 green; 11 green, 1 blue\n',
        output: 0,
      },
      { input: 'Game 100: 8 red, 3 green; 4 green, 1 blue, 15 red; 10 red, 8 green, 1 blue\n', output: 0 },
      { input: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n', output: 1 },
      { input: 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n', output: 2 },
      { input: 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n', output: 0 },
      { input: 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n', output: 0 },
      { input: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n', output: 5 },
      {
        input:
          'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
          'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
          'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
          'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
          'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n',
        output: 8,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new CubeConundrumSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n', output: 48 },
      { input: 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n', output: 12 },
      { input: 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n', output: 1560 },
      { input: 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n', output: 630 },
      { input: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n', output: 36 },
      {
        input:
          'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
          'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
          'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
          'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
          'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n',
        output: 2286,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new CubeConundrumSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
