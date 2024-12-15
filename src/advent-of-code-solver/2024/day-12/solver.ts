import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { Coordinate } from '../../common/matrix/interface.js';
import { Grid } from '../../common/matrix/grid/grid.js';
import { Tile } from '../../common/matrix/grid/tile.js';

const horizontal_directions = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
] as const;
const vertical_directions = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
] as const;
const all_directions = [...horizontal_directions, ...vertical_directions] as const;
type Garden = Grid<string>;

export default class GardenGroupsSolver extends Solver<Garden> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Garden {
    const rows = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return new Grid(rows.map((row) => row.split('')));
  }

  solvePartOne(): number {
    const regions = this.findRegions(this.input);
    return regions.reduce((price, region) => {
      const perimeter = this.calculatePerimeter(region);
      // this.printRegionCost(region, perimeter);
      return price + region.size * perimeter;
    }, 0);
  }
  solvePartTwo(): number {
    const regions = this.findRegions(this.input);
    return regions.reduce((price, region) => {
      const sides = this.countSides(region);
      // this.printRegionCost(region, sides);
      return price + region.size * sides;
    }, 0);
  }

  private findRegions(garden: Garden): Set<Tile<string>>[] {
    const regions: Set<Tile<string>>[] = [];
    garden.traverseTiles((plant) => {
      if (regions.some((region) => region.has(plant))) return;
      regions.push(this.fillRegion(plant));
    });
    return regions;
  }

  private printRegionCost(region: Set<Tile<string>>, price_factor: number) {
    const coordinates: Coordinate[] = [...region];
    const region_plant = this.input.getTileAtCoordinate(coordinates[0])!.value;
    const sum = region.size * price_factor;
    console.log(`- A region of ${region_plant} plants with price ${region.size} * ${price_factor} = ${sum}.`);
  }

  private fillRegion(plant: Tile<string>) {
    const region = new Set<Tile<string>>();
    const stack = [plant];
    while (stack.length > 0) {
      const current = stack.pop()!;
      region.add(current);
      this.input
        .getNeighbours(current)
        .filter(({ tile }) => tile.value === plant.value)
        .forEach(({ tile: neighbour }) => {
          if (!region.has(neighbour)) {
            stack.push(neighbour);
          }
        });
    }
    return region;
  }

  private calculatePerimeter(region: Set<Tile<string>>) {
    return [...region]
      .map((plant) => {
        const { x, y } = plant;
        return this.input.getNeighbours({ x, y }).filter(({ tile: neighbour }) => region.has(neighbour));
      })
      .reduce((perimeter, neighbours) => perimeter + (4 - neighbours.length), 0);
  }

  private countSides(region: Set<Tile<string>>): number {
    const tiles: Tile<string>[] = [...region];
    const region_plant = tiles[0]!.value;
    const { min, max } = tiles.reduce(
      ({ min, max }, { x, y }) => {
        return {
          min: { x: Math.min(min.x, x), y: Math.min(min.y, y) },
          max: { x: Math.max(max.x, x), y: Math.max(max.y, y) },
        };
      },
      { min: { x: Infinity, y: Infinity }, max: { x: 0, y: 0 } },
    );
    const sequence: boolean[] = [false];
    vertical_directions.map((direction) => {
      for (let y = min.y; y <= max.y; y++) {
        sequence.push(false);
        for (let x = min.x; x <= max.x; x++) {
          const has_boarder = this.hasBoarderInDirection({ x, y }, region_plant, direction, tiles);
          if (has_boarder !== sequence[sequence.length - 1]) sequence.push(has_boarder);
        }
      }
    });
    horizontal_directions.map((direction) => {
      for (let x = min.x; x <= max.x; x++) {
        sequence.push(false);
        for (let y = min.y; y <= max.y; y++) {
          const has_boarder = this.hasBoarderInDirection({ x, y }, region_plant, direction, tiles);
          if (has_boarder !== sequence[sequence.length - 1]) sequence.push(has_boarder);
        }
      }
    });
    return sequence.filter((b) => b).length;
  }

  private hasBoarderInDirection(
    { x, y }: Coordinate,
    region_plant: string,
    direction: (typeof all_directions)[number],
    coordinates: Coordinate[],
  ) {
    const neighbour_coordinate = { x: x + direction.x, y: y + direction.y };
    if (!coordinates.some((c) => c.y === y && c.x === x)) {
      return false;
    } else if (!this.input.getTileAtCoordinate(neighbour_coordinate)) {
      return true;
    }
    return this.input.getTileAtCoordinate(neighbour_coordinate)?.value !== region_plant;
  }
}
