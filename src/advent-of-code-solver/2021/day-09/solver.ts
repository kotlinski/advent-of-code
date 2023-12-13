import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import Solver from '../../solver';

function findNeighbours(heightmap: number[][], x: number, y: number) {
  const neighbours: number[] = [];
  [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].forEach((coordinate) => {
    if (coordinate[0] >= 0 && coordinate[0] < heightmap.length) {
      if (coordinate[1] >= 0 && coordinate[1] < heightmap[0].length) {
        neighbours.push(heightmap[coordinate[0]][coordinate[1]]);
      }
    }
  });
  return neighbours;
}

function isRiskHeight(value: number, neighbours: number[]) {
  return neighbours.every((neighbour) => neighbour > value);
}

export default class SmokeBasinSolver extends Solver<number[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split('').map(Number));
  }

  solvePartOne(): number {
    const risk_heights: number[] = [];
    const heightmap = this.input;
    for (let x = 0; x < heightmap.length; x++) {
      for (let y = 0; y < heightmap[x].length; y++) {
        const value = heightmap[x][y];
        const neighbours = findNeighbours(heightmap, x, y);
        if (isRiskHeight(value, neighbours)) {
          risk_heights.push(value);
        }
      }
    }
    return risk_heights.reduce((risk_level, height) => risk_level + height + 1, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
