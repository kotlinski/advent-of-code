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
      {
        input:
          '.F----7F7F7F7F-7....\n' +
          '.|F--7||||||||FJ....\n' +
          '.||.FJ||||||||L7....\n' +
          'FJL7L7LJLJ||LJ.L-7..\n' +
          'L--J.L7...LJS7F-7L7.\n' +
          '....F-J..F7FJ|L7L7L7\n' +
          '....L7.F7||L7|.L7L7|\n' +
          '.....|FJLJ|FJ|F7|.LJ\n' +
          '....FJL-7.||.||||...\n' +
          '....L---J.LJ.LJLJ...',
        output: 70,
      },
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
      {
        input:
          '...........\n' +
          '.S-------7.\n' +
          '.|F-----7|.\n' +
          '.||.....||.\n' +
          '.||.....||.\n' +
          '.|L-7.F-J|.\n' +
          '.|..|.|..|.\n' +
          '.L--J.L--J.\n' +
          '...........\n',
        output: 4,
      },
      {
        input:
          '.F----7F7F7F7F-7....\n' +
          '.|F--7||||||||FJ....\n' +
          '.||.FJ||||||||L7....\n' +
          'FJL7L7LJLJ||LJ.L-7..\n' +
          'L--J.L7...LJS7F-7L7.\n' +
          '....F-J..F7FJ|L7L7L7\n' +
          '....L7.F7||L7|.L7L7|\n' +
          '.....|FJLJ|FJ|F7|.LJ\n' +
          '....FJL-7.||.||||...\n' +
          '....L---J.LJ.LJLJ...\n',
        output: 8,
      },
      {
        input:
          'FF7FSF7F7F7F7F7F---7\n' +
          'L|LJ||||||||||||F--J\n' +
          'FL-7LJLJ||||||LJL-77\n' +
          'F--JF--7||LJLJ7F7FJ-\n' +
          'L---JF-JLJ.||-FJLJJ7\n' +
          '|F|F-JF---7F7-L7L|7|\n' +
          '|FFJF7L7F-JF7|JL---7\n' +
          '7-L-JL7||F7|L7F-7F7|\n' +
          'L.L7LFJ|||||FJL7||LJ\n' +
          'L7JLJL-JLJLJL--JLJ.L',
        output: 10,
      },
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
