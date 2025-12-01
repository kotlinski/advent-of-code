import SecretEntranceSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = 'L68\n' + 'L30\n' + 'R48\n' + 'L5\n' + 'R60\n' + 'L55\n' + 'L1\n' + 'L99\n' + 'R14\n' + 'L82\n\n';

describe('day 1', () => {
  let solver: SecretEntranceSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new SecretEntranceSolver(input);
      expect(solver.input).toEqual([-68, -30, 48, -5, 60, -55, -1, -99, 14, -82]);
    });
  });
  describe('part one', () => {
    it(`should equal to 3`, () => {
      solver = new SecretEntranceSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(3);
    });
  });
  describe('part two', () => {
    it(`should equal to 6`, () => {
      solver = new SecretEntranceSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(6);
    });
  });
});
