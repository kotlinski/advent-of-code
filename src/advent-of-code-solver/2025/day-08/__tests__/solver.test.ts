import PlaygroundSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '162,817,812\n' +
  '57,618,57\n' +
  '906,360,560\n' +
  '592,479,940\n' +
  '352,342,300\n' +
  '466,668,158\n' +
  '542,29,236\n' +
  '431,825,988\n' +
  '739,650,466\n' +
  '52,470,668\n' +
  '216,146,977\n' +
  '819,987,18\n' +
  '117,168,530\n' +
  '805,96,715\n' +
  '346,949,466\n' +
  '970,615,88\n' +
  '941,993,340\n' +
  '862,61,35\n' +
  '984,92,344\n' +
  '425,690,689\n\n';

describe('day 8', () => {
  let solver: PlaygroundSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new PlaygroundSolver(input);
      expect(solver.input).toEqual([
        [162, 817, 812],
        [57, 618, 57],
        [906, 360, 560],
        [592, 479, 940],
        [352, 342, 300],
        [466, 668, 158],
        [542, 29, 236],
        [431, 825, 988],
        [739, 650, 466],
        [52, 470, 668],
        [216, 146, 977],
        [819, 987, 18],
        [117, 168, 530],
        [805, 96, 715],
        [346, 949, 466],
        [970, 615, 88],
        [941, 993, 340],
        [862, 61, 35],
        [984, 92, 344],
        [425, 690, 689],
      ]);
    });
  });
  describe('part one', () => {
    it(`should equal to 40`, () => {
      solver = new PlaygroundSolver(input);
      const result = solver.solvePartOne({ input: 10 });
      expect(result).toEqual(40);
    });
  });
  describe('part two', () => {
    it(`should equal to 25272`, () => {
      solver = new PlaygroundSolver(input);
      const result = solver.solvePartTwo();
      expect(result).toEqual(25272);
    });
  });
});
