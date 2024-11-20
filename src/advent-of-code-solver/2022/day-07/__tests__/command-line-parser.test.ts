import { parseLineType } from '../filesystem/command-line-parser.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('command-line-parser', () => {
  describe('parseLineType', () => {
    it('should parse cd change', () => {
      expect(parseLineType('$ cd \n')).toEqual('cd');
    });
    it('should parse ls change', () => {
      expect(parseLineType('$ ls\n')).toEqual('ls');
    });
    it('should parse dir change', () => {
      expect(parseLineType('dir a\n')).toEqual('dir');
    });
    it('should parse a file', () => {
      expect(parseLineType('14848514 b.txt\n')).toEqual('file');
    });
    it('should not throw on on any of the example input', () => {
      const input = [
        '$ cd /',
        '$ ls',
        'dir a',
        '14848514 b.txt',
        '8504156 c.dat',
        'dir d',
        '$ cd a',
        '$ ls',
        'dir e',
        '29116 f',
        '2557 g',
        '62596 h.lst',
        '$ cd e',
        '$ ls',
        '584 i',
        '$ cd ..',
        '$ cd ..',
        '$ cd d',
        '$ ls',
        '4060174 j',
        '8033020 d.log',
        '5626152 d.ext',
        '7214296 k',
      ];
      input.forEach((line) => {
        expect(() => parseLineType(line)).not.toThrow();
      });
    });
  });
});
