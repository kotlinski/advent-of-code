import Solver from '../../../../advent-of-code-solver/solver.js';
import BridgeRepairSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '\n';

describe('day 7', () => {
  let solver: Solver<number[]>;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new BridgeRepairSolver(input);
      expect(solver.input).toEqual([]);
    });
  });
  describe('part one', () => {
    it(`should equal to 43`, () => {
      solver = new BridgeRepairSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(43);
    });
  });
  describe('part two', () => {
    it(`should equal to 4711`, () => {
      solver = new BridgeRepairSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(4711);
    });
  });
});
