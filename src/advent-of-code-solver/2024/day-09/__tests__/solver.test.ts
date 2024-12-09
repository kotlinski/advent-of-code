import DiskFragmenterSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '2333133121414131402\n';

describe('day 9', () => {
  let solver: DiskFragmenterSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new DiskFragmenterSolver(input);
      expect(solver.input).toEqual({
        'data': [
          { 'id': 0, 'size': 2 },
          { 'id': 1, 'size': 3 },
          { 'id': 2, 'size': 1 },
          { 'id': 3, 'size': 3 },
          { 'id': 4, 'size': 2 },
          { 'id': 5, 'size': 4 },
          { 'id': 6, 'size': 4 },
          { 'id': 7, 'size': 3 },
          { 'id': 8, 'size': 4 },
          { 'id': 9, 'size': 2 },
        ],
        'empty': [
          { 'size': 3 },
          { 'size': 3 },
          { 'size': 3 },
          { 'size': 1 },
          { 'size': 1 },
          { 'size': 1 },
          { 'size': 1 },
          { 'size': 1 },
          { 'size': 0 },
          { 'size': 0 },
        ],
      });
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
    it(`should equal to 4711`, () => {
      solver = new DiskFragmenterSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(4711);
    });
  });
});
