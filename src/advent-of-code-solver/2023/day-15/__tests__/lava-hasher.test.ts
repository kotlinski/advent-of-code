import { LavaHasher } from '../lava-hasher';

describe('LavaHasher', () => {
  let hasher: LavaHasher;
  beforeAll(() => {
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
      describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
        it(`should equal to ${output}`, () => {
          expect(hasher.hash(input)).toEqual(output);
        });
      });
    });
  });
});
