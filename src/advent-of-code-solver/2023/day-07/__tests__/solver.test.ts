import Solver from '../../../../advent-of-code-solver/solver.js';
import CamelCardsSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 7', () => {
  let solver: Solver<string[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '32T3K 765\n' + 'T55J5 684\n' + 'KK677 28\n' + 'KTJJT 220\n' + 'QQQJA 483\n', output: 6440 },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new CamelCardsSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '32T3K 765\n' + 'T55J5 684\n' + 'KK677 28\n' + 'KTJJT 220\n' + 'QQQJA 483\n', output: 5905 },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new CamelCardsSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
