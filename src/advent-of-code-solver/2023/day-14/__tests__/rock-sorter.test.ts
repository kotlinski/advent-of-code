import { Direction } from '../../../common/matrix/grid/direction.js';
import { RockType } from '../mirror-disc.js';
import { sortRocks } from '../rock-sorter.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('sortRocks', () => {
  type TestCase = { input: [Direction, RockType[]]; output: RockType[] | undefined };
  const cases: TestCase[] = [
    {
      input: ['up', ['.', '.', 'O', '.', '#', '.', 'O', 'O', '.', '#']],
      output: ['O', '.', '.', '.', '#', 'O', 'O', '.', '.', '#'],
    },
    {
      input: ['left', ['.', '.', 'O', '.', '#', '.', 'O', 'O', '.', '#']],
      output: ['O', '.', '.', '.', '#', 'O', 'O', '.', '.', '#'],
    },
    {
      input: ['down', ['.', '.', 'O', '.', '#', '.', 'O', 'O', '.', '#']],
      output: ['.', '.', '.', 'O', '#', '.', '.', 'O', 'O', '#'],
    },
    {
      input: ['right', ['.', '.', 'O', '.', '#', '.', 'O', 'O', '.', '#']],
      output: ['.', '.', '.', 'O', '#', '.', '.', 'O', 'O', '#'],
    },
  ];
  cases.forEach(({ input, output }) => {
    it(`should equal to ${output?.toString()}`, () => {
      expect(sortRocks(...input)).toEqual(output);
    });
  });
});
