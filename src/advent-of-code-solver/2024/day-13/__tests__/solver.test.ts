import ClawContraptionSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const claw_machine_1 = 'Button A: X+94, Y+34\n' + 'Button B: X+22, Y+67\n' + 'Prize: X=8400, Y=5400\n' + '\n';
const claw_machine_2 = 'Button A: X+26, Y+66\n' + 'Button B: X+67, Y+21\n' + 'Prize: X=12748, Y=12176\n' + '\n';
const claw_machine_3 = 'Button A: X+17, Y+86\n' + 'Button B: X+84, Y+37\n' + 'Prize: X=7870, Y=6450\n' + '\n';
const claw_machine_4 = 'Button A: X+69, Y+23\n' + 'Button B: X+27, Y+71\n' + 'Prize: X=18641, Y=10279\n';
const input = claw_machine_1 + claw_machine_2 + claw_machine_3 + claw_machine_4;
describe('day 13', () => {
  let solver: ClawContraptionSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new ClawContraptionSolver(input);
      expect(solver.input).toEqual([
        { a: { x: 94, y: 34 }, b: { x: 22, y: 67 }, prize: { x: 8400, y: 5400 } },
        { a: { x: 26, y: 66 }, b: { x: 67, y: 21 }, prize: { x: 12748, y: 12176 } },
        { a: { x: 17, y: 86 }, b: { x: 84, y: 37 }, prize: { x: 7870, y: 6450 } },
        { a: { x: 69, y: 23 }, b: { x: 27, y: 71 }, prize: { x: 18641, y: 10279 } },
      ]);
    });
  });
  describe('part one', () => {
    describe('claw machine 1', () => {
      it(`should equal to 280`, () => {
        solver = new ClawContraptionSolver(claw_machine_1);
        const result = solver.solvePartOne();
        expect(result).toEqual(280);
      });
    });
    describe('arcade', () => {
      it(`should equal to 480`, () => {
        solver = new ClawContraptionSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(480);
      });
    });
  });
  describe('part two', () => {
    describe('input', () => {
      it(`should equal to corner case`, () => {
        solver = new ClawContraptionSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(875318608908);
      });
    });
    describe('problematic machine 1', () => {
      it(`should equal to corner case`, () => {
        solver = new ClawContraptionSolver('Button A: X+41, Y+22\n' + 'Button B: X+18, Y+35\n' + 'Prize: X=17705, Y=13969\n\n');
        const result = solver.solvePartTwo();
        expect(result).toEqual(673724736562);
      });
    });
    describe('problematic machine 2', () => {
      it(`should equal to corner case`, () => {
        solver = new ClawContraptionSolver('Button A: X+23, Y+77\n' + 'Button B: X+44, Y+12\n' + 'Prize: X=3902, Y=8834\n');
        const result = solver.solvePartTwo();
        expect(result).toEqual(482005141749);
      });
    });
  });
});
