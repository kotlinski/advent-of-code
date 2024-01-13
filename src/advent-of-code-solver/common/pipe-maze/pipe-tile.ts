import { MapTile } from './pipe';
import { Direction } from '../matrix/grid/direction';
import { Tile } from '../matrix/grid/tile';
import { Coordinate } from '../matrix/interface';

export type Move = 'left' | 'right' | 'forward';

export class PipeTile extends Tile<MapTile> {
  constructor(coordinate: Coordinate, value: MapTile) {
    super(coordinate, value);
  }
  getDirections(): Direction[] {
    switch (this.value) {
      case '|':
        return ['down', 'up'];
      case '-':
        return ['left', 'right'];
      case 'L':
        return ['up', 'right'];
      case 'J':
        return ['left', 'up'];
      case '7':
        return ['left', 'down'];
      case 'F':
        return ['down', 'right'];
      case 'S':
        return ['down', 'right', 'up', 'left'];
      case '.':
        return [];
    }
  }

  /**
   * The tile
   * The direction the water will flow out of this tile
   * The relative direction would be either left or right from the flow
   */
  getCoordinateRelativeToTileDirection(flow: Direction, relative_direction: 'left' | 'right'): Coordinate {
    switch (flow) {
      case 'down':
        return this.findCoordinateInDirection(relative_direction === 'left' ? 'right' : 'left');
      case 'up':
        return this.findCoordinateInDirection(relative_direction === 'left' ? 'left' : 'right');
      case 'left':
        return this.findCoordinateInDirection(relative_direction === 'left' ? 'down' : 'up');
      case 'right': {
        return this.findCoordinateInDirection(relative_direction === 'left' ? 'up' : 'down');
      }
    }
  }
  getTravelerMoveThroughTile(from_direction: Direction): Move {
    switch (this.value) {
      case 'L':
        return from_direction === 'up' ? 'left' : 'right';
      case 'J':
        return from_direction === 'up' ? 'right' : 'left';
      case '7':
        return from_direction === 'left' ? 'right' : 'left';
      case 'F':
        return from_direction === 'down' ? 'right' : 'left';
      case '-':
      case 'S':
      case '|':
        return 'forward';
      case '.':
      default:
        throw new Error(`Traveling outside pipe: ${from_direction}, ${this.value}`);
    }
  }
}
