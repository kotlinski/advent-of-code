import Solver from '../../solver';
import PassagePathingSolver from './solver';
import { Graph } from './graph';

describe('day 12', () => {
  const tiny_input = 'start-A\n' + 'start-b\n' + 'A-c\n' + 'A-b\n' + 'b-d\n' + 'A-end\n' + 'b-end\n';
  const small_input =
    'dc-end\n' +
    'HN-start\n' +
    'start-kj\n' +
    'dc-start\n' +
    'dc-HN\n' +
    'LN-dc\n' +
    'HN-end\n' +
    'kj-sa\n' +
    'kj-HN\n' +
    'kj-dc\n';
  const large_input =
    'fs-end\n' +
    'he-DX\n' +
    'fs-he\n' +
    'start-DX\n' +
    'pj-DX\n' +
    'end-zg\n' +
    'zg-sl\n' +
    'zg-pj\n' +
    'pj-he\n' +
    'RW-he\n' +
    'fs-DX\n' +
    'pj-RW\n' +
    'zg-RW\n' +
    'start-pj\n' +
    'he-WI\n' +
    'zg-he\n' +
    'pj-fs\n' +
    'start-RW\n';
  let day: Solver<Graph>;
  describe('part one', () => {
    describe('with tiny data', () => {
      it('should find 10 paths', () => {
        day = new PassagePathingSolver(tiny_input);
        expect(day.solvePartOne()).toEqual(10);
      });
    });
    describe('with small data', () => {
      it('should find 19 paths', () => {
        day = new PassagePathingSolver(small_input);
        expect(day.solvePartOne()).toEqual(19);
      });
    });
    describe('with large data', () => {
      it('should find 226 paths', () => {
        day = new PassagePathingSolver(large_input);
        expect(day.solvePartOne()).toEqual(226);
      });
    });
  });
  describe('part two', () => {
    describe('with tiny data', () => {
      it('should find 36 paths', () => {
        day = new PassagePathingSolver(tiny_input);
        expect(day.solvePartTwo()).toEqual(36);
      });
    });
    describe('with small data', () => {
      it('should find 103 paths', () => {
        day = new PassagePathingSolver(small_input);
        expect(day.solvePartTwo()).toEqual(103);
      });
    });
    describe('with large data', () => {
      it('should find 3509 paths', () => {
        day = new PassagePathingSolver(large_input);
        expect(day.solvePartTwo()).toEqual(3509);
      });
    });
  });
});
