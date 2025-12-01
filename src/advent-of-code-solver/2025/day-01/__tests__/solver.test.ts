import SecretEntranceSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '\n';

describe('day 1', () => {
  let solver: SecretEntranceSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new SecretEntranceSolver(input);
      expect(solver.input).toEqual([]);
    });
  });
  describe('part one', () => {
    it(`should equal to 43`, () => {
      solver = new SecretEntranceSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(43);
    });
  });
  describe('part two', () => {
    it(`should equal to 4711`, () => {
      solver = new SecretEntranceSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(4711);
    });
  });
});
