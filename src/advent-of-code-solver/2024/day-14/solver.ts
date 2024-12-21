import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { Coordinate } from '../../common/matrix/interface.js';
import { productarize } from '../../common/array-operations/reduce.js';
import { coordinateToString } from '../../common/matrix/grid/grid.js';

type Robot = { position: Coordinate; velocity: Coordinate };

export default class RestroomRedoubtSolver extends Solver<Robot[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Robot[] {
    const rows = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return rows.map((row) => {
      const [position, velocity] = row.split(' ').map((part) => {
        const [x, y] = part.match(/(-?\d+)/g)!.map(Number);
        return { x, y };
      });
      return { position, velocity };
    });
  }

  solvePartOne(space?: { width: number; height: number }): number {
    const seconds = 100;
    const { width, height } = space ?? { width: 101, height: 103 };

    const positions = this.getPositions(seconds, width, height);

    return positions
      .reduce((map: [0 | 1, 0 | 1][], { x, y }: Coordinate): [0 | 1, 0 | 1][] => {
        const y_half = (height - 1) / 2;
        const x_half = (width - 1) / 2;
        if (y === y_half || x === x_half) return map;
        return [...map, [x < x_half ? 0 : 1, y < y_half ? 0 : 1]];
      }, [])
      .reduce(
        (quadrants: [number, number, number, number], [x, y]: [0 | 1, 0 | 1]) => {
          const index = x === 0 ? (y === 0 ? 0 : 1) : y === 0 ? 2 : 3;
          quadrants[index]++;
          return quadrants;
        },
        [0, 0, 0, 0],
      )
      .reduce(productarize, 1);
  }

  private getPositions(seconds: number, width: number, height: number) {
    return this.input
      .map(({ position, velocity }) => {
        return { x: (position.x + velocity.x * seconds) % width, y: (position.y + velocity.y * seconds) % height };
      })
      .map(({ x, y }) => {
        return {
          x: x < 0 ? x + width : x,
          y: y < 0 ? y + height : y,
        };
      })
      .sort((pos_1, pos_2) => pos_1.y - pos_2.y);
  }
  solvePartTwo(space?: { width: number; height: number }): number {
    const { width, height } = space ?? { width: 101, height: 103 };
    let i = 0;
    do {
      const positions = this.getPositions(i, width, height);
      if (this.hasXmasTreeTop(positions, i, width, height)) {
        console.log(i);
        console.log(this.toString(positions, width, height));
        return i;
      }
      i++;
    } while (i < 1_000_000);
    throw new Error('No solution found');
  }

  /**
   * ...........
   * .....*.....
   * ....***....
   * ...*...*...
   * ..*........
   * .*.........
   * *..........
   */
  private hasXmasTreeTop(positions: Coordinate[], i: number, width: number, height: number) {
    const robots = new Set<string>(positions.map((pos) => coordinateToString(pos)));
    for (const pos of positions) {
      if (
        robots.has(coordinateToString({ x: pos.x - 1, y: pos.y + 1 })) &&
        robots.has(coordinateToString({ x: pos.x, y: pos.y + 1 })) &&
        robots.has(coordinateToString({ x: pos.x + 1, y: pos.y + 1 })) &&
        robots.has(coordinateToString({ x: pos.x - 2, y: pos.y + 2 })) &&
        robots.has(coordinateToString({ x: pos.x + 2, y: pos.y + 2 })) &&
        robots.has(coordinateToString({ x: pos.x - 3, y: pos.y + 3 })) &&
        robots.has(coordinateToString({ x: pos.x - 4, y: pos.y + 4 })) &&
        robots.has(coordinateToString({ x: pos.x - 5, y: pos.y + 5 })) &&
        robots.has(coordinateToString({ x: pos.x - 6, y: pos.y + 6 }))
      ) {
        return true;
      }
    }
    return false;
  }
  private toString(positions: Coordinate[], width: number, height: number): string {
    let map = '';
    for (let y = 0; y < height; y++) {
      let row = '';
      for (let x = 0; x < width; x++) {
        const count = positions.filter(({ x: px, y: py }) => px === x && py === y).length;
        row += count || '.';
      }
      map += `${row}\n`;
    }
    return map;
  }
}
