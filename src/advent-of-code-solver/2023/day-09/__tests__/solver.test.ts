import Solver from '../../../../advent-of-code-solver/solver.js';
import MirageMaintenanceSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 9', () => {
  let solver: Solver<string>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '0 3 6 9 12 15\n', output: 18 },
      { input: '1 3 6 10 15 21\n', output: 28 },
      { input: '10 13 16 21 30 45\n', output: 68 },
      { input: '0 3 6 9 12 15\n' + '1 3 6 10 15 21\n' + '10 13 16 21 30 45\n', output: 114 },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new MirageMaintenanceSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '0 3 6 9 12 15\n', output: -3 },
      { input: '1 3 6 10 15 21\n', output: 0 },
      { input: '10 13 16 21 30 45\n', output: 5 },
      { input: '0 3 6 9 12 15\n' + '1 3 6 10 15 21\n' + '10 13 16 21 30 45\n', output: 2 },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new MirageMaintenanceSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
