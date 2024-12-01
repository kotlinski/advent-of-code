import { MirrorDisc } from '../mirror-disc.js';
import { before, describe, it } from 'node:test';
import { expect } from 'expect';

describe('MirrorDisc', () => {
  let mirror_disc: MirrorDisc;

  describe('countLoad', () => {
    describe('example input', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'OOOO.#.O..\n' +
            'OO..#....#\n' +
            'OO..O##..O\n' +
            'O..#.OO...\n' +
            '........#.\n' +
            '..#....#.#\n' +
            '..O..#.O.O\n' +
            '..O.......\n' +
            '#....###..\n' +
            '#....#....',
        );
      });
      it('should sum up to 136', () => {
        const result = mirror_disc.countLoad();
        expect(result).toEqual(136);
      });
    });
    describe('a rock at bottom line', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'OOOO.#.O..\n' +
            'OO..#....#\n' +
            'OO..O##..O\n' +
            'O..#.OO...\n' +
            '........#.\n' +
            '..#....#.#\n' +
            '..O..#.O.O\n' +
            '..O.......\n' +
            '#....###..\n' +
            '#....#O...',
        );
      });
      it('should sum up to 137', () => {
        const result = mirror_disc.countLoad();
        expect(result).toEqual(137);
      });
    });
    describe('after three cycles', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          '.....#....\n' +
            '....#...O#\n' +
            '.....##...\n' +
            '..O#......\n' +
            '.....OOO#.\n' +
            '.O#...O#.#\n' +
            '....O#...O\n' +
            '.......OOO\n' +
            '#...O###.O\n' +
            '#.OOO#...O',
        );
      });
      it('should sum up to 69', () => {
        const result = mirror_disc.countLoad();
        expect(result).toEqual(69);
      });
    });
  });
  describe('cycle', () => {
    describe('once', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'OOOO.#.O..\n' +
            'OO..#....#\n' +
            'OO..O##..O\n' +
            'O..#.OO...\n' +
            '........#.\n' +
            '..#....#.#\n' +
            '..O..#.O.O\n' +
            '..O.......\n' +
            '#....###..\n' +
            '#....#....',
        );
      });
      it('should rotate board to the right', () => {
        mirror_disc.cycle();
        expect(mirror_disc.toString()).toEqual(
          '.....#....\n' +
            '....#...O#\n' +
            '...OO##...\n' +
            '.OO#......\n' +
            '.....OOO#.\n' +
            '.O#...O#.#\n' +
            '....O#....\n' +
            '......OOOO\n' +
            '#...O###..\n' +
            '#..OO#....',
        );
      });
    });
    describe('twice', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'OOOO.#.O..\n' +
            'OO..#....#\n' +
            'OO..O##..O\n' +
            'O..#.OO...\n' +
            '........#.\n' +
            '..#....#.#\n' +
            '..O..#.O.O\n' +
            '..O.......\n' +
            '#....###..\n' +
            '#....#....',
        );
      });
      it('should rotate board to the right', () => {
        mirror_disc.cycle();
        mirror_disc.cycle();
        expect(mirror_disc.toString()).toEqual(
          '.....#....\n' +
            '....#...O#\n' +
            '.....##...\n' +
            '..O#......\n' +
            '.....OOO#.\n' +
            '.O#...O#.#\n' +
            '....O#...O\n' +
            '.......OOO\n' +
            '#..OO###..\n' +
            '#.OOO#...O',
        );
      });
    });
    describe('thrice', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'OOOO.#.O..\n' +
            'OO..#....#\n' +
            'OO..O##..O\n' +
            'O..#.OO...\n' +
            '........#.\n' +
            '..#....#.#\n' +
            '..O..#.O.O\n' +
            '..O.......\n' +
            '#....###..\n' +
            '#....#....',
        );
      });
      it('should end up with a rotation to the right', () => {
        mirror_disc.cycle();
        mirror_disc.cycle();
        mirror_disc.cycle();
        expect(mirror_disc.toString()).toEqual(
          '.....#....\n' +
            '....#...O#\n' +
            '.....##...\n' +
            '..O#......\n' +
            '.....OOO#.\n' +
            '.O#...O#.#\n' +
            '....O#...O\n' +
            '.......OOO\n' +
            '#...O###.O\n' +
            '#.OOO#...O',
        );
      });
    });
  });
  describe('flipNorth', () => {
    describe('task example data', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'O....#....\n' +
            'O.OO#....#\n' +
            '.....##...\n' +
            'OO.#O....O\n' +
            '.O.....O#.\n' +
            'O.#..O.#.#\n' +
            '..O..#O..O\n' +
            '.......O..\n' +
            '#....###..\n' +
            '#OO..#....\n',
        );
      });
      it('should roll the round rocks to the north', () => {
        mirror_disc.flip('up');
        expect(mirror_disc.toString()).toEqual(
          'OOOO.#.O..\n' +
            'OO..#....#\n' +
            'OO..O##..O\n' +
            'O..#.OO...\n' +
            '........#.\n' +
            '..#....#.#\n' +
            '..O..#.O.O\n' +
            '..O.......\n' +
            '#....###..\n' +
            '#....#....',
        );
      });
    });
    describe('with two round rocks at bottom', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'O....#....\n' +
            'O.OO#....#\n' +
            '.....##...\n' +
            'OO.#O....O\n' +
            '.O.....O#.\n' +
            'O.#..O.#.#\n' +
            '..O..#O..O\n' +
            '.......O..\n' +
            '#O...###..\n' +
            '#OO..#....\n',
        );
      });
      it('should roll the round rocks to the north', () => {
        mirror_disc.flip('up');
        expect(mirror_disc.toString()).toEqual(
          'OOOO.#.O..\n' +
            'OO..#....#\n' +
            'OO..O##..O\n' +
            'OO.#.OO...\n' +
            '........#.\n' +
            '..#....#.#\n' +
            '..O..#.O.O\n' +
            '..O.......\n' +
            '#....###..\n' +
            '#....#....',
        );
      });
    });
  });
  describe('flipWest', () => {
    describe('task example data', () => {
      before(() => {
        mirror_disc = new MirrorDisc(
          'O....#....\n' +
            'O.OO#....#\n' +
            '.....##...\n' +
            'OO.#O....O\n' +
            '.O.....O#.\n' +
            'O.#..O.#.#\n' +
            '..O..#O..O\n' +
            '.......O..\n' +
            '#....###..\n' +
            '#OO..#....\n',
        );
      });
      it('should roll the round rocks to the west', () => {
        // console.log(`mirror_disc.toString(): \n${mirror_disc.toString()}`);
        mirror_disc.flip('left');
        // console.log(`mirror_disc.toString(): \n${mirror_disc.toString()}`);
        expect(mirror_disc.toString()).toEqual(
          'O....#....\n' +
            'OOO.#....#\n' +
            '.....##...\n' +
            'OO.#OO....\n' +
            'OO......#.\n' +
            'O.#O...#.#\n' +
            'O....#OO..\n' +
            'O.........\n' +
            '#....###..\n' +
            '#OO..#....',
        );
      });
    });
  });
});
