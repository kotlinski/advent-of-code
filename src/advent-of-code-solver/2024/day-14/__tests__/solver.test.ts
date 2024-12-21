import RestroomRedoubtSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  'p=0,4 v=3,-3\n' +
  'p=6,3 v=-1,-3\n' +
  'p=10,3 v=-1,2\n' +
  'p=2,0 v=2,-1\n' +
  'p=0,0 v=1,3\n' +
  'p=3,0 v=-2,-2\n' +
  'p=7,6 v=-1,-3\n' +
  'p=3,0 v=-1,-2\n' +
  'p=9,3 v=2,3\n' +
  'p=7,3 v=-1,2\n' +
  'p=2,4 v=2,-3\n' +
  'p=9,5 v=-3,-3\n';

describe('day 14', () => {
  let solver: RestroomRedoubtSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new RestroomRedoubtSolver(input);
      expect(solver.input).toEqual([
        { position: { x: 0, y: 4 }, velocity: { x: 3, y: -3 } },
        { position: { x: 6, y: 3 }, velocity: { x: -1, y: -3 } },
        { position: { x: 10, y: 3 }, velocity: { x: -1, y: 2 } },
        { position: { x: 2, y: 0 }, velocity: { x: 2, y: -1 } },
        { position: { x: 0, y: 0 }, velocity: { x: 1, y: 3 } },
        { position: { x: 3, y: 0 }, velocity: { x: -2, y: -2 } },
        { position: { x: 7, y: 6 }, velocity: { x: -1, y: -3 } },
        { position: { x: 3, y: 0 }, velocity: { x: -1, y: -2 } },
        { position: { x: 9, y: 3 }, velocity: { x: 2, y: 3 } },
        { position: { x: 7, y: 3 }, velocity: { x: -1, y: 2 } },
        { position: { x: 2, y: 4 }, velocity: { x: 2, y: -3 } },
        { position: { x: 9, y: 5 }, velocity: { x: -3, y: -3 } },
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 12`, () => {
      solver = new RestroomRedoubtSolver(input);
      const result = solver.solvePartOne({ width: 11, height: 7 });
      expect(result).toEqual(12);
    });
  });
});
