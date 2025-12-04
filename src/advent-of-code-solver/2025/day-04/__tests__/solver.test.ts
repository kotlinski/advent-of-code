import PrintingDepartmentSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '..@@.@@@@.\n' +
  '@@@.@.@.@@\n' +
  '@@@@@.@.@@\n' +
  '@.@@@@..@.\n' +
  '@@.@@@@.@@\n' +
  '.@@@@@@@.@\n' +
  '.@.@.@.@@@\n' +
  '@.@@@.@@@@\n' +
  '.@@@@@@@@.\n' +
  '@.@.@@@.@.\n';

describe('day 4', () => {
  let solver: PrintingDepartmentSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new PrintingDepartmentSolver(input);
      expect(solver.input.size).toEqual(100);
      expect(solver.input.get('0;0')).toEqual({ x: 0, y: 0, neighbours: expect.any(Array), symbol: '.' });
    });
  });
  describe('part one', () => {
    it(`should equal to 13`, () => {
      solver = new PrintingDepartmentSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(13);
    });
  });
  describe('part two', () => {
    it(`should equal to 43`, () => {
      solver = new PrintingDepartmentSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(43);
    });
  });
});
