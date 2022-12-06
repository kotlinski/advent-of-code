import Solver from '../../solver';
import SupplyStacks, { SupplyInstructions } from './solver';

describe('2022 day 5', () => {
  let day: Solver<SupplyInstructions>;
  beforeEach(() => {
    const raw_input =
      '    [D]    \n' +
      '[N] [C]    \n' +
      '[Z] [M] [P]\n' +
      ' 1   2   3 \n' +
      '\n' +
      'move 1 from 2 to 1\n' +
      'move 3 from 1 to 3\n' +
      'move 2 from 2 to 1\n' +
      'move 1 from 1 to 2\n';
    day = new SupplyStacks(raw_input);
  });
  describe('part one', () => {
    it('should be CMZ', () => {
      expect(day.solvePartOne()).toEqual('CMZ');
    });
  });
  describe('part two', () => {
    it('should be MCD', () => {
      expect(day.solvePartTwo()).toEqual('MCD');
    });
  });
});
