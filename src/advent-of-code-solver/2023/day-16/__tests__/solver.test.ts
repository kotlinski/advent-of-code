import Solver from '../../../../advent-of-code-solver/solver';
import TheFloorWillBeLavaSolver from '../solver';

describe('day 16', () => {
  let solver: Solver<string>;
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
      { input: ')\n', output: 4711 },
      { input: '()())\n', output: 4711 },
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
