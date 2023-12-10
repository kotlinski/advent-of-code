import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { Coordinate } from '../../common/interface';
import { all_directions, Direction, opposite } from '../../common/matrix/up-down-left-right';

type PipeType = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S';
type SketchTile = PipeType | '.';

class Pipe {
  private readonly neighbours = new Map<Direction, Coordinate>();
  constructor(tile: SketchTile, coordinate: Coordinate) {
    const directions: Direction[] = this.findDirections(tile);
    for (const direction of directions) {
      this.neighbours.set(direction, this.findCoordinateInDirection(direction, coordinate));
    }
  }
  private findCoordinateInDirection(direction: Direction, coordinate: Coordinate): Coordinate {
    switch (direction) {
      case 'up':
        return { x: coordinate.x, y: coordinate.y - 1 };
      case 'down':
        return { x: coordinate.x, y: coordinate.y + 1 };
      case 'left':
        return { x: coordinate.x - 1, y: coordinate.y };
      case 'right':
        return { x: coordinate.x + 1, y: coordinate.y };
    }
  }

  private findDirections(tile: '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S' | '.'): Direction[] {
    switch (tile) {
      case '|':
        return ['down', 'up'];
      case '-':
        return ['left', 'right'];
      case 'L':
        return ['up', 'right'];
      case 'J':
        return ['left', 'up'];
      case '7':
        return ['left', 'down'];
      case 'F':
        return ['down', 'right'];
      case 'S':
        return ['down', 'right', 'up', 'left'];
      case '.':
        return [];
    }
  }
  getNeighbour(direction: Direction): Coordinate {
    return this.neighbours.get(direction)!;
  }
  /*
  memory exceeded
  moveRecursive(
    direction: Direction,
    coordinate: Coordinate,
    end_coordinate: Coordinate,
    map: (c: Coordinate) => Pipe,
  ): Coordinate[] {
    const pipe = map(coordinate);
    const next_coordinate = pipe.getNeighbour(direction);
    if (JSON.stringify(next_coordinate) === JSON.stringify(end_coordinate)) {
      return [next_coordinate];
    }
    const next_direction = map(next_coordinate).findOppositeEnd(opposite(direction));
    return [coordinate, ...this.move(next_direction, next_coordinate, end_coordinate, map)];
  }*/
  move(direction: Direction, coordinate: Coordinate, end_coordinate: Coordinate, map: (c: Coordinate) => Pipe): Coordinate[] {
    const coordinates: Coordinate[] = [];
    let pipe = map(coordinate);
    let neighbour_coordinate: Coordinate = pipe.getNeighbour(direction);
    let next_direction = direction;
    do {
      coordinates.push(neighbour_coordinate);
      const current_coordinate = coordinates.at(-1)!;
      pipe = map(current_coordinate);
      neighbour_coordinate = pipe.getNeighbour(next_direction);
      next_direction = map(neighbour_coordinate).findOppositeEnd(opposite(next_direction));
    } while (JSON.stringify(coordinates.at(-1)!) !== JSON.stringify(end_coordinate));
    return coordinates;
  }

  private findOppositeEnd(direction: Direction): Direction {
    const directions: Direction[] = [...this.neighbours.keys()];
    return directions.filter((neighbour_direction) => neighbour_direction !== direction)[0];
  }
}
export class PipeMaze {
  readonly map = new Map<string, Pipe>();
  private readonly start_coordinate: Coordinate;
  constructor(input: string) {
    const sketch: SketchTile[][] = input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split('') as SketchTile[]);

    this.start_coordinate = this.findStartCoordinate(sketch);
    for (let y = 0; y < sketch.length; y++) {
      const row = sketch[y];
      for (let x = 0; x < row.length; x++) {
        const sketch_tile = row[x];
        const coordinate = { x, y };
        const pipe = new Pipe(sketch_tile, coordinate);
        this.map.set(JSON.stringify(coordinate), pipe);
      }
    }
  }

  private findStartCoordinate(sketch: SketchTile[][]): Coordinate {
    for (let y = 0; y < sketch.length; y++) {
      const row = sketch[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === 'S') {
          return { x, y };
        }
      }
    }
    throw new Error("Couldn't find start");
  }

  traverseLoop(start_pipe: Pipe): Coordinate[] {
    const initial_direction = all_directions.find((direction) => {
      const neighbour_coordinate = start_pipe.getNeighbour(direction);
      return this.map.get(JSON.stringify(neighbour_coordinate))!.getNeighbour(opposite(direction)) !== undefined;
    })!;
    return start_pipe.move(
      initial_direction,
      this.start_coordinate,
      this.start_coordinate,
      (coordinate: Coordinate) => this.map.get(JSON.stringify(coordinate))!,
    );
  }
  findNumberOfStepsInLoop() {
    const start_pipe = this.map.get(JSON.stringify(this.start_coordinate))!;
    const coordinates: Coordinate[] = this.traverseLoop(start_pipe);
    return coordinates.length;
  }
}
