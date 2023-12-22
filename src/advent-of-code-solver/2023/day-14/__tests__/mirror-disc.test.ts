import { MirrorDisc } from '../mirror-disc';

describe('MirrorDisc', () => {
  let mirror_disc: MirrorDisc;

  describe('countLoad', () => {
    describe('example input', () => {
      beforeAll(() => {
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
      beforeAll(() => {
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
  });
  describe('flipNorth', () => {
    describe('task example data', () => {
      beforeAll(() => {
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
        mirror_disc.flipNorth();
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
    describe('with two rocks at bottom', () => {
      beforeAll(() => {
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
        mirror_disc.flipNorth();
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
});
