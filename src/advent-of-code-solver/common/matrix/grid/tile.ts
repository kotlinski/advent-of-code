import { Direction } from './direction';
import { coordinateToString } from './grid';
import { Coordinate } from '../interface';

export class Tile<T> implements Coordinate {
  public readonly y: number;
  public readonly x: number;
  constructor(
    coordinate: Coordinate,
    public value: T,
  ) {
    this.x = coordinate.x;
    this.y = coordinate.y;
  }
  getCoordinate(): Coordinate {
    return { x: this.x, y: this.y };
  }
  toString(): string {
    return coordinateToString({ x: this.x, y: this.y });
  }
  findCoordinateInDirection(direction: Direction): Coordinate {
    switch (direction) {
      case 'up':
        return { x: this.x, y: this.y - 1 };
      case 'down':
        return { x: this.x, y: this.y + 1 };
      case 'left':
        return { x: this.x - 1, y: this.y };
      case 'right':
        return { x: this.x + 1, y: this.y };
    }
  }
}
