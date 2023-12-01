import Solver from '../../../../advent-of-code-solver/solver';
import TrebuchetSolver from '../solver';

describe('day 1', () => {
  let solver: Solver<string[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '1abc2\n', output: 12 },
      { input: 'pqr3stu8vwx\n', output: 38 },
      { input: 'a1b2c3d4e5f\n', output: 15 },
      { input: 'treb7uchet\n', output: 77 },
      { input: '1abc2\n' + 'pqr3stu8vwx\n' + 'a1b2c3d4e5f\n' + 'treb7uchet', output: 142 },
      { input: 'seven1abc2\n', output: 12 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new TrebuchetSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: 'two1nine\n', output: 29 },
      { input: 'eightwothree\n', output: 83 },
      { input: 'abcone2threexyz\n', output: 13 },
      { input: 'xtwone3four\n', output: 24 },
      { input: '4nineeightseven2\n', output: 42 },
      { input: 'zoneight234\n', output: 14 },
      {
        input:
          'two1nine\n' +
          'eightwothree\n' +
          'abcone2threexyz\n' +
          'xtwone3four\n' +
          '4nineeightseven2\n' +
          'zoneight234\n' +
          '7pqrstsixteen\n\n',
        output: 281,
      },
      { input: '99lbqpxzzlbtvkmfrvrnmcxttseven\n', output: 97 },
      { input: '21three\n', output: 23 },
      { input: 'fourmsmjqfmbjvtwosevendcljsdcstl3one\n', output: 41 },
      { input: '4sevenfddxgcvdgx\n', output: 47 },
      { input: '8four3\n', output: 83 },
      { input: 'xcntwone4633sixmkm1nine\n', output: 29 },
      { input: '3eightlrrlgck967\n', output: 37 },
      { input: 'cvhlpzsbmknkqpgsevenlkzvm7hnznjsbszgvxrmdnn4\n', output: 74 },
      { input: 'lkdbjd5\n', output: 55 },
      { input: '5fourtxxxvfthreelxcmghhtkqnrqzvts\n', output: 53 },
      { input: '6glzfour77fiveone\n', output: 61 },
      { input: 'twocbtbkxhhcdrctkc14hlmdh\n', output: 24 },
      { input: '21three\n', output: 23 },
      { input: '1five72cxh3fivefive\n', output: 15 },
      { input: 'six8flfzdzl72eightnine\n', output: 69 },
      { input: 'sevensevenzsztgvh4sixbzltzl\n', output: 76 },
      { input: 'six7eighteightq68eight\n', output: 68 },
      { input: 'nine3sbj5msppfonetwo\n', output: 92 },
      { input: '1abc2\n', output: 12 },
      { input: 'pqr3stu8vwx\n', output: 38 },
      { input: 'a1b2c3d4e5f\n', output: 15 },
      { input: 'treb7uchet\n', output: 77 },
      { input: '1abc2\n' + 'pqr3stu8vwx\n' + 'a1b2c3d4e5f\n' + 'treb7uchet', output: 142 },
      { input: '51', output: 51 },
      { input: 'klvsv73', output: 73 },
      { input: 'onezvbhrblrkzcrsevensix96jnpxjone', output: 11 },
      { input: 'nine6chd4', output: 94 },
      { input: 'bdvkqlrh9eight6eightninehq7', output: 97 },
      { input: 'fivexpx1vsrreightkp7dph', output: 57 },
      { input: '3eightlrrlgck967', output: 37 },
      { input: 'xcntwone4633sixmkm1nine', output: 29 },
      { input: 'xcntwone4633sixmkm1nine\n' + '3eightlrrlgck967\n', output: 29 + 37 },
      { input: '67sixeighthvfkjhtj5', output: 65 },
      { input: '644', output: 64 },
      { input: 'onezdfz6', output: 16 },
      { input: 'vqhvfxrxhpdgqhcrrczjlmhdnlzseventvtrrktd9twonenqn', output: 71 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new TrebuchetSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
