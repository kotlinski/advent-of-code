import BridgeRepairSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '190: 10 19\n' +
  '3267: 81 40 27\n' +
  '83: 17 5\n' +
  '156: 15 6\n' +
  '7290: 6 8 6 15\n' +
  '161011: 16 10 13\n' +
  '192: 17 8 14\n' +
  '21037: 9 7 18 13\n' +
  '292: 11 6 16 20\n';

describe('day 7', () => {
  let solver: BridgeRepairSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new BridgeRepairSolver(input);
      expect(solver.input).toEqual([
        {
          numbers: [10, 19],
          result: 190,
        },
        {
          numbers: [81, 40, 27],
          result: 3267,
        },
        {
          numbers: [17, 5],
          result: 83,
        },
        {
          numbers: [15, 6],
          result: 156,
        },
        {
          numbers: [6, 8, 6, 15],
          result: 7290,
        },
        {
          numbers: [16, 10, 13],
          result: 161011,
        },
        {
          numbers: [17, 8, 14],
          result: 192,
        },
        {
          numbers: [9, 7, 18, 13],
          result: 21037,
        },
        {
          numbers: [11, 6, 16, 20],
          result: 292,
        },
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 3749`, () => {
      solver = new BridgeRepairSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(3749);
    });
  });
  describe('part two', () => {
    it(`should equal to 11387`, () => {
      solver = new BridgeRepairSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(11387);
    });
  });
});
