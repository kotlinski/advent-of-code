import { LavaTile } from './lava-tile/lava-tile';
import { LightBeamTraveler } from './light-beam-traveler';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { highToLowCompareFunction } from '../../common/array-operations/sort';
import { Grid } from '../../common/matrix/grid/grid';
import { all_directions, Direction } from '../../common/matrix/grid/interface';
import { Coordinate } from '../../common/matrix/interface';

export type MirrorTileValue = '.' | '-' | '|' | '/' | '\\';
export default class TheFloorWillBeLavaSolver extends Solver<MirrorTileValue[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): MirrorTileValue[][] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((row) => row.split('')) as MirrorTileValue[][];
  }

  solvePartOne(): number {
    const contraption = new Grid<MirrorTileValue, LavaTile>(
      this.input,
      (coordinate: Coordinate, value: MirrorTileValue) => new LavaTile(coordinate, value),
    );

    const traveler = new LightBeamTraveler(contraption, 'right', { x: 0, y: 0 });
    while (traveler.makeStep()) {
      // console.log(`${traveler.toString()}`);
      // make steps until fixed state
    }
    return traveler.getNumberOfCoveredTiles();
  }

  solvePartTwo(): number {
    const contraption = new Grid<MirrorTileValue, LavaTile>(
      this.input,
      (coordinate: Coordinate, value: MirrorTileValue) => new LavaTile(coordinate, value),
    );
    const start_positions = this.generateStartPositions(contraption);

    const covered_tiles: number[] = start_positions.map((start) => {
      const traveler = new LightBeamTraveler(contraption, start.direction, start.coordinate);
      while (traveler.makeStep()) {
        // make steps until fixed state
      }
      return traveler.getNumberOfCoveredTiles();
    });
    return covered_tiles.sort(highToLowCompareFunction())[0];
  }
  private generateStartPositions(
    contraption: Grid<MirrorTileValue, LavaTile>,
  ): { direction: Direction; coordinate: Coordinate }[] {
    return all_directions.reduce((steps: { direction: Direction; coordinate: Coordinate }[], direction) => {
      switch (direction) {
        case 'up':
          for (let i = 0; i < contraption.width; i++) {
            steps.push({ direction, coordinate: { x: i, y: contraption.height - 1 } });
          }
          break;
        case 'down':
          for (let i = 0; i < contraption.width; i++) {
            steps.push({ direction, coordinate: { x: i, y: 0 } });
          }
          break;
        case 'left':
          for (let i = 0; i < contraption.height; i++) {
            steps.push({ direction, coordinate: { x: contraption.width - 1, y: i } });
          }
          break;
        case 'right':
          for (let i = 0; i < contraption.height; i++) {
            steps.push({ direction, coordinate: { x: 0, y: i } });
          }
          break;
      }
      return steps;
    }, []);
  }
}
