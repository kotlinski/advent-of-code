import { createDirectionMapper } from './direction-mapper';
import { Direction } from '../../../common/matrix/grid/interface';
import { Tile } from '../../../common/matrix/grid/tile';
import { Coordinate } from '../../../common/matrix/interface';
import { MirrorTileValue } from '../solver';

export class LavaTile extends Tile<MirrorTileValue> {
  // in direction mapped to out directions
  private readonly direction_mapper: Map<Direction, Direction[]>;
  constructor(coordinate: Coordinate, value: MirrorTileValue) {
    super(coordinate, value);
    this.direction_mapper = createDirectionMapper(value);
  }
  getNextDirections(direction: Direction): Direction[] {
    return this.direction_mapper.get(direction)!;
  }
}
