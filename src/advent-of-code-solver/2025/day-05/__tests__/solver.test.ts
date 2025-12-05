import CafeteriaSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '3-5\n' + '10-14\n' + '16-20\n' + '12-18\n' + '\n' + '1\n' + '5\n' + '8\n' + '11\n' + '17\n' + '32\n\n';

describe('day 5', () => {
  let solver: CafeteriaSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new CafeteriaSolver(input);
      expect(solver.input).toEqual({
        ingredients: [1, 5, 8, 11, 17, 32],
        ranges: [
          [3, 5],
          [10, 14],
          [16, 20],
          [12, 18],
        ],
      });
    });
  });
  describe('part one', () => {
    it(`should equal to 3`, () => {
      solver = new CafeteriaSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(3);
    });
  });
  describe('part two', () => {
    it(`should equal to 4711`, () => {
      solver = new CafeteriaSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(4711);
    });
  });
});
