import { Direction } from './interface';
import { Coordinate } from '../interface';

export function coordinateToString({ x, y }: Coordinate): string {
  return JSON.stringify({ x, y });
}

export class Tile<T> {
  public readonly y: number;
  public readonly x: number;
  constructor(
    coordinate: Coordinate,
    public readonly value: T,
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
