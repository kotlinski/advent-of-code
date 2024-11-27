import TreetopTreeHouse from './solver.js';
import Solver from '../../solver.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('2022 day 8', () => {
  let day: Solver<number[][]>;
  beforeEach(() => {
    const raw_input = '30373\n' + '25512\n' + '65332\n' + '33549\n' + '35390\n';
    day = new TreetopTreeHouse(raw_input);
  });
  describe('part one', () => {
    it('should be 21 trees', () => {
      expect(day.solvePartOne()).toEqual(21);
    });
  });
  describe('part two', () => {
    it('should be a scenic of 8', () => {
      expect(day.solvePartTwo()).toEqual(8);
    });
  });
});
