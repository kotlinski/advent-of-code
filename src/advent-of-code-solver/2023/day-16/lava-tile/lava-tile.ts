import { createDirectionMapper } from './direction-mapper.js';
import { Direction } from '../../../common/matrix/grid/direction.js';
import { Tile } from '../../../common/matrix/grid/tile.js';
import { Coordinate } from '../../../common/matrix/interface.js';
import { MirrorTileValue } from '../solver.js';

export class LavaTile extends Tile<MirrorTileValue> {
  // in direction mapped to out directions
  private readonly direction_mapper: Map<Direction, Direction[]>;
  constructor(coordinate: Coordinate, value: MirrorTileValue) {
    super(coordinate, value);
    this.direction_mapper = createDirectionMapper(value);
  }
  getNextDirections(direction: Direction): Direction[] {
    return [...this.direction_mapper.get(direction)!];
  }
}
