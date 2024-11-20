import Solver from '../../../../advent-of-code-solver/solver.js';
import GearRatiosSolver, { EngineSchematic } from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 3', () => {
  let solver: Solver<EngineSchematic>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input: '617*......\n',
        output: 617,
      },
      {
        input: '467..114..\n' + '...*......\n',
        output: 467,
      },
      {
        input:
          '467..114..\n' +
          '...*......\n' +
          '..35..633.\n' +
          '......#...\n' +
          '617*......\n' +
          '.....+.58.\n' +
          '..592.....\n' +
          '......755.\n' +
          '...$.*....\n' +
          '.664.598..\n',
        output: 4361,
      },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new GearRatiosSolver(input);
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
          '467..114..\n' +
          '...*......\n' +
          '..35..633.\n' +
          '......#...\n' +
          '617*......\n' +
          '.....+.58.\n' +
          '..592.....\n' +
          '......755.\n' +
          '...$.*....\n' +
          '.664.598..\n',
        output: 467835,
      },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new GearRatiosSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
