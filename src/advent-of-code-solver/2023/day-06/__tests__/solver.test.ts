import Solver from '../../../../advent-of-code-solver/solver.js';
import WaitForItSolver, { BoatTournament } from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 6', () => {
  let solver: Solver<BoatTournament>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [{ input: 'Time:      7  15   30\n' + 'Distance:  9  40  200\n', output: 288 }];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new WaitForItSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [{ input: 'Time:      7  15   30\n' + 'Distance:  9  40  200\n', output: 71503 }];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new WaitForItSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
