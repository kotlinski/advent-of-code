import { Direction, GhostCoordinate, GhostMap, KeyState } from './ghost-map';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { findLeastCommonMultiplier } from '../../common/math/least-common-multiplier';

export default class HauntedWastelandSolver extends Solver<GhostMap> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): GhostMap {
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    const first_line = lines.splice(0, 1)[0];
    const instructions: Direction[] = first_line.split('') as Direction[];
    const coordinates: GhostCoordinate[] = lines.map((line) => new GhostCoordinate(line));
    return new GhostMap(instructions, coordinates);
  }

  solvePartOne(): number {
    const start_state: KeyState = { key: 'AAA', direction_offset: 0 };
    return this.input.findPathFromStartToEnd(start_state, new RegExp(/^ZZZ/, 'g')).length - 1;
  }

  solvePartTwo(): number {
    const reg_exp = new RegExp(/^.{2}Z/, 'g');
    const start_keys = this.input.findStartKeys();
    const steps: number[] = start_keys.map(
      (key) => this.input.findPathFromStartToEnd({ key, direction_offset: 0 }, reg_exp).length - 1,
    );
    return findLeastCommonMultiplier(steps);
  }
}
