import GiftShopSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,' +
  '1698522-1698528,446443-446449,38593856-38593862,565653-565659,' +
  '824824821-824824827,2121212118-2121212124\n';

describe('day 2', () => {
  let solver: GiftShopSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new GiftShopSolver(input);
      expect(solver.input).toEqual([
        [11, 22],
        [95, 115],
        [998, 1012],
        [1188511880, 1188511890],
        [222220, 222224],
        [1698522, 1698528],
        [446443, 446449],
        [38593856, 38593862],
        [565653, 565659],
        [824824821, 824824827],
        [2121212118, 2121212124],
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 1227775554`, () => {
      solver = new GiftShopSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(1227775554);
    });
  });
  describe('part two', () => {
    it(`should equal to 4174379265`, () => {
      solver = new GiftShopSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(4174379265);
    });
  });
});
