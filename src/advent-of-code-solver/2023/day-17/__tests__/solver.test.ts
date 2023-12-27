import Solver from '../../../../advent-of-code-solver/solver';
import ClumsyCrucibleSolver from '../solver';

describe('day 17', () => {
  let solver: Solver<number[][]>;
  const city_map =
    '2413432311323\n' +
    '3215453535623\n' +
    '3255245654254\n' +
    '3446585845452\n' +
    '4546657867536\n' +
    '1438598798454\n' +
    '4457876987766\n' +
    '3637877979653\n' +
    '4654967986887\n' +
    '4564679986453\n' +
    '1224686865563\n' +
    '2546548887735\n' +
    '4322674655533\n';
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input: city_map,
        output: 102,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new ClumsyCrucibleSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input: city_map,
        output: 94,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new ClumsyCrucibleSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
