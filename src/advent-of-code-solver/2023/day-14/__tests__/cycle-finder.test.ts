import { checkForCycles, CycleResult } from '../cycle-finder.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('checkForCycles', () => {
  type TestCase = { input: [number[], number?]; output: CycleResult | undefined };
  const cases: TestCase[] = [
    {
      input: [[8, 8], 2],
      output: { loads: [8], index: 0 },
    },
    {
      input: [[8, 1, 2, 3, 1, 2, 3], 2],
      output: { loads: [1, 2, 3], index: 1 },
    },
    {
      input: [[8, 1, 2, 3, 1, 2, 3], 3],
      output: undefined,
    },
    {
      input: [[1, 2, 3, 3, 2, 3, 1, 2, 3]],
      output: undefined,
    },
  ];
  cases.forEach(({ input, output }) => {
    it(`should equal to ${output?.toString()}`, () => {
      expect(checkForCycles(...input)).toEqual(output);
    });
  });
});
