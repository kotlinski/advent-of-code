import LobbySolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '987654321111111\n' + '811111111111119\n' + '234234234234278\n' + '818181911112111\n\n';

describe('day 3', () => {
  let solver: LobbySolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new LobbySolver(input);
      expect(solver.input).toEqual([
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1],
        [8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        [2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8],
        [8, 1, 8, 1, 8, 1, 9, 1, 1, 1, 1, 2, 1, 1, 1],
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 357`, () => {
      solver = new LobbySolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(357);
    });
  });
  describe('part two', () => {
    it(`should equal to 3121910778619`, () => {
      solver = new LobbySolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(3121910778619);
    });
  });
});
