import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { Coordinate } from '../../common/matrix/interface.js';
import { coordinateToString, Grid } from '../../common/matrix/grid/grid.js';
import { all_directions, Direction } from '../../common/matrix/grid/direction.js';
import { Tile } from '../../common/matrix/grid/tile.js';

const edge_directions = ['vertical', 'horizontal'] as const;
const horizontals: Direction[] = ['right', 'left'];
const verticals: Direction[] = ['up', 'down'] as const;
type EdgeDirection = (typeof edge_directions)[number];

class Path {
  constructor(
    public readonly crossings: Crossing[],
    public readonly score: number,
    public readonly direction: (typeof edge_directions)[number],
    public readonly edges: Edge[],
  ) {}

  getLatestCrossing(): Crossing {
    return this.crossings[this.crossings.length - 1];
  }

  getNextEdges(): Edge[] {
    const latest_crossing = this.getLatestCrossing();
    const opposite_direction = this.getOppositeDirection();
    const next_edges = latest_crossing.edges.get(opposite_direction);
    if (next_edges === undefined) return [];
    return [...next_edges];
  }

  private getOppositeDirection() {
    return this.direction === 'horizontal' ? 'vertical' : 'horizontal';
  }

  getPaths() {
    return this.getNextEdges()
      .filter((edge) => {
        //  console.log('skipped reason: crossings filter');
        return this.crossings.every((crossing) => crossing.id !== edge.end.id);
      })
      .map((edge) => {
        return new Path([...this.crossings, edge.end], this.score + edge.steps + 1000, this.getOppositeDirection(), [
          ...this.edges,
          edge,
        ]);
      });
  }

  reachedEnd(end: Coordinate) {
    const coordinate_strings = [this.getLatestCrossing(), end].map(coordinateToString);
    return coordinate_strings[0] === coordinate_strings[1];
  }
}

class Crossing implements Coordinate {
  public readonly x: number;
  public readonly y: number;
  public readonly id: string;
  public readonly edges: Map<EdgeDirection, Set<Edge>> = new Map();
  public readonly best_score: Map<EdgeDirection, number> = new Map(edge_directions.map((direction) => [direction, Infinity]));
  constructor({ x, y }: Coordinate) {
    this.id = coordinateToString({ x, y });
    this.x = x;
    this.y = y;
  }
  addEdge(edge: Edge) {
    if (this.edges.has(edge.direction)) {
      const set = this.edges.get(edge.direction);
      set!.add(edge);
    } else {
      this.edges.set(edge.direction, new Set<Edge>([edge]));
    }
  }
}

class Edge {
  public readonly id: string;
  public readonly steps: number;
  public readonly direction: EdgeDirection;
  constructor(
    readonly start: Crossing,
    readonly end: Crossing,
    direction: Direction,
  ) {
    this.direction = horizontals.includes(direction) ? 'horizontal' : 'vertical';
    const diff = { x: Math.abs(start.x - end.x), y: Math.abs(start.y - end.y) };
    this.steps = verticals.includes(direction) ? diff.y : diff.x;
    this.id = [this.start, this.end].map(coordinateToString).join('-');
  }
}

interface ReindeerMaze {
  maze: Grid<'.' | '#'>;
  start: Coordinate;
  end: Coordinate;
  crossings: Map<string, Crossing>;
}

export default class ReindeerMazeSolver extends Solver<ReindeerMaze> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ReindeerMaze {
    const rows = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    let start: Coordinate | undefined;
    let end: Coordinate | undefined;
    const maze_input = rows.map((row, y) => {
      const chars = row.split('');
      for (let x = 0; x < chars.length; x++) {
        const char = chars[x];
        if (char === 'S') {
          start = { x, y };
          chars[x] = '.';
        } else if (char === 'E') {
          end = { x, y };
          chars[x] = '.';
        }
      }
      return chars.map((char) => char as '.' | '#');
    });
    const maze = new Grid<'.' | '#'>(maze_input);

