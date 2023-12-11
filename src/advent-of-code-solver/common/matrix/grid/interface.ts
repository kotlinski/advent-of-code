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
