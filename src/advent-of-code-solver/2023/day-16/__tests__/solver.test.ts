import Solver from '../../../../advent-of-code-solver/solver';
import TheFloorWillBeLavaSolver, { MirrorTileValue } from '../solver';

describe('day 16', () => {
  let solver: Solver<MirrorTileValue[][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          '.|...\\....\n' +
          '|.-.\\.....\n' +
          '.....|-...\n' +
          '........|.\n' +
          '..........\n' +
          '.........\\\n' +
          '..../.\\\\..\n' +
          '.-.-/..|..\n' +
          '.|....-|.\\\n' +
          '..//.|....\n\n',
        output: 46,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new TheFloorWillBeLavaSolver(input);
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
          '.|...\\....\n' +
          '|.-.\\.....\n' +
          '.....|-...\n' +
          '........|.\n' +
          '..........\n' +
          '.........\\\n' +
          '..../.\\\\..\n' +
          '.-.-/..|..\n' +
          '.|....-|.\\\n' +
          '..//.|....\n\n',
        output: 51,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new TheFloorWillBeLavaSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
