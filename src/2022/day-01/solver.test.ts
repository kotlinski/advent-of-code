import Solver from '../../solver';
import CalorieCounting from './solver';

describe('2022 day 1', () => {
  let day: Solver<number[]>;
  beforeEach(() => {
    const raw_input =
      '1000\n' +
      '2000\n' +
      '3000\n' +
      '\n' +
      '4000\n' +
      '\n' +
      '5000\n' +
      '6000\n' +
      '\n' +
      '7000\n' +
      '8000\n' +
      '9000\n' +
      '\n' +
      '10000' +
      '\n';
    day = new CalorieCounting(raw_input);
  });
  describe('part one', () => {
    it('should be 24000', () => {
      expect(day.solvePartOne()).toEqual(24000);
    });
  });
  describe('part two', () => {
    it('should be 45000', () => {
      expect(day.solvePartTwo()).toEqual(45000);
    });
  });
});
