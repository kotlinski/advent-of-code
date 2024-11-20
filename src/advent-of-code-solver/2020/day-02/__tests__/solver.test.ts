import Solver from '../../../../advent-of-code-solver/solver.js';
import PasswordPhilosophySolver, { PasswordValidator } from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 2', () => {
  let solver: Solver<PasswordValidator[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '1-3 a: abcde\n', output: 1 },
      { input: '1-3 b: cdefg\n', output: 0 },
      { input: '2-9 c: ccccccccc\n', output: 1 },
      { input: '1-3 a: abcde\n' + '1-3 b: cdefg\n' + '2-9 c: ccccccccc\n', output: 2 },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new PasswordPhilosophySolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '1-3 a: abcde\n', output: 1 },
      { input: '1-3 b: cdefg\n', output: 0 },
      { input: '2-9 c: ccccccccc\n', output: 0 },
      { input: '1-3 a: abcde\n' + '1-3 b: cdefg\n' + '2-9 c: ccccccccc\n', output: 1 },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new PasswordPhilosophySolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
