import Solver from '../../../../advent-of-code-solver/solver';
import ScratchcardsSolver, { ScratchCard } from '../solver';

describe('day 4', () => {
  let solver: Solver<ScratchCard[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\n', output: 8 },
      { input: 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\n', output: 2 },
      { input: 'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\n', output: 2 },
      { input: 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\n', output: 1 },
      { input: 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\n', output: 0 },
      { input: 'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\n', output: 0 },
      {
        input:
          'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\n' +
          'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\n' +
          'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\n' +
          'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\n' +
          'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\n' +
          'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\n',
        output: 13,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new ScratchcardsSolver(input);
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
        solver = new ScratchcardsSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
