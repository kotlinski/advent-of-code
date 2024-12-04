import Solver from '../../../../advent-of-code-solver/solver.js';
import MullItOverSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))\n';
const input2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))\n";

describe('day 3', () => {
  let solver: Solver<string[]>;
  describe('parser', () => {
    it('should parse the first input correctly', () => {
      solver = new MullItOverSolver(input);
      expect(solver.input).toEqual(['mul(2,4)', 'do', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']);
    });
    it('should parse the second input correctly', () => {
      solver = new MullItOverSolver(input2);
      expect(solver.input).toEqual(['mul(2,4)', "don't", 'mul(5,5)', 'mul(11,8)', 'do', 'mul(8,5)']);
    });
  });
  describe('part one', () => {
    it(`should equal to 161`, () => {
      solver = new MullItOverSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(161);
    });
  });
  describe('part two', () => {
    it(`should equal to 48`, () => {
      solver = new MullItOverSolver(input2);
      const result = solver.solvePartTwo();
      expect(result).toEqual(48);
    });
  });
});
