import Solver from '../../../../advent-of-code-solver/solver';
import IfYouGiveASeedAFertilizerSolver, { FoodProductionMapper } from '../solver';
const test_input_data =
  'seeds: 79 14 55 13\n' +
  '\n' +
  'seed-to-soil map:\n' +
  '50 98 2\n' +
  '52 50 48\n' +
  '\n' +
  'soil-to-fertilizer map:\n' +
  '0 15 37\n' +
  '37 52 2\n' +
  '39 0 15\n' +
  '\n' +
  'fertilizer-to-water map:\n' +
  '49 53 8\n' +
  '0 11 42\n' +
  '42 0 7\n' +
  '57 7 4\n' +
  '\n' +
  'water-to-light map:\n' +
  '88 18 7\n' +
  '18 25 70\n' +
  '\n' +
  'light-to-temperature map:\n' +
  '45 77 23\n' +
  '81 45 19\n' +
  '68 64 13\n' +
  '\n' +
  'temperature-to-humidity map:\n' +
  '0 69 1\n' +
  '1 0 69\n' +
  '\n' +
  'humidity-to-location map:\n' +
  '60 56 37\n' +
  '56 93 4\n\n';

describe('day 5', () => {
  let solver: Solver<FoodProductionMapper>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input: test_input_data,
        output: 35,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new IfYouGiveASeedAFertilizerSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [{ input: test_input_data, output: 46 }];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new IfYouGiveASeedAFertilizerSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
