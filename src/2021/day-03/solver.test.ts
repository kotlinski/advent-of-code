import Solver from '../../solver';
import BinaryDiagnosticSolver from './solver';

describe('day 3', () => {
  let day: Solver<number[]>;
  beforeEach(() => {
    const raw_input =
      '00100\n' +
      '11110\n' +
      '10110\n' +
      '10111\n' +
      '10101\n' +
      '01111\n' +
      '00111\n' +
      '11100\n' +
      '10000\n' +
      '11001\n' +
      '00010\n' +
      '01010';
    day = new BinaryDiagnosticSolver(raw_input);
  });
  describe('part one', () => {
    it('should have a power consumption of 198', () => {
      expect(day.solvePartOne()).toEqual(198);
    });
  });
});
