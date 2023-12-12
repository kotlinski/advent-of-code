import { Move, PipeTile, SketchTile } from './pipe-tile';
import { PipeTraveler } from './pipe-traveler';
import { removeEmptyLinesPredicate } from '../../../common/array-operations/filter';
import { all_directions, Direction, opposite } from '../../../common/matrix/grid/interface';
import { coordinateToString } from '../../../common/matrix/grid/tile';
import { Coordinate } from '../../../common/matrix/interface';

export class PipeMaze {
  private readonly traveler: PipeTraveler;
  private readonly map: Map<string, PipeTile>;
  constructor(input: string) {
    const sketch: SketchTile[][] = input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split('') as SketchTile[]);

    this.map = new Map<string, PipeTile>();
    for (let y = 0; y < sketch.length; y++) {
      const row = sketch[y];
      for (let x = 0; x < row.length; x++) {
        const tile = new PipeTile({ x, y }, row[x]);
        this.map.set(tile.toString(), tile);
      }
    }
    this.traveler = new PipeTraveler(this.map);
  }
  findNumberOfStepsInLoop() {
    let count = 0;
    this.traveler.traverseLoop(() => count++);
    return count;
  }
  findInsideAreaOfLoop() {
    // 1. find inside of travel direction (left or right)
    const travel_inside_direction = this.getInsideRelativeToTravelDirection();
    // 2. find all valid coordinates inside loop (1 level in)
    const pipe_tiles = new Set<string>();
    this.traveler.traverseLoop((tile) => pipe_tiles.add(tile.toString()));
    let inside_tiles = new Set<string>();
    this.traveler.traverseLoop((tile, direction, move) =>
      this.getCoordinatesNextToTileDirection(tile, direction, move, travel_inside_direction).forEach((coordinate) =>
        !pipe_tiles.has(coordinateToString(coordinate)) ? inside_tiles.add(coordinateToString(coordinate)) : undefined,
      ),
    );
    // 3. for each valid tile inside the pipe, add each valid neighbour until no more neighbours can be found
    let inside_tile_neighbours: Set<string>;
    do {
      inside_tile_neighbours = new Set<string>();
      for (const tile_key of inside_tiles) {
        const tile = this.map.get(tile_key)!;
        all_directions.map((direction) => {
          const neighbor_coordinate = tile.findCoordinateInDirection(direction);
          const key = coordinateToString(neighbor_coordinate);
          if (!pipe_tiles.has(key) && !inside_tiles.has(key)) {
            inside_tile_neighbours.add(key);
          }
        });
      }
      inside_tiles = new Set<string>([...inside_tiles, ...inside_tile_neighbours]);
    } while (inside_tile_neighbours.size !== 0);
    return inside_tiles.size;
  }
  getInsideRelativeToTravelDirection(): 'left' | 'right' {
    let left_turns = 0;
    let right_turns = 0;
    this.traveler.traverseLoop((_tile, _outgoing_direction, travel_navigation) => {
      if (travel_navigation === 'left') left_turns++;
      if (travel_navigation === 'right') right_turns++;
    });
    return left_turns > right_turns ? 'left' : 'right';
  }

  getCoordinatesNextToTileDirection(
    tile: PipeTile,
    in_direction: Direction,
    move: Move,
    inside: 'left' | 'right',
  ): Coordinate[] {
    const out_direction = tile.getDirections().filter((direction) => direction !== opposite(in_direction))[0];
    switch (move) {
      case 'forward':
        return [tile.getCoordinateRelativeToTileDirection(in_direction, inside)];
      case 'left':
        if (inside === 'left') return [];
        return [
          tile.getCoordinateRelativeToTileDirection(out_direction, inside),
          tile.getCoordinateRelativeToTileDirection(in_direction, inside),
        ];
      case 'right':
        if (inside === 'right') return [];
        return [
          tile.getCoordinateRelativeToTileDirection(out_direction, inside),
          tile.getCoordinateRelativeToTileDirection(in_direction, inside),
        ];
    }
  }
}
