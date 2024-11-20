import RockPaperScissors from './solver.js';
import Solver from '../../solver.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('2022 day 2', () => {
  let day: Solver<string[][]>;
  beforeEach(() => {
    const raw_input = 'A Y\n' + 'B X\n' + 'C Z\n';
    day = new RockPaperScissors(raw_input);
  });
  describe('part one', () => {
    it('should be 15', () => {
      expect(day.solvePartOne()).toEqual(15);
    });
  });
  describe('part two', () => {
    it('should be 12', () => {
      expect(day.solvePartTwo()).toEqual(12);
    });
  });
});
