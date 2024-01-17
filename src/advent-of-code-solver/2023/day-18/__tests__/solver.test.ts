import Solver from '../../../../advent-of-code-solver/solver';
import LavaductLagoonSolver, { DigInstruction } from '../solver';

describe('day 18', () => {
  let solver: Solver<DigInstruction[]>;
  describe('part one', () => {
    describe('box', () => {
      it(`should equal`, () => {
        solver = new LavaductLagoonSolver('R 1 (#70c710)\n' + 'D 1 (#0dc571)\n' + 'L 1 (#5713f0)\n' + 'U 1 (#d2c081)\n');
        const result = solver.solvePartOne();
        expect(result).toEqual(4);
      });
    });
    describe('sample-data', () => {
      type TestCase = { input: string; output: number };
      const cases: TestCase[] = [
        {
          input:
            'R 6 (#70c710)\n' +
            'D 5 (#0dc571)\n' +
            'L 2 (#5713f0)\n' +
            'D 2 (#d2c081)\n' +
            'R 2 (#59c680)\n' +
            'D 2 (#411b91)\n' +
            'L 5 (#8ceee2)\n' +
            'U 2 (#caa173)\n' +
            'L 1 (#1b58a2)\n' +
            'U 2 (#caa171)\n' +
            'R 2 (#7807d2)\n' +
            'U 3 (#a77fa3)\n' +
            'L 2 (#015232)\n' +
            'U 2 (#7a21e3)\n',
          output: 62,
        },
        {
          input:
            'U 1 (#70c710)\n' +
            'R 6 (#70c710)\n' +
            'D 6 (#0dc571)\n' +
            'L 2 (#5713f0)\n' +
            'D 2 (#d2c081)\n' +
            'R 2 (#59c680)\n' +
            'D 2 (#411b91)\n' +
            'L 5 (#8ceee2)\n' +
            'U 2 (#caa173)\n' +
            'L 1 (#1b58a2)\n' +
            'U 2 (#caa171)\n' +
            'R 2 (#7807d2)\n' +
            'U 3 (#a77fa3)\n' +
            'L 2 (#015232)\n' +
            'U 2 (#7a21e3)\n',
          output: 69,
        },
      ];
      describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
        it(`should equal to ${output}`, () => {
          solver = new LavaductLagoonSolver(input);
          const result = solver.solvePartOne();
          expect(result).toEqual(output);
        });
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          'R 6 (#70c710)\n' +
          'D 5 (#0dc571)\n' +
          'L 2 (#5713f0)\n' +
          'D 2 (#d2c081)\n' +
          'R 2 (#59c680)\n' +
          'D 2 (#411b91)\n' +
          'L 5 (#8ceee2)\n' +
          'U 2 (#caa173)\n' +
          'L 1 (#1b58a2)\n' +
          'U 2 (#caa171)\n' +
          'R 2 (#7807d2)\n' +
          'U 3 (#a77fa3)\n' +
          'L 2 (#015232)\n' +
          'U 2 (#7a21e3)',
        output: 952408144115,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new LavaductLagoonSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
