import Solver from '../../../../advent-of-code-solver/solver.js';
import BathroomSecuritySolver, { Instructions } from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 2', () => {
  let solver: Solver<Instructions[]>;
  type TestCase = { input: string; output: string };
  describe('part one', () => {
    const cases: TestCase[] = [{ input: 'ULL\n' + 'RRDDD\n' + 'LURDL\n' + 'UUUUD\n', output: '1985' }];
    cases.forEach(({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new BathroomSecuritySolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    const cases: TestCase[] = [{ input: 'ULL\n' + 'RRDDD\n' + 'LURDL\n' + 'UUUUD\n', output: '5DB3' }];
    cases.forEach(({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new BathroomSecuritySolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
