import { LavaTile } from './lava-tile/lava-tile';
import { LightBeamTraveler } from './light-beam-traveler';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { Grid } from '../../common/matrix/grid/grid';

export type MirrorTileValue = '.' | '-' | '|' | '/' | '\\';
export default class TheFloorWillBeLavaSolver extends Solver<string> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string {
    return raw_input;
  }

  solvePartOne(): number {
    const rows = this.input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((row) => row.split('')) as MirrorTileValue[][];
    const contraption = new Grid<MirrorTileValue, LavaTile>(rows, (coordinate, value) => new LavaTile(coordinate, value));
    const traveler = new LightBeamTraveler(contraption);
    while (traveler.makeStep()) {
      // console.log(`${traveler.toString()}`);
      // make steps until fixed state
    }
    return traveler.getNumberOfCoveredTiles();
  }

  solvePartTwo(): number {
    return 4711;
  }
}
