import Solver from '../../../../advent-of-code-solver/solver.js';
import PointOfIncidenceSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 13', () => {
  let solver: Solver<string[][][]>;
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input: '#...##..#\n' + '#....#..#\n' + '..##..###\n' + '#####.##.\n' + '#####.##.\n' + '..##..###\n' + '#....#..#\n',
        output: 400,
      },
      {
        input: '#.##..##.\n' + '..#.##.#.\n' + '##......#\n' + '##......#\n' + '..#.##.#.\n' + '..##..##.\n' + '#.#.##.#.\n',
        output: 5,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##......#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '#...##..#\n' +
          '#....#..#\n' +
          '..##..###\n' +
          '#####.##.\n' +
          '#####.##.\n' +
          '..##..###\n' +
          '#....#..#\n',
        output: 405,
      },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new PointOfIncidenceSolver(input);
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
          '#...##..#\n' +
          '#....#..#\n' +
          '..##..###\n' +
          '#####.##.\n' +
          '#####.##.\n' +
          '..##..###\n' +
          '#....#..#\n' +
          '\n' +
          '\n' +
          '\n',
        output: 100,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##......#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '\n' +
          '\n',
        output: 300,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##......#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '#...##..#\n' +
          '#....#..#\n' +
          '..##..###\n' +
          '#####.##.\n' +
          '#####.##.\n' +
          '..##..###\n' +
          '#....#..#\n',
        output: 400,
      },
      {
        input:
          '#.##..##.\n' +
          '..#.##.#.\n' +
          '##..#...#\n' +
          '##......#\n' +
          '..#.##.#.\n' +
          '..##..##.\n' +
          '#.#.##.#.\n' +
          '\n' +
          '\n' +
          '\n',
        output: 5,
      },
    ];
    cases.forEach(({ input, output }) => {
      it(`should equal to ${output}`, () => {
        solver = new PointOfIncidenceSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
