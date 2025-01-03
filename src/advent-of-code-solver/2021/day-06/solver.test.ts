import LanternfishSolver from './solver.js';
import Solver from '../../solver.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('day 6', () => {
  let lanternfish_solver: Solver<number[]>;
  beforeEach(() => {
    const raw_input = '3,4,3,1,2';
    lanternfish_solver = new LanternfishSolver(raw_input);
  });
  describe('part one', () => {
    describe('day-by-day', () => {
      describe('run a pick', () => {
        [[5, 10]].forEach(([day, population]) => {
          it(`should have a fish population of ${population} after ${day} days`, () => {
            expect(lanternfish_solver.solvePartOne({ iterations: day, input: [3, 4, 3, 1, 2] })).toEqual(population);
          });
        });
      });
      describe('a fish with 1 day to birth', () => {
        const table = [
          [1, 1],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2],
          [6, 2],
          [7, 2],
          [8, 2],
          [9, 3],
          [10, 3],
          [11, 4],
        ];
        table.forEach(([day, population]) => {
          it(`should have a fish population of ${population} after ${day} days`, () => {
            expect(lanternfish_solver.solvePartOne({ iterations: day, input: [1] })).toEqual(population);
          });
        });
      });
      describe('the original 5 fishes', () => {
        const table = [
          [1, 5],
          [2, 6],
          [3, 7],
          [4, 9],
          [5, 10],
          [6, 10],
          [7, 10],
          [8, 10],
          [9, 11],
          [10, 12],
          [11, 15],
          [12, 17],
          [13, 19],
          [14, 20],
          [15, 20],
          [16, 21],
          [17, 22],
          [18, 26],
        ];
        table.forEach(([day, population]) => {
          it(`should have a fish population of ${population} after ${day} days`, () => {
            expect(lanternfish_solver.solvePartOne({ iterations: day, input: [3, 4, 3, 1, 2] })).toEqual(population);
          });
        });
      });
    });
    it('should be 5934 lanternfish', () => {
      expect(lanternfish_solver.solvePartOne()).toEqual(5934);
    });
  });
  describe('part two', () => {
    it('should be 26984457539', () => {
      expect(lanternfish_solver.solvePartTwo()).toEqual(26984457539);
    });
  });
});
