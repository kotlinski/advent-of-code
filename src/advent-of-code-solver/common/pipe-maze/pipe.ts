import { Direction, getDirection } from '../matrix/grid/direction';
import { Coordinate } from '../matrix/interface';

export type PipeType = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S';
export type MapTile = PipeType | '.';

export function getPipeFromCoordinates(a: Coordinate, b: Coordinate, c: Coordinate): PipeType {
  const in_direction: Direction = getDirection(a, b);
  const out_direction: Direction = getDirection(b, c);
  if (['down', 'up'].includes(in_direction) && ['down', 'up'].includes(out_direction)) {
    return '|';
  } else if (['left', 'right'].includes(in_direction) && ['left', 'right'].includes(out_direction)) {
    return '-';
  } else if (in_direction === 'down') {
    return out_direction === 'right' ? 'L' : 'J';
  } else if (in_direction === 'up') {
    return out_direction === 'right' ? 'F' : '7';
  } else if (in_direction === 'left') {
    return out_direction === 'up' ? 'L' : 'F';
  } else if (in_direction === 'right') {
    return out_direction === 'up' ? 'J' : '7';
  }
  throw new Error('no possible pipe');
}
