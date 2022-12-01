import Solver from '../../solver';
import DumboOctopusSolver from './solver';

describe('day 11', () => {
  let day: Solver<number[][]>;
  const tiny_input = '11111\n' + '19991\n' + '19191\n' + '19991\n' + '11111\n';

  const large_input =
      '5483143223\n' +
      '2745854711\n' +
      '5264556173\n' +
      '6141336146\n' +
      '6357385478\n' +
      '4167524645\n' +
      '2176841721\n' +
      '6882881134\n' +
      '4846848554\n' +
      '5283751526\n';

  describe('part one', () => {
    describe('with small input data', () => {
      beforeEach(() => {
        day = new DumboOctopusSolver(tiny_input);
      });
      describe('after 1 iteration', () => {
        it('should be 9 flashes', () => {
          expect(day.solvePartOne({ iterations: 1 })).toEqual(9);
        });
      });
      describe('after 2 iterations flashes', () => {
        it('should still be 9', () => {
          expect(day.solvePartOne({ iterations: 2 })).toEqual(9);
        });
      });
    });
    describe('with large input data', () => {
      beforeEach(() => {
        day = new DumboOctopusSolver(large_input);
      });
      describe('after 2 iteration', () => {
        it('should be 34 flashes', () => {
          expect(day.solvePartOne({ iterations: 2 })).toEqual(35);
        });
      });
      describe('after 3 iteration', () => {
        it('should be 80 flashes', () => {
          expect(day.solvePartOne({ iterations: 3 })).toEqual(80);
        });
      });
      describe('after 3 iteration', () => {
        it('should be 96 flashes', () => {
          expect(day.solvePartOne({ iterations: 4 })).toEqual(96);
        });
      });
      describe('after 10 iteration', () => {
        it('should be 204 flashes', () => {
          expect(day.solvePartOne({ iterations: 10 })).toEqual(204);
        });
      });
      describe('after 100 iterations', () => {
        it('should still be 1656 flashes', () => {
          expect(day.solvePartOne({ iterations: 100 })).toEqual(1656);
        });
      });
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(day.solvePartTwo()).toEqual(4711);
    });
  });
});