    const crossings = this.findCrossings(maze);
    crossings.set(coordinateToString(start!), new Crossing(start!));
    crossings.set(coordinateToString(end!), new Crossing(end!));
    [...crossings.values()].forEach((crossing) => {
      all_directions.forEach((direction) => {
        let steps = 0;
        let next_tile: Tile<'.' | '#'> | undefined = maze.getNextTileInDirection(crossing, direction);
        while (next_tile?.value === '.') {
          const next_crossing = crossings.get(next_tile.toString());
          if (next_crossing) {
            const edge = new Edge(crossing, next_crossing, direction);
            crossing.addEdge(edge);
            next_crossing.addEdge(edge);
          }
          next_tile = maze.getTileInDirection(crossing, direction, ++steps);
        }
      });
    });
    if (start === undefined || end === undefined) throw new Error('start or end not found');
    return {
      start,
      end,
      crossings,
      maze,
    };
  }

  private findCrossings(maze: Grid<'.' | '#'>) {
    const crossings = new Map<string, Crossing>();
    maze.traverseTiles((tile) => {
      if (tile.value === '#') return;
      const directions: Direction[] = all_directions.filter((direction) => {
        return maze.getNextTileInDirection(tile, direction)?.value === '.';
      });
      if (
        horizontals.some((direction: Direction) => directions.includes(direction)) &&
        verticals.some((direction: Direction) => directions.includes(direction))
      ) {
        const crossing = new Crossing(tile);
        crossings.set(crossing.id, crossing);
      }
    });
    return crossings;
  }

  solvePartOne(): number {
    const best_paths = this.findBestPaths();
    this.printPath(best_paths[0]);
    return best_paths[0].score;
  }

  solvePartTwo(): number {
    const best_paths = this.findBestPaths();
    console.log(`best_paths.length: ${JSON.stringify(best_paths.length, null, 2)}`);
    const coordinates = new Set<string>();
    best_paths.forEach((path) => {
      // this.printPath(path);
      this.allCoordinatesInPath(path).forEach(({ coordinate }) => coordinates.add(coordinateToString(coordinate)));
    });
    return coordinates.size + 1;
  }

  private findBestPaths(): Path[] {
    const { start, end, crossings } = this.input;
    const best_paths: Path[] = [];
    const paths = this.getInitialPaths(crossings, start);
    let index = 0;
    do {
      let score_paths: Path[] | undefined;
      while (score_paths === undefined && index < Infinity) {
        score_paths = paths[index++];
      }
      /*      if (index > 97400) {
        console.log(`index: ${index}, score_paths: ${score_paths?.length}, paths: ${paths?.length}`);
        //this.printPath(score_paths[0]);
      }*/
      if (!score_paths) throw new Error('score_paths is undefined');
      best_paths.push(...score_paths.filter((path) => path.reachedEnd(end)));
      score_paths
        .filter((path) => {
          const best_score = path.getLatestCrossing().best_score.get(path.direction)!;
          if (path.score > best_score) {
            // console.log(`skipped reason: score filter`);
            return false;
          } else {
            path.getLatestCrossing().best_score.set(path.direction, path.score);
            return true;
          }
        })
        .forEach((path) => {
          path.getPaths().forEach((new_path) => {
            if (paths[new_path.score] === undefined) paths[new_path.score] = [];
            //  this.printPath(new_path);
            paths[new_path.score].push(new_path);
          });
        });
    } while (best_paths.length === 0);
    return best_paths;
  }

  private getInitialPaths(crossings: Map<string, Crossing>, start: Coordinate): Path[][] {
    const paths: Path[][] = [];
    const crossing = crossings.get(coordinateToString(start))!;
    crossing.edges.get('horizontal')?.forEach((edge) => {
      if (edge.start !== crossing) return;
      const score = edge.steps;
      paths[score] = [new Path([edge.start, edge.end], score, 'horizontal', [])];
    });
    crossing.edges.get('vertical')?.forEach((edge) => {
      if (edge.start !== crossing) return;
      const score = edge.steps + 1000;
      paths[score] = [new Path([edge.start, edge.end], score, 'vertical', [])];
    });
    return paths;
  }

  private printPath(new_path: Path) {
    const all_coordinates_between_crossings = this.allCoordinatesInPath(new_path);
    const map: string[][] = Array.from({ length: this.input.maze.height }, () => new Array(this.input.maze.width).fill(''));
    this.input.maze.traverseTiles((tile) => {
      const find = all_coordinates_between_crossings.find(
        ({ coordinate }) => coordinateToString(coordinate) === coordinateToString(tile),
      );
      if (this.input.start.x === tile.x && this.input.start.y === tile.y) {
        map[tile.y][tile.x] = 'S';
      } else if (this.input.end.x === tile.x && this.input.end.y === tile.y) {
        map[tile.y][tile.x] = 'E';
      } else if (find) {
        const direction = all_directions.find((dir) => dir === find.direction)!;
        switch (direction) {
          case 'up':
            map[tile.y][tile.x] = '^';
            break;
          case 'down':
            map[tile.y][tile.x] = 'v';
            break;
          case 'left':
            map[tile.y][tile.x] = '<';
            break;
          case 'right':
            map[tile.y][tile.x] = '>';
            break;
        }
      } else if (tile.value === '#') {
        map[tile.y][tile.x] = '#';
      } else if (tile.value === '.') {
        map[tile.y][tile.x] = '.';
      }
    });
    console.log(`score: ${new_path.score}`);
    console.log(`crossings: ${new_path.crossings.length}`);
    console.log(`crossings: ${new_path.crossings.map((crossing) => coordinateToString(crossing)).join(' -> ')}`);
    console.log(map.map((row) => row.join('')).join('\n'));
    console.log();
  }

  private allCoordinatesInPath(new_path: Path) {
    const all_coordinates_between_crossings: { coordinate: Coordinate; direction: Direction }[] = [];
    for (let i = 0; i < new_path.crossings.length - 1; i++) {
      const start = new_path.crossings[i];
      const end = new_path.crossings[i + 1];
      const direction = start.x === end.x ? (start.y < end.y ? 'down' : 'up') : start.x < end.x ? 'right' : 'left';
      const current: Coordinate = { ...start };
      while (current.x !== end.x || current.y !== end.y) {
        if (direction === 'right') current.x++;
        else if (direction === 'left') current.x--;
        else if (direction === 'down') current.y++;
        else if (direction === 'up') current.y--;
        all_coordinates_between_crossings.push({ coordinate: { ...current }, direction });
      }
    }
    return all_coordinates_between_crossings;
  }
}
