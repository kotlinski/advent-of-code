import Solver from '../../../solver.js';
import NoTimeForATaxicabSolver, { CoordinatedStep } from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 1', () => {
  let solver: Solver<CoordinatedStep[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: 'R2, L3\n', output: 5 },
      { input: 'R2, R2, R2\n', output: 2 },
      { input: 'R5, L5, R5, R3\n', output: 12 },
      { input: 'R5, L5, R5, R3, R2 \n', output: 10 },
      { input: 'R5, L5, R5, R3, R10 \n', output: 2 },
    ];
    cases.forEach(({ input, output }) => {
      describe('$input', () => {
        it(`should be ${output}`, () => {
          solver = new NoTimeForATaxicabSolver(input);
          expect(solver.solvePartOne()).toEqual(output);
        });
      });
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      solver = new NoTimeForATaxicabSolver('R8, R4, R4, R8\n');
      expect(solver.solvePartTwo()).toEqual(4);
    });
  });
});
