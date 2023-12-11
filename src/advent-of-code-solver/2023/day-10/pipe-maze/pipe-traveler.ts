import { Move, PipeTile, SketchTile } from './pipe-tile';
import { all_directions, Direction, opposite } from '../../../common/matrix/grid/interface';
import { coordinateToString, Tile } from '../../../common/matrix/grid/tile';
import { Coordinate } from '../../../common/matrix/interface';

export class PipeTraveler {
  private readonly start_tile: PipeTile;
  private readonly start_direction: Direction;

  constructor(private readonly map: Map<string, PipeTile>) {
    this.start_tile = [...this.map.values()].filter((tile) => tile.value === 'S')[0];
    this.start_direction = this.findInitialDirection(this.start_tile);
  }

  /**
   * Will find tile connections in all possible directions. Will return first possible direction
   */
  private findInitialDirection(tile: Tile<SketchTile>): Direction {
    return all_directions.find((direction) => {
      const neighbour_coordinate = tile.findCoordinateInDirection(direction);
      const neighbour_tile = this.findTileForCoordinate(neighbour_coordinate);
      if (!neighbour_tile) return false;
      return neighbour_tile.getDirections().includes(opposite(direction));
    })!;
  }

  private findTileForCoordinate(coordinate: Coordinate): PipeTile | undefined {
    return this.map.get(coordinateToString(coordinate));
  }

  private findNextTile(tile: PipeTile, direction: Direction): PipeTile {
    return this.findTileForCoordinate(tile.findCoordinateInDirection(direction))!;
  }

  private findNextDirection(tile: PipeTile, direction: Direction): Direction {
    return tile.getDirections().filter((tile_directions) => tile_directions !== opposite(direction))[0];
  }

  public traverseLoop(callback: (tile: PipeTile, direction_into_tile: Direction, move: Move) => void) {
    let direction = this.start_direction;
    let tile = this.start_tile;
    do {
      direction = this.findNextDirection(tile, direction);
      tile = this.findNextTile(tile, direction);
      const move = tile.getTravelerMoveThroughTile(opposite(direction));
      callback(tile, direction, move);
    } while (tile !== this.start_tile);
  }
}
