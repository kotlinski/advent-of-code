import TheTreacheryOfWhalesSolver from './solver.js';
import Solver from '../../solver.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 7', () => {
  let day: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '16,1,2,0,4,2,7,1,2,14';
    day = new TheTreacheryOfWhalesSolver(raw_input);
  });
  describe('part one', () => {
    it('should be solved with 37 fuel units', () => {
      expect(day.solvePartOne()).toEqual(37);
    });
  });
  describe('part two', () => {
    it('should be solved with 168 fuel units', () => {
      expect(day.solvePartTwo()).toEqual(168);
    });
  });
});
