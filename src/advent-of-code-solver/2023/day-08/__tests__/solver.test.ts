import Solver from '../../../../advent-of-code-solver/solver';
import { GhostMap } from '../ghost-map';
import HauntedWastelandSolver from '../solver';

describe('day 8', () => {
  let solver: Solver<GhostMap>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          'RL\n' +
          '\n' +
          'AAA = (BBB, CCC)\n' +
          'BBB = (DDD, EEE)\n' +
          'CCC = (ZZZ, GGG)\n' +
          'DDD = (DDD, DDD)\n' +
          'EEE = (EEE, EEE)\n' +
          'GGG = (GGG, GGG)\n' +
          'ZZZ = (ZZZ, ZZZ)\n',
        output: 2,
      },
      { input: 'LLR\n' + '\n' + 'AAA = (BBB, BBB)\n' + 'BBB = (AAA, ZZZ)\n' + 'ZZZ = (ZZZ, ZZZ)\n', output: 6 },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new HauntedWastelandSolver(input);
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
          'LR\n' +
          '\n' +
          '11A = (11B, XXX)\n' +
          '11B = (XXX, 11Z)\n' +
          '11Z = (11B, XXX)\n' +
          '22A = (22B, XXX)\n' +
          '22B = (22C, 22C)\n' +
          '22C = (22Z, 22Z)\n' +
          '22Z = (22B, 22B)\n' +
          'XXX = (XXX, XXX)\n',
        output: 6,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new HauntedWastelandSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
