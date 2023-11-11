import TuningTrouble from './solver';
import Solver from '../../solver';

describe('2022 day 6', () => {
  let day: Solver<string[]>;
  beforeEach(() => {
    const raw_input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb\n';
    day = new TuningTrouble(raw_input);
  });
  describe('part one', () => {
    it('should be index 7', () => {
      expect(day.solvePartOne()).toEqual(7);
    });
  });
  describe('part two', () => {
    it('should be 19', () => {
      expect(day.solvePartTwo()).toEqual(19);
    });
  });
});
