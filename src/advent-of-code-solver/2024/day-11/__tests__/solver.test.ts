import PlutonianPebblesSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '125 17\n';

describe('day 11', () => {
  let solver: PlutonianPebblesSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new PlutonianPebblesSolver(input);
      expect(solver.input).toEqual([125, 17]);
    });
  });
  describe('part one', () => {
    describe('test input 1', () => {
      it(`should equal to 55312`, () => {
        solver = new PlutonianPebblesSolver(input);
        const result = solver.solvePartOne({ iterations: 25 });
        expect(result).toEqual(55312);
      });
    });
    describe('test input 2', () => {
      it(`should equal to 7`, () => {
        solver = new PlutonianPebblesSolver('0 1 10 99 999');
        const result = solver.solvePartOne({ iterations: 1 });
        expect(result).toEqual(7);
      });
    });
  });
  describe('part two', () => {
    it(`should equal to 65601038650482`, () => {
      solver = new PlutonianPebblesSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(65601038650482);
    });
  });
});
