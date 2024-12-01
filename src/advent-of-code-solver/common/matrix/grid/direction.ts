import { Coordinate } from '../interface.js';

export type Direction = 'up' | 'down' | 'left' | 'right';
export const all_directions: Direction[] = ['up', 'down', 'left', 'right'];

export function opposite(direction: Direction): Direction {
  switch (direction) {
    case 'up':
      return 'down';
    case 'down':
      return 'up';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
  }
}

export function mapDirection(direction: string): Direction {
  if (direction === 'R') {
    return 'right';
  } else if (direction === 'L') {
    return 'left';
  } else if (direction === 'U') {
    return 'up';
  } else if (direction === 'D') {
    return 'down';
  }
  throw new Error(`can't map direction: ${direction}`);
}

export function getDirection(a: Coordinate, b: Coordinate): Direction {
  if (a.x < b.x) {
    return 'right';
  }
  if (a.x > b.x) {
    return 'left';
  }
  if (a.y > b.y) {
    return 'up';
  }
  return 'down';
}
