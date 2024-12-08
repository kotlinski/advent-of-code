import ResonantCollinearitySolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '............\n' +
  '........0...\n' +
  '.....0......\n' +
  '.......0....\n' +
  '....0.......\n' +
  '......A.....\n' +
  '............\n' +
  '............\n' +
  '........A...\n' +
  '.........A..\n' +
  '............\n' +
  '............\n';

describe('day 8', () => {
  let solver: ResonantCollinearitySolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new ResonantCollinearitySolver(input);
      expect(solver.input).toEqual({
        width: 12,
        height: 12,
        antennas: new Map([
          [
            '0',
            [
              { x: 8, y: 1 },
              { x: 5, y: 2 },
              { x: 7, y: 3 },
              { x: 4, y: 4 },
            ],
          ],
          [
            'A',
            [
              { x: 6, y: 5 },
              { x: 8, y: 8 },
              { x: 9, y: 9 },
            ],
          ],
        ]),
      });
    });
  });
  describe('part one', () => {
    describe('with test input 1', () => {
      it(`should equal to 14`, () => {
        solver = new ResonantCollinearitySolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(14);
      });
    });
    describe('with test input 2', () => {
      it(`should equal to 2`, () => {
        const test_input_2 =
          '..........\n' +
          '..........\n' +
          '..........\n' +
          '....a.....\n' +
          '..........\n' +
          '.....a....\n' +
          '..........\n' +
          '..........\n' +
          '..........\n' +
          '..........\n';
        solver = new ResonantCollinearitySolver(test_input_2);
        const result = solver.solvePartOne();
        expect(result).toEqual(2);
      });
    });
    describe('with test input 3', () => {
      it(`should equal to 4`, () => {
        const test_input =
          '..........\n' +
          '..........\n' +
          '..........\n' +
          '....a.....\n' +
          '........a.\n' +
          '.....a....\n' +
          '..........\n' +
          '..........\n' +
          '..........\n' +
          '..........\n';
        solver = new ResonantCollinearitySolver(test_input);
        const result = solver.solvePartOne();
        expect(result).toEqual(4);
      });
    });
    describe('with test input 4, but with numbers', () => {
      it(`should equal to 4`, () => {
        const test_input =
          '..........\n' +
          '..........\n' +
          '..........\n' +
          '....9.....\n' +
          '........9.\n' +
          '.....9....\n' +
          '..........\n' +
          '......A...\n' +
          '..........\n' +
          '..........\n';
        solver = new ResonantCollinearitySolver(test_input);
        const result = solver.solvePartOne();
        expect(result).toEqual(4);
      });
    });
    describe('with test Y input', () => {
      it(`should equal to 4`, () => {
        const test_input =
          '.........................Y........................\n' +
          '...............................Y..................\n' +
          '..................................................\n' +
          '........................Y.........................\n' +
          '....................................Y.............\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n' +
          '..................................................\n';
        solver = new ResonantCollinearitySolver(test_input);
        const result = solver.solvePartOne();
        expect(result).toEqual(7);
      });
    });
  });
  describe('part two', () => {
    describe('the example input', () => {
      it(`should equal to 34`, () => {
        solver = new ResonantCollinearitySolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(34);
      });
    });
    describe('the T example input', () => {
      it(`should equal to 34`, () => {
        solver = new ResonantCollinearitySolver(
          'T.........\n' +
            '...T......\n' +
            '.T........\n' +
            '..........\n' +
            '..........\n' +
            '..........\n' +
            '..........\n' +
            '..........\n' +
            '..........\n' +
            '..........\n',
        );
        const result = solver.solvePartTwo();
        expect(result).toEqual(9);
      });
    });
  });
});
