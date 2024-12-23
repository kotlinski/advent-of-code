import Solver from '../../../../advent-of-code-solver/solver.js';
import CorruptionChecksumSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 2', () => {
  let solver: Solver<number[][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '5 1 9 5\n', output: 8 },
      { input: '7 5 3\n', output: 4 },
      { input: '2 4 6 8\n', output: 6 },
      { input: '5 1 9 5\n' + '7 5 3\n' + '2 4 6 8', output: 18 },
    ];
    cases.forEach(({ input, output }: TestCase) => {
      it(`should result with ${output}`, () => {
        solver = new CorruptionChecksumSolver(input);
        expect(solver.solvePartOne()).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '5 9 2 8\n', output: 4 },
      { input: '9 4 7 3\n', output: 3 },
      { input: '3 8 6 2', output: 2 },
      { input: '5 9 2 8\n' + '9 4 7 3\n' + '3 8 6 5', output: 9 },
    ];
    cases.forEach(({ input, output }: TestCase) => {
      it(`should result with ${output}`, () => {
        solver = new CorruptionChecksumSolver(input);
        expect(solver.solvePartTwo()).toEqual(output);
      });
    });
  });
});
