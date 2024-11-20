import Solver from '../../../../advent-of-code-solver/solver.js';
import CosmicExpansionSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 11', () => {
  let solver: Solver<string>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          '...#......\n' +
          '.......#..\n' +
          '#.........\n' +
          '..........\n' +
          '......#...\n' +
          '.#........\n' +
          '.........#\n' +
          '..........\n' +
          '.......#..\n' +
          '#...#.....\n',
        output: 374,
      },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new CosmicExpansionSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          '...#......\n' +
          '.......#..\n' +
          '#.........\n' +
          '..........\n' +
          '......#...\n' +
          '.#........\n' +
          '.........#\n' +
          '..........\n' +
          '.......#..\n' +
          '#...#.....',
        output: 82000210,
      },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new CosmicExpansionSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
