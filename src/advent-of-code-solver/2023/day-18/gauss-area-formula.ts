import { summarize } from '../../common/array-operations/reduce.js';
import { Coordinate } from '../../common/matrix/interface.js';

/**
 * Gauss area formula aka the Shoelace formula
 * https://en.wikipedia.org/wiki/Shoelace_formula
 */
export function findArea(coordinates: Coordinate[]): number {
  const shoelace = Math.abs(calculateSum(coordinates));
  return shoelace / 2;
}
function nextCoordinate(coordinates: Coordinate[], i: number) {
  return coordinates[(i + 1) % coordinates.length];
}

function calculateSum(coordinates: Coordinate[]) {
  const sums = coordinates.map((coordinate, i) => {
    const next_coordinate = nextCoordinate(coordinates, i);
    return coordinate.x * next_coordinate.y - coordinate.y * next_coordinate.x;
  });
  return sums.reduce(summarize, 0);
}
