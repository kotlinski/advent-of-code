import { MirrorFinder, MirrorScanner, Scanner, SmudgyMirrorScanner } from './mirror-finder';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { summarize } from '../../common/array-operations/reduce';

export type TileType = '#' | '.';
export default class PointOfIncidenceSolver extends Solver<TileType[][][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): TileType[][][] {
    return raw_input
      .split('\n\n')
      .filter(removeEmptyLinesPredicate)
      .map((room) =>
        room
          .split('\n')
          .filter(removeEmptyLinesPredicate)
          .map((row) => row.split('') as TileType[]),
      );
  }

  solvePartOne(): number {
    return this.summarizeNotesWithScanner(new MirrorScanner());
  }
  solvePartTwo(): number {
    return this.summarizeNotesWithScanner(new SmudgyMirrorScanner());
  }

  private summarizeNotesWithScanner(scanner: Scanner) {
    const rooms = this.input.map((room_input) => new MirrorFinder(room_input, scanner));
    const notes = rooms.map((room) => room.countPatternNotes());
    return notes.reduce(summarize);
  }
}
