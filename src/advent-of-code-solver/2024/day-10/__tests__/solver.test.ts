import HoofItSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '89010123\n' + '78121874\n' + '87430965\n' + '96549874\n' + '45678903\n' + '32019012\n' + '01329801\n' + '10456732\n';
describe('day 10', () => {
  let solver: HoofItSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new HoofItSolver(input);
      expect(solver.input).toEqual([
        [8, 9, 0, 1, 0, 1, 2, 3],
        [7, 8, 1, 2, 1, 8, 7, 4],
        [8, 7, 4, 3, 0, 9, 6, 5],
        [9, 6, 5, 4, 9, 8, 7, 4],
        [4, 5, 6, 7, 8, 9, 0, 3],
        [3, 2, 0, 1, 9, 0, 1, 2],
        [0, 1, 3, 2, 9, 8, 0, 1],
        [1, 0, 4, 5, 6, 7, 3, 2],
      ]);
    });
  });
  describe('part one', () => {
    describe('test input 1', () => {
      it(`should equal to 36`, () => {
        solver = new HoofItSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(36);
      });
    });
    describe('test input 2', () => {
      it(`should equal to 2`, () => {
        solver = new HoofItSolver(
          '...0...\n' + '...1...\n' + '...2...\n' + '6543456\n' + '7.....7\n' + '8.....8\n' + '9.....9\n',
        );
        const result = solver.solvePartOne();
        expect(result).toEqual(2);
      });
    });
    describe('test input 3', () => {
      it(`should equal to 3`, () => {
        solver = new HoofItSolver(
          '10..9..\n' + '2...8..\n' + '3...7..\n' + '4567654\n' + '...8..3\n' + '...9..2\n' + '.....01\n',
        );
        const result = solver.solvePartOne();
        expect(result).toEqual(3);
      });
    });
  });
  describe('part two', () => {
    it(`should equal to 4711`, () => {
      solver = new HoofItSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(4711);
    });
  });
});
