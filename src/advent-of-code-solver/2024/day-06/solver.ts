import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { compareCoordinates, Coordinate } from '../../common/matrix/interface.js';

type T = string[][];

class History {
  private history = new Map<string, Coordinate[]>();

  /**
   * returns true if cyclic route is found
   */
  public step(coordinate: Coordinate, direction: Coordinate) {
    const key = `${coordinate.x},${+coordinate.y}`;
    if (this.history.has(key)) {
      const directions = this.history.get(key)!;
      if (directions.some((dir) => compareCoordinates(dir, direction))) {
        return true;
      }
      this.history.get(key)!.push(direction);
    } else {
      this.history.set(key, [direction]);
    }
    return false;
  }
}
class Brush {
  private last_direction: Coordinate;
  constructor(private readonly brush_directions: { vertical: string; horizontal: string; change: string }) {
    this.last_direction = { x: 0, y: -1 };
  }
  stroke(direction: Coordinate): string {
    const brush = this.brush(direction);
    this.last_direction = direction;
    return brush;
  }

  private brush(direction: Coordinate) {
    if (!compareCoordinates(this.last_direction, direction)) {
      return this.brush_directions.change;
    }
    if (compareCoordinates(direction, { x: 0, y: 1 })) {
      return this.brush_directions.horizontal;
    } else if (compareCoordinates(direction, { x: 0, y: -1 })) {
      return this.brush_directions.horizontal;
    } else if (compareCoordinates(direction, { x: 1, y: 0 })) {
      return this.brush_directions.vertical;
    } else if (compareCoordinates(direction, { x: -1, y: 0 })) {
      return this.brush_directions.vertical;
    }
    throw new Error('cant brush');
  }
}

export default class GuardGallivantSolver extends Solver<T> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): T {
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return lines.map((line) => line.split(''));
  }

  solvePartOne(): number {
    const map = this.input.map((row) => [...row]);
    this.drawGuardRoute(map, new Brush({ vertical: 'X', horizontal: 'X', change: 'X' }));
    return this.findCoordinates(map, 'X').length;
  }

  solvePartTwo(): number {
    let count = 0;
    const plain_map = this.input.map((row) => [...row]);
    this.drawGuardRoute(plain_map, new Brush({ vertical: 'X', horizontal: 'X', change: 'X' }));
    this.input.forEach((row, y) => {
      row.forEach((cell, x) => {
        const map = this.input.map((row) => [...row]);
        if (plain_map[y][x] === 'X') {
          map[y][x] = 'O';
          const is_cyclic = this.drawGuardRoute(map, new Brush({ vertical: '-', horizontal: '|', change: '+' }));
          if (is_cyclic) {
            count++;
          }
        }
      });
    });
    return count;
  }

  /**
   * returns true if cyclic route is found
   */
  private drawGuardRoute(map: string[][], brush: Brush): boolean {
    const history = new History();
    const crates_set = new Set<string>(
      [...this.findCoordinates(map, '#'), ...this.findCoordinates(map, 'O')].map((crate) => `${crate.x},${crate.y}`),
    );
    let guard_position: Coordinate = this.findCoordinates(map, '^')[0];
    let direction: Coordinate = { x: 0, y: -1 };
    while (this.isOnMap(guard_position, map)) {
      let next_position = { x: guard_position.x + direction.x, y: guard_position.y + direction.y };
      while (crates_set.has(`${next_position.x},${next_position.y}`)) {
        direction = { x: -direction.y, y: direction.x };
        next_position = { x: guard_position.x + direction.x, y: guard_position.y + direction.y };
      }
      if (this.isOnMap(next_position, map)) {
        map[next_position.y][next_position.x] = '^';
      }
      if (history.step(next_position, direction)) return true;
      map[guard_position.y][guard_position.x] = brush.stroke(direction);
      /*      map.forEach((row) => console.log(row.join('')));
      console.log('\n-----------------\n');*/
      guard_position = next_position;
    }
    return false;
  }

  private isOnMap(next_position: { x: number; y: number }, map: string[][]) {
    if (!next_position) return false;
    return next_position.y >= 0 && next_position.y < map.length && next_position.x >= 0 && next_position.x < map[0].length;
  }

  private findCoordinates(input: T, character: string) {
    const coordinates: Coordinate[] = [];
    input.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === character) {
          coordinates.push({ x, y });
        }
      });
    });
    return coordinates;
  }
}
