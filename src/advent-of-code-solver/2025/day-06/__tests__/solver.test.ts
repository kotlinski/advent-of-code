import TrashCompactorSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input = '123 328  51 64 \n' + ' 45 64  387 23 \n' + '  6 98  215 314\n' + '*   +   *   +  \n\n';

describe('day 6', () => {
  let solver: TrashCompactorSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new TrashCompactorSolver(input);
      expect(solver.input).toEqual([
        {
          numbers: [
            ['1', '2', '3'],
            [' ', '4', '5'],
            [' ', ' ', '6'],
          ],
          operator: '*',
        },
        {
          numbers: [
            ['3', '2', '8'],
            ['6', '4', ' '],
            ['9', '8', ' '],
          ],
          operator: '+',
        },
        {
          numbers: [
            [' ', '5', '1'],
            ['3', '8', '7'],
            ['2', '1', '5'],
          ],
          operator: '*',
        },
        {
          numbers: [
            ['6', '4', ' '],
            ['2', '3', ' '],
            ['3', '1', '4'],
          ],
          operator: '+',
        },
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 4277556`, () => {
      solver = new TrashCompactorSolver(input);
      const result = solver.solvePartOne();
      expect(result).toEqual(4277556);
    });
  });
  describe('part two', () => {
    it(`should equal to 3263827`, () => {
      solver = new TrashCompactorSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(3263827);
    });
  });
});
