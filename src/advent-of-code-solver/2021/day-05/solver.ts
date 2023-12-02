import { mustBeEqualOrHigherThanPredicate, removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { stringToNumber } from '../../common/array-operations/map';
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
    this.points = raw_vector.split(' -> ').map((raw_point) => new Point(raw_point.split(',').map(stringToNumber)));
  }

  isHorizontal = (): boolean => this.points[0].y === this.points[1].y;

  isVertical = (): boolean => this.points[0].x === this.points[1].x;

  isDiagonal = (): boolean => {
    const k = (this.points[0].y - this.points[1].y) / (this.points[0].x - this.points[1].x);
    return Math.abs(k) === 1;
  };

  getPointsInVector(): Point[] {
    const points: Point[] = [];
    const range_x = this.getRange([this.points[0].x, this.points[1].x]);
    const range_y = this.getRange([this.points[0].y, this.points[1].y]);
    if (this.isHorizontal()) {
      range_x.forEach((x: number) => {
        points.push(new Point([x, this.points[0].y]));
      });
    } else if (this.isVertical()) {
      range_y.forEach((y: number) => {
        points.push(new Point([this.points[0].x, y]));
      });
    } else if (this.isDiagonal()) {
      for (let i = 0; i < range_y.length; i++) {
        points.push(new Point([range_x[i], range_y[i]]));
      }
    }
    return points;
  }

  private getRange([p1, p2]: number[]) {
    const map_function = (_v: any, k: number) => (p1 < p2 ? k + Math.min(p1, p2) : Math.max(p1, p2) - k);
    return Array.from({ length: Math.abs(p1 - p2) + 1 }, map_function);
  }
}

export default class HydrothermalVentureSolver extends Solver<Vector[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Vector[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((raw_vector) => new Vector(raw_vector));
  }

  solvePartOne(): number {
    const hydrothermal_vents = this.input.filter((vent) => vent.isHorizontal() || vent.isVertical());
    const diagram = this.getDiagram(hydrothermal_vents);
    HydrothermalVentureSolver.visualizeDiagram(diagram);
    return HydrothermalVentureSolver.countOverlappingPoints(diagram);
  }
  solvePartTwo(): number {
    const hydrothermal_vents = this.input.filter((vent) => vent.isHorizontal() || vent.isVertical() || vent.isDiagonal());
    const diagram = this.getDiagram(hydrothermal_vents);
    HydrothermalVentureSolver.visualizeDiagram(diagram);
    return HydrothermalVentureSolver.countOverlappingPoints(diagram);
  }

  private static visualizeDiagram(diagram: Map<string, number>) {
    let visual = '';
    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        visual += diagram.get(`${x},${y}`) ?? '.';
      }
      visual += '\n';
    }
    console.log(visual);
  }

  private static countOverlappingPoints(diagram: Map<string, number>) {
    return [...diagram.values()].filter(mustBeEqualOrHigherThanPredicate(2)).length;
  }

  private getDiagram(hydrothermal_vents: Vector[]) {
    const diagram = new Map<string, number>();
    for (const vent of hydrothermal_vents) {
      vent.getPointsInVector().forEach((point: Point) => {
        diagram.set(point.hash(), 1 + (diagram.get(point.hash()) ?? 0));
      });
    }
    return diagram;
  }
}
