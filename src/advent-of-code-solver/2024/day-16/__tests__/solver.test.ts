import ReindeerMazeSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input_1 =
  '###############\n' +
  '#.......#....E#\n' +
  '#.#.###.#.###.#\n' +
  '#.....#.#...#.#\n' +
  '#.###.#####.#.#\n' +
  '#.#.#.......#.#\n' +
  '#.#.#####.###.#\n' +
  '#...........#.#\n' +
  '###.#.#####.#.#\n' +
  '#...#.....#.#.#\n' +
  '#.#.#.###.#.#.#\n' +
  '#.....#...#.#.#\n' +
  '#.###.#.#.#.#.#\n' +
  '#S..#.....#...#\n' +
  '###############\n\n';

const input_2 =
  '#################\n' +
  '#...#...#...#..E#\n' +
  '#.#.#.#.#.#.#.#.#\n' +
  '#.#.#.#...#...#.#\n' +
  '#.#.#.#.###.#.#.#\n' +
  '#...#.#.#.....#.#\n' +
  '#.#.#.#.#.#####.#\n' +
  '#.#...#.#.#.....#\n' +
  '#.#.#####.#.###.#\n' +
  '#.#.#.......#...#\n' +
  '#.#.###.#####.###\n' +
  '#.#.#...#.....#.#\n' +
  '#.#.#.#####.###.#\n' +
  '#.#.#.........#.#\n' +
  '#.#.#.#########.#\n' +
  '#S#.............#\n' +
  '#################\n\n';

describe('day 16', () => {
  let solver: ReindeerMazeSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new ReindeerMazeSolver(input_1);
      expect(solver.input.start).toEqual({ 'x': 1, 'y': 13 });
      expect(solver.input.end).toEqual({ 'x': 13, 'y': 1 });
      expect(solver.input.maze.toString()).toEqual(
        '###############\n' +
          '#.......#.....#\n' +
          '#.#.###.#.###.#\n' +
          '#.....#.#...#.#\n' +
          '#.###.#####.#.#\n' +
          '#.#.#.......#.#\n' +
          '#.#.#####.###.#\n' +
          '#...........#.#\n' +
          '###.#.#####.#.#\n' +
          '#...#.....#.#.#\n' +
          '#.#.#.###.#.#.#\n' +
          '#.....#...#.#.#\n' +
          '#.###.#.#.#.#.#\n' +
          '#...#.....#...#\n' +
          '###############',
      );
    });
  });
  describe('part one', () => {
    describe('example 1', () => {
      it(`should equal to 7036`, () => {
        solver = new ReindeerMazeSolver(input_1);
        const result = solver.solvePartOne();
        expect(result).toEqual(7036);
      });
    });
    describe('example 2', () => {
      it(`should equal to 11048`, () => {
        solver = new ReindeerMazeSolver(input_2);
        const result = solver.solvePartOne();
        expect(result).toEqual(11048);
      });
    });
  });
  describe('part two', () => {
    describe('example 1', () => {
      it(`should equal to 45`, () => {
        solver = new ReindeerMazeSolver(input_1);
        const result = solver.solvePartTwo();
        expect(result).toEqual(45);
      });
    });
    describe('example 2', () => {
      it(`should equal to 64`, () => {
        solver = new ReindeerMazeSolver(input_2);
        const result = solver.solvePartTwo();
        expect(result).toEqual(64);
      });
    });
  });
});
