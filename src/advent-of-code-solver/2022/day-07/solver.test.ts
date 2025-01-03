import Dir from './filesystem/dir.js';
import NoSpaceLeftOnDevice from './solver.js';
import Solver from '../../solver.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('2022 day 7', () => {
  let day: Solver<Dir>;
  beforeEach(() => {
    const raw_input =
      '$ cd /\n' +
      '$ ls\n' +
      'dir a\n' +
      '14848514 b.txt\n' +
      '8504156 c.dat\n' +
      'dir d\n' +
      '$ cd a\n' +
      '$ ls\n' +
      'dir e\n' +
      '29116 f\n' +
      '2557 g\n' +
      '62596 h.lst\n' +
      '$ cd e\n' +
      '$ ls\n' +
      '584 i\n' +
      '$ cd ..\n' +
      '$ cd ..\n' +
      '$ cd d\n' +
      '$ ls\n' +
      '4060174 j\n' +
      '8033020 d.log\n' +
      '5626152 d.ext\n' +
      '7214296 k';
    day = new NoSpaceLeftOnDevice(raw_input);
  });
  describe('part one', () => {
    it('should be 95437', () => {
      expect(day.solvePartOne()).toEqual(95437);
    });
  });
  describe('part two', () => {
    it('should be 24933642', () => {
      expect(day.solvePartTwo()).toEqual(24933642);
    });
  });
});
