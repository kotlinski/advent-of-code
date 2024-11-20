import Solver from '../../../../advent-of-code-solver/solver.js';
import RopeBridgeSolver from '../solver.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 9', () => {
  let solver: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '1\n';
    solver = new RopeBridgeSolver(raw_input);
  });
  describe('part one', () => {
    it('should be 47', () => {
      expect(solver.solvePartOne()).toEqual(47);
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(solver.solvePartTwo()).toEqual(4711);
    });
  });
});
