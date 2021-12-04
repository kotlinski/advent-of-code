import Day01 from '../day-01';
import Task from '../../task';

describe('day 1', () => {
  let day: Task;
  beforeEach(() => {
    const input = '199\n' +
        '200\n' +
        '208\n' +
        '210\n' +
        '200\n' +
        '207\n' +
        '240\n' +
        '269\n' +
        '260\n' +
        '263';
    day = new Day01(input);
  });
  describe('first', () => {
    it('should be 7', () => {
      expect(day.first(day.parse())).toEqual(7);
    });
  });
  describe('second', () => {
    it('should be 5', () => {
      expect(day.second(day.parse())).toEqual(5);
    });
  });
});
