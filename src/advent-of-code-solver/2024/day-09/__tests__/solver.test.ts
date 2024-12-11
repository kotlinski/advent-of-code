import DiskFragmenterSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '2333133121414131402\n';

describe('day 9', () => {
  let solver: DiskFragmenterSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new DiskFragmenterSolver(input);
      expect(solver.input).toEqual([
        [0, 0],
        [undefined, undefined, undefined],
        [1, 1, 1],
        [undefined, undefined, undefined],
        [2],
        [undefined, undefined, undefined],
        [3, 3, 3],
        [undefined],
        [4, 4],
        [undefined],
        [5, 5, 5, 5],
        [undefined],
        [6, 6, 6, 6],
        [undefined],
        [7, 7, 7],
        [undefined],
        [8, 8, 8, 8],
        [],
        [9, 9],
        [],
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 1928`, () => {
      solver = new DiskFragmenterSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(1928);
    });
  });
  describe('part two', () => {
    it(`should equal to 2858`, () => {
      solver = new DiskFragmenterSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(2858);
    });
  });
});
