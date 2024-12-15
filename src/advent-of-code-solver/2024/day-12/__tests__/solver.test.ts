import GardenGroupsSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input_1 = 'AAAA\n' + 'BBCD\n' + 'BBCC\n' + 'EEEC\n';
const input_2 = 'OOOOO\n' + 'OXOXO\n' + 'OOOOO\n' + 'OXOXO\n' + 'OOOOO\n';
const input_3 =
  'RRRRIICCFF\n' +
  'RRRRIICCCF\n' +
  'VVRRRCCFFF\n' +
  'VVRCCCJFFF\n' +
  'VVVVCJJCFE\n' +
  'VVIVCCJJEE\n' +
  'VVIIICJJEE\n' +
  'MIIIIIJJEE\n' +
  'MIIISIJEEE\n' +
  'MMMISSJEEE\n';

describe('day 12', () => {
  let solver: GardenGroupsSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new GardenGroupsSolver(input_1);
      expect(solver.input.toString()).toEqual('AAAA\nBBCD\nBBCC\nEEEC');
    });
  });
  describe('part one', () => {
    describe('test input 1', () => {
      it(`should equal to 140`, () => {
        solver = new GardenGroupsSolver(input_1);
        const result = solver.solvePartOne();
        expect(result).toEqual(140);
      });
    });
    describe('test input 2', () => {
      it(`should equal to 772`, () => {
        solver = new GardenGroupsSolver(input_2);
        const result = solver.solvePartOne();
        expect(result).toEqual(772);
      });
    });
    describe('test input 3', () => {
      it(`should equal to 1930`, () => {
        solver = new GardenGroupsSolver(input_3);
        const result = solver.solvePartOne();
        expect(result).toEqual(1930);
      });
    });
  });
  describe('part two', () => {
    describe('test input 1', () => {
      it(`should equal to 80`, () => {
        solver = new GardenGroupsSolver(input_1);
        const result = solver.solvePartTwo();
        expect(result).toEqual(80);
      });
    });
    describe('test input 2', () => {
      it(`should equal to 436`, () => {
        solver = new GardenGroupsSolver(input_2);
        const result = solver.solvePartTwo();
        expect(result).toEqual(436);
      });
    });
    describe('an E shape', () => {
      it(`should equal to 236`, () => {
        solver = new GardenGroupsSolver('EEEEE\n' + 'EXXXX\n' + 'EEEEE\n' + 'EXXXX\n' + 'EEEEE\n');
        const result = solver.solvePartTwo();
        expect(result).toEqual(236);
      });
    });
    describe('an A/B shape', () => {
      it(`should equal to 368`, () => {
        solver = new GardenGroupsSolver('AAAAAA\n' + 'AAABBA\n' + 'AAABBA\n' + 'ABBAAA\n' + 'ABBAAA\n' + 'AAAAAA\n');
        const result = solver.solvePartTwo();
        expect(result).toEqual(368);
      });
    });
    describe('sample input 3', () => {
      it(`should equal to 1206`, () => {
        solver = new GardenGroupsSolver(input_3);
        const result = solver.solvePartTwo();
        expect(result).toEqual(1206);
      });
    });
  });
});
