import Solver from '../../../../advent-of-code-solver/solver.js';
import NotQuiteLispSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('2015 day 1', () => {
  let solver: Solver<('(' | ')')[]>;

  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: '(())\n', output: 0 },
      { input: '()()\n', output: 0 },
      { input: '(((\n', output: 3 },
      { input: '(()(()(\n', output: 3 },
      { input: '))(((((\n', output: 3 },
      { input: '())\n', output: -1 },
      { input: '))(\n', output: -1 },
      { input: ')))\n', output: -3 },
      { input: ')())())\n', output: -3 },
    ];
    cases.forEach(({ input, output }) => {
      describe(`with input ${input}`, () => {
        it(`should equal to ${output}`, () => {
          solver = new NotQuiteLispSolver(input);
          const result = solver.solvePartOne();
          expect(result).toEqual(output);
        });
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: ')\n', output: 1 },
      { input: '()())\n', output: 5 },
    ];
    cases.forEach(({ input, output }) => {
      describe(`with input ${input}`, () => {
        it(`should equal to ${output}`, () => {
          solver = new NotQuiteLispSolver(input);
          const result = solver.solvePartTwo();
          expect(result).toEqual(output);
        });
      });
    });
  });
});
