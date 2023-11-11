import RockPaperScissors from './solver';
import Solver from '../../solver';

describe('2022 day 3', () => {
  let day: Solver<string[][]>;
  beforeEach(() => {
    const raw_input =
      'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
      'PmmdzqPrVvPwwTWBwg\n' +
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
      'ttgJtRGJQctTZtZT\n' +
      'CrZsJsPPZsGzwwsLwLmpwMDw\n';
    day = new RockPaperScissors(raw_input);
  });
  describe('part one', () => {
    it('should be 157', () => {
      expect(day.solvePartOne()).toEqual(157);
    });

    describe(`with 'aa' as input data`, () => {
      it('should return 1', () => {
        const raw_input = 'aa\n';
        day = new RockPaperScissors(raw_input);
        expect(day.solvePartOne()).toEqual(1);
      });
    });
    describe(`with 'aaaa' as input data`, () => {
      it('should return 1', () => {
        const raw_input = 'aaaa\n';
        day = new RockPaperScissors(raw_input);
        expect(day.solvePartOne()).toEqual(1);
      });
    });
    describe(`with 'zz' as input data`, () => {
      it('should return 26', () => {
        const raw_input = 'zz\n';
        day = new RockPaperScissors(raw_input);
        expect(day.solvePartOne()).toEqual(26);
      });
    });
    describe(`with 'ZZ' as input data`, () => {
      it('should return 52', () => {
        const raw_input = 'ZZ\n';
        day = new RockPaperScissors(raw_input);
        expect(day.solvePartOne()).toEqual(52);
      });
    });
    describe(`with 'AA' as input data`, () => {
      it('should return 27', () => {
        const raw_input = 'AA\n';
        day = new RockPaperScissors(raw_input);
        expect(day.solvePartOne()).toEqual(27);
      });
    });
  });
  describe('part two', () => {
    it('should be 70', () => {
      expect(day.solvePartTwo()).toEqual(70);
    });
  });
});
