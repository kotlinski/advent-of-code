import Solver from '../../../../advent-of-code-solver/solver.js';
import HistorianHysteriaSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const raw_input = '3   4\n' + '4   3\n' + '2   5\n' + '1   3\n' + '3   9\n' + '3   3\n';

describe('day 1', () => {
  let solver: Solver<number[][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [{ input: raw_input, output: 11 }];
    cases.forEach(({ input, output }) => {
      it('should parse the input correctly', () => {
        solver = new HistorianHysteriaSolver(input);
        expect(solver.input).toEqual([
          [3, 4, 2, 1, 3, 3],
          [4, 3, 5, 3, 9, 3],
        ]);
      });
      it(`should equal to ${output}`, () => {
        solver = new HistorianHysteriaSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [{ input: raw_input, output: 31 }];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new HistorianHysteriaSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
