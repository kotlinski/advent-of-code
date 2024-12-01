import { LavaHasher } from '../lava-hasher.js';
import { before, describe, it } from 'node:test';
import { expect } from 'expect';

describe('LavaHasher', () => {
  let hasher: LavaHasher;
  before(() => {
    hasher = new LavaHasher();
  });
  describe('hash', () => {
    describe('the input value HASH', () => {
      it('should return 52', () => {
        expect(hasher.hash('HASH')).toEqual(52);
      });
    });
    describe('input sample data', () => {
      type TestCase = { input: string; output: number };
      const cases: TestCase[] = [
        { input: 'rn=1', output: 30 },
        { input: 'cm-', output: 253 },
        { input: 'qp=3', output: 97 },
        { input: 'cm=2', output: 47 },
        { input: 'qp-', output: 14 },
        { input: 'pc=4', output: 180 },
        { input: 'ot=9', output: 9 },
        { input: 'ab=5', output: 197 },
        { input: 'pc-', output: 48 },
        { input: 'pc=6', output: 214 },
        { input: 'ot=7', output: 231 },
      ];
      cases.forEach(({ input, output }) => {
        it(`should equal to ${output}`, () => {
          expect(hasher.hash(input)).toEqual(output);
        });
      });
    });
  });
});
