import Solver from '../../../../advent-of-code-solver/solver.js';
import LensLibrarySolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 15', () => {
  let solver: Solver<string[]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: 'HASH\n', output: 52 },
      { input: 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7\n', output: 1320 },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new LensLibrarySolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [{ input: 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7\n', output: 145 }];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new LensLibrarySolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
