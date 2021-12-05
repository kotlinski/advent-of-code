import Solver from '../../solver';

class Point {
  x: number;
  y: number;
  constructor(point: number[]) {
    this.x = point[0];
    this.y = point[1];
  }
  public hash(): string {
    return `${this.x},${this.y}`;
  }
}

export class Vector {
  private readonly points: Point[];
  constructor(raw_vector: string) {
    this.points = raw_vector
      .split(' -> ')
      .map((raw_point) => new Point(raw_point.split(',').map((number) => parseInt(number, 10))));
  }

  isHorizontal = (): boolean => this.points[0].y === this.points[1].y;

  isVertical = (): boolean => this.points[0].x === this.points[1].x;

  getPointsInVector(): Point[] {
    const points: Point[] = [];
    const a = this.isHorizontal() ? this.points[0].y : this.points[0].x;
    const min_max = this.isHorizontal() ? [this.points[0].x, this.points[1].x] : [this.points[0].y, this.points[1].y];
    const min: number = Math.min(...min_max);
    const max: number = Math.max(...min_max);
    for (let b = min; b <= max; b++) {
      const coordinate = [a, b];
      if (this.isVertical()) coordinate.reverse();
      const point = new Point(coordinate);
      points.push(point);
    }
    return points;
  }
}

export default class HydrothermalVentureSolver extends Solver<Vector[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Vector[] {
    return raw_input
      .split('\n')
      .filter((v) => v !== '')
      .map((raw_vector) => new Vector(raw_vector));
  }

  solvePartOne(): number {
    const hydrothermal_vents = this.input.filter((vent) => vent.isHorizontal() || vent.isVertical());
    const diagram = new Map<string, number>();
    for (const vent of hydrothermal_vents) {
      vent.getPointsInVector().forEach((point: Point) => {
        diagram.set(point.hash(), 1 + (diagram.get(point.hash()) ?? 0));
      });
    }
    return [...diagram.values()].filter((number) => number >= 2).length;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
