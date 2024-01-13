export interface Vector {
  from: Coordinate;
  to: Coordinate;
}

export interface Coordinate {
  x: number;
  y: number;
}
export function compareCoordinates(a: Coordinate, b: Coordinate) {
  return a.x === b.x && a.y === b.y;
}
