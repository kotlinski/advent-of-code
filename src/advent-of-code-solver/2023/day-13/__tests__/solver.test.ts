import Solver from '../../../../advent-of-code-solver/solver';
import PointOfIncidenceSolver from '../solver';

describe('day 13', () => {
  let solver: Solver<string[][][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input: '#...##..#\n' + '#....#..#\n' + '..##..###\n' + '#####.##.\n' + '#####.##.\n' + '..##..###\n' + '#....#..#\n',
        output: 400,
      },
      {
        input: '#.##..##.\n' + '..#.##.#.\n' + '##......#\n' + '##......#\n' + '..#.##.#.\n' + '..##..##.\n' + '#.#.##.#.\n',
        output: 5,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##......#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '#...##..#\n' +
          '#....#..#\n' +
          '..##..###\n' +
          '#####.##.\n' +
          '#####.##.\n' +
          '..##..###\n' +
          '#....#..#\n',
        output: 405,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new PointOfIncidenceSolver(input);
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
          '#...##..#\n' +
          '#....#..#\n' +
          '..##..###\n' +
          '#####.##.\n' +
          '#####.##.\n' +
          '..##..###\n' +
          '#....#..#\n' +
          '\n' +
          '\n' +
          '\n',
        output: 100,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##......#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '\n' +
          '\n',
        output: 300,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##......#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '#...##..#\n' +
          '#....#..#\n' +
          '..##..###\n' +
          '#####.##.\n' +
          '#####.##.\n' +
          '..##..###\n' +
          '#....#..#\n',
        output: 400,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##..#...#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '\n' +
          '\n',
        output: 5,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new PointOfIncidenceSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
