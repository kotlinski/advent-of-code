import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { Coordinate } from '../../common/matrix/interface.js';

type Matrix = number[][];

function isSameCoordinate(next: Coordinate) {
  return ({ x, y }: Coordinate) => x === next.x && y === next.y;
}

export default class HoofItSolver extends Solver<Matrix> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Matrix {
    const rows = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return rows.map((row) => row.split('').map((char) => Number(char)));
  }
  private getTip(path: Coordinate[]): number {
    const { x, y } = path[path.length - 1];
    return this.input[y][x];
  }
  private step(path: Coordinate[]): Coordinate[][] {
    if (this.getTip(path) === 9) {
      return [path];
    }
    const next_steps = this.getNeighbourCoordinates(path[path.length - 1]);
    return next_steps.reduce((paths: Coordinate[][], next) => {
      if (path.some(isSameCoordinate(next))) {
        return paths; // avoid cycles
      }
      if (this.getTip([next]) - this.getTip(path) !== 1) {
        return paths; // 1 step up is only valid
      }
      return [...paths, [...path, next]];
    }, []);
  }
  solvePartOne(): number {
    const paths: Coordinate[][] = this.findStartCoordinates(this.input).map((coordinate) => [coordinate]);
    this.findPaths(paths, false);
    return paths.length;
  }

  private findPaths(paths: Coordinate[][], distinct_paths: boolean) {
    while (paths.some((path) => this.getTip(path) !== 9)) {
      const path = paths.shift()!;
      const new_paths = this.step(path);
      if (distinct_paths) {
        paths.push(...new_paths);
      } else {
        new_paths.forEach((new_path) => {
          if (!this.isDistinctPath(paths, new_path)) {
            paths.push(new_path);
          }
        });
      }
      /*      this.printMap(paths);
      this.printTracks(paths);*/
    }
  }

  private printTracks(paths: Coordinate[][]) {
    console.log(
      `tracks: ${JSON.stringify(
        paths.map((path) => path.map(({ x, y }) => this.input[y][x]).join('')),
        null,
        2,
      )}`,
    );
  }

  private findStartCoordinates(input: Matrix) {
    const starts: Coordinate[] = [];
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === 0) {
          starts.push({ x, y });
        }
      }
    }
    return starts;
  }

  solvePartTwo(): number {
    const paths: Coordinate[][] = this.findStartCoordinates(this.input).map((coordinate) => [coordinate]);
    this.findPaths(paths, true);
    return paths.length;
  }

  private getNeighbourCoordinates(coordinate: Coordinate): Coordinate[] {
    const { x, y } = coordinate;
    const neighbours: Coordinate[] = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];
    return neighbours.filter(({ x, y }) => x >= 0 && y >= 0 && y < this.input.length && x < this.input[y].length);
  }

  private printMap(paths: Coordinate[][]) {
    const map = this.input.map((row) => row.map((_cell) => '.'));
    paths.forEach((path) => {
      path.forEach(({ x, y }) => {
        const current = paths[0][paths[0].length - 1];
        if (current.x === x && current.y === y) {
          map[y][x] = 'X';
        } else {
          map[y][x] = this.getTip([{ x, y }]).toString();
        }
      });
    });

    console.log(`${map.join('\n')}\n\n`);
  }

  private isDistinctPath(paths: Coordinate[][], new_path: Coordinate[]) {
    return paths.some((path) => {
      return isSameCoordinate(path[path.length - 1])(new_path[new_path.length - 1]) && isSameCoordinate(path[0])(new_path[0]);
    });
  }
}
