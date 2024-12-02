import Solver from '../../../../advent-of-code-solver/solver.js';
import RedSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const raw_input = '7 6 4 2 1\n' + '1 2 7 8 9\n' + '9 7 6 2 1\n' + '1 3 2 4 5\n' + '8 6 4 4 1\n' + '1 3 6 7 9\n';

describe('day 2', () => {
  let solver: Solver<number[][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [{ input: raw_input, output: 2 }];
    cases.forEach(({ input, output }) => {
      it('should parse the input correctly', () => {
        solver = new RedSolver(input);
        expect(solver.input).toEqual([
          [7, 6, 4, 2, 1],
          [1, 2, 7, 8, 9],
          [9, 7, 6, 2, 1],
          [1, 3, 2, 4, 5],
          [8, 6, 4, 4, 1],
          [1, 3, 6, 7, 9],
        ]);
      });
      it(`should equal to ${output}`, () => {
        solver = new RedSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: raw_input, output: 4 },
      { input: `${raw_input}60 59 60 62 65 67\n`, output: 5 }
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new RedSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
