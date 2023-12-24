import { Direction } from '../../../common/matrix/grid/interface';
import { RockType } from '../mirror-disc';
import { sortRocks } from '../rock-sorter';

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
  describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
    it(`should equal to ${output?.toString()}`, () => {
      expect(sortRocks(...input)).toEqual(output);
    });
  });
});
