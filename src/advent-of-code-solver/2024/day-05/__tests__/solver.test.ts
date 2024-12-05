import Solver from '../../../../advent-of-code-solver/solver.js';
import PrintQueueSolver, { PageOrderingUpdateRules } from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '47|53\n' +
  '97|13\n' +
  '97|61\n' +
  '97|47\n' +
  '75|29\n' +
  '61|13\n' +
  '75|53\n' +
  '29|13\n' +
  '97|29\n' +
  '53|29\n' +
  '61|53\n' +
  '97|53\n' +
  '61|29\n' +
  '47|13\n' +
  '75|47\n' +
  '97|75\n' +
  '47|61\n' +
  '75|61\n' +
  '47|29\n' +
  '75|13\n' +
  '53|13\n' +
  '\n' +
  '75,47,61,53,29\n' +
  '97,61,53,29,13\n' +
  '75,29,13\n' +
  '75,97,47,61,53\n' +
  '61,13,29\n' +
  '97,13,75,29,47\n';

describe('day 5', () => {
  let solver: Solver<PageOrderingUpdateRules>;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new PrintQueueSolver(input);
      expect(solver.input).toEqual({
        page_ordering_rules: new Map<number, number[]>([
          [47, [53, 13, 61, 29]],
          [97, [13, 61, 47, 29, 53, 75]],
          [75, [29, 53, 47, 61, 13]],
          [61, [13, 53, 29]],
          [29, [13]],
          [53, [29, 13]],
        ]),
        updates: [
          [75, 47, 61, 53, 29],
          [97, 61, 53, 29, 13],
          [75, 29, 13],
          [75, 97, 47, 61, 53],
          [61, 13, 29],
          [97, 13, 75, 29, 47],
        ],
      });
    });
  });
  describe('part one', () => {
    it(`should equal to 143`, () => {
      solver = new PrintQueueSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(143);
    });
  });
  describe('part two', () => {
    it(`should equal to 123`, () => {
      solver = new PrintQueueSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(123);
    });
  });
});
