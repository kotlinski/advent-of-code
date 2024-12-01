import { Direction } from '../../../common/matrix/grid/direction.js';
import { Coordinate } from '../../../common/matrix/interface.js';

export interface CityStep {
  coordinate: Coordinate;
  direction: Direction;
}

/**
 * Keeps track of paths that's been visited from a vertical or horizontal direction
 */
export class VisitorTracker {
  private readonly visits = new Set<string>(); // vertical|horizontal:coordinate

  /**
   * returns true if this tile already has been visited from either a horizontal or vertical direction
   */
  visited(step: CityStep): boolean {
    return this.visits.has(this.getKey(step));
  }

  /**
   * returns true if the visit was successful,
   */
  visit(step: CityStep): void {
    this.visits.add(this.getKey(step));
  }

  private getKey({ direction, coordinate }: CityStep): string {
    const vertical = ['right', 'left'].includes(direction) ? 'v' : 'h';
    return `${coordinate.x}${vertical}${coordinate.y}`;
  }
}
