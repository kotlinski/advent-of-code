import { LavaTile } from './lava-tile/lava-tile.js';
import { MirrorTileValue } from './solver.js';
import { Direction } from '../../common/matrix/grid/direction.js';
import { coordinateToString, Grid } from '../../common/matrix/grid/grid.js';
import { Coordinate } from '../../common/matrix/interface.js';

type Step = { tile: LavaTile; direction: Direction };

class Stream {
  private done = false;
  private readonly directions: Direction[] = [];
  private readonly tiles: LavaTile[] = [];
  stop() {
    this.done = true;
  }
  isDone(): boolean {
    return this.done;
  }
  getLast(): Step {
    const direction = this.directions.at(-1)!;
    const tile = this.tiles.at(-1)!;
    return { direction, tile };
  }
  getAllSteps(): Step[] {
    return this.directions.map((direction, index) => ({ direction, tile: this.tiles[index] }));
  }

  push({ direction, tile }: Step) {
    this.directions.push(direction);
    this.tiles.push(tile);
  }
}

export class LightBeamTraveler {
  private readonly visited_tiles: Set<string>; // coordinate
  private readonly established_flows: Set<string>; // direction + coordinate
  private readonly streams: Stream[];
  mapKey = (coordinate: Coordinate, direction?: Direction): string =>
    `${coordinateToString(coordinate)}${direction ? direction[0] : ''}`;

  constructor(
    private readonly contraption: Grid<MirrorTileValue, LavaTile>,
    start_direction: Direction,
    start_coordinate: Coordinate,
  ) {
    this.visited_tiles = new Set<string>();
    this.established_flows = new Set<string>();
    const tile = this.contraption.getTileAtCoordinate(start_coordinate)!;
    const stream = new Stream();
    this.pushOrStopStream(tile, start_direction, stream);
    this.streams = [stream];
  }
  toString(): string {
    const base = this.contraption.toString().split('');
    this.streams.forEach((stream) => {
      stream.getAllSteps().forEach((step) => {
        const coordinate = step.tile.getCoordinate();
        const index = coordinate.x + coordinate.y * (this.contraption.width + 1); // plus 1 for new line chars
        const direction_char = ['<', '>', '^', 'v'][['left', 'right', 'up', 'down'].indexOf(step.direction)];
        if (base[index] === '.') base.splice(index, 1, direction_char);
      });
    });
    return base.join('');
  }

  /**
   * Returns true if more steps are available
   */
  makeStep(): boolean {
    if (this.streams.length === 0) return false;
    this.streams.forEach((stream: Stream) => {
      const split: Step | undefined = this.stream(stream);
      if (split) {
        const split_stream = new Stream();
        this.pushOrStopStream(split.tile, split.direction, split_stream);
        this.streams.push(split_stream);
      }
    });
    return !this.streams.every((stream) => stream.isDone());
  }

  getNumberOfCoveredTiles(): number {
    return this.visited_tiles.size;
  }

  private stream(stream: Stream): Step | undefined {
    if (stream.isDone()) return;
    const { direction, tile } = stream.getLast();
    const next_directions = tile.getNextDirections(direction);
    const next_direction = next_directions.shift()!;
    const next_tile = this.contraption.getNextTileInDirection(tile, next_direction);
    this.pushOrStopStream(next_tile, next_direction, stream);
    const split_direction = next_directions.shift();
    if (!split_direction) return;
    const split_tile = this.contraption.getNextTileInDirection(tile, split_direction);
    if (!split_tile) return;
    return { tile: split_tile, direction: split_direction };
  }

  private pushOrStopStream(next_tile: LavaTile | undefined, next_direction: Direction, stream: Stream) {
    if (!next_tile || this.established_flows.has(this.mapKey(next_tile.getCoordinate(), next_direction))) {
      stream.stop();
    } else {
      stream.push({ tile: next_tile, direction: next_direction });
      this.visited_tiles.add(this.mapKey(next_tile.getCoordinate()));
      this.established_flows.add(this.mapKey(next_tile.getCoordinate(), next_direction));
    }
  }
}
