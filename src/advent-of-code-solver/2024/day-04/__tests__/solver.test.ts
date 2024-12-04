import Solver from '../../../../advent-of-code-solver/solver.js';
import CeresSearchSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  'MMMSXXMASM\n' +
  'MSAMXMSMSA\n' +
  'AMXSXMAAMM\n' +
  'MSAMASMSMX\n' +
  'XMASAMXAMM\n' +
  'XXAMMXXAMA\n' +
  'SMSMSASXSS\n' +
  'SAXAMASAAA\n' +
  'MAMMMXMMMM\n' +
  'MXMXAXMASX\n';
const input2 = '..X...\n' + '.SAMX.\n' + '.A..A.\n' + 'XMAS.S\n' + '.X....\n';

describe('day 4', () => {
  let solver: Solver<string[][]>;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new CeresSearchSolver(input);
      expect(solver.input).toEqual([
        ['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'],
        ['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'],
        ['A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M'],
        ['M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X'],
        ['X', 'M', 'A', 'S', 'A', 'M', 'X', 'A', 'M', 'M'],
        ['X', 'X', 'A', 'M', 'M', 'X', 'X', 'A', 'M', 'A'],
        ['S', 'M', 'S', 'M', 'S', 'A', 'S', 'X', 'S', 'S'],
        ['S', 'A', 'X', 'A', 'M', 'A', 'S', 'A', 'A', 'A'],
        ['M', 'A', 'M', 'M', 'M', 'X', 'M', 'M', 'M', 'M'],
        ['M', 'X', 'M', 'X', 'A', 'X', 'M', 'A', 'S', 'X'],
      ]);
    });
  });
  describe('part one', () => {
    describe('input 1', () => {
      it(`should equal to 18`, () => {
        solver = new CeresSearchSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(18);
      });
    });
    describe('input 2', () => {
      it(`should equal to 4`, () => {
        solver = new CeresSearchSolver(input2);
        const result = solver.solvePartOne();
        expect(result).toEqual(4);
      });
    });
  });
  describe('part two', () => {
    it(`should equal to 4711`, () => {
      solver = new CeresSearchSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(4711);
    });
  });
});
