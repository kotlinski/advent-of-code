import CampCleanup from './solver.js';
import Solver from '../../solver.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('2022 day 4', () => {
  let day: Solver<number[][][]>;
  beforeEach(() => {
    const raw_input = '2-4,6-8\n' + '2-3,4-5\n' + '5-7,7-9\n' + '2-8,3-7\n' + '6-6,4-6\n' + '2-6,4-8\n';
    day = new CampCleanup(raw_input);
  });
  describe('part one', () => {
    it('should be 0', () => {
      expect(day.solvePartOne()).toEqual(2);
    });
    it('should be 1 if 8-8', () => {
      day = new CampCleanup('8-8,8-8\n');
      expect(day.solvePartOne()).toEqual(1);
    });
    it('should be 0 if not included in large range', () => {
      day = new CampCleanup('2-3,3-100\n');
      expect(day.solvePartOne()).toEqual(0);
    });
  });
  describe('part two', () => {
    it('should be 70', () => {
      expect(day.solvePartTwo()).toEqual(4);
    });
  });
});
