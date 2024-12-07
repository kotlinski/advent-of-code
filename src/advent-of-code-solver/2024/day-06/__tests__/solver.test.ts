import GuardGallivantSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '....#.....\n' +
  '.........#\n' +
  '..........\n' +
  '..#.......\n' +
  '.......#..\n' +
  '..........\n' +
  '.#..^.....\n' +
  '........#.\n' +
  '#.........\n' +
  '......#...\n';

describe('day 6', () => {
  let solver: GuardGallivantSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new GuardGallivantSolver(input);
      expect(solver.input).toEqual([
        ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '#', '.', '.', '^', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 41`, () => {
      solver = new GuardGallivantSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(41);
    });
  });
  describe('part two', () => {
    it(`should equal to 6`, () => {
      solver = new GuardGallivantSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(6);
    });
  });
});
