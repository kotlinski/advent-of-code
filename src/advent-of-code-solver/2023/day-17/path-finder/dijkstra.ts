import { CrucibleStepsProvider } from './crucible-steps-provider.js';
import { PathStore, PathSum } from './path-store.js';
import { all_directions, Direction } from '../../../common/matrix/grid/direction.js';
import { compareCoordinates, Coordinate } from '../../../common/matrix/interface.js';

type Vertical = ('down' | 'up')[];
type Horizontal = ('left' | 'right')[];
export class Dijkstra {
  constructor(
    private readonly steps_provider: CrucibleStepsProvider,
    private readonly path_store: PathStore,
    start: Coordinate,
    private readonly goal: Coordinate,
  ) {
    const initial_paths = this.createInitialPaths(start);
    this.path_store.storeCandidates(initial_paths);
  }

  private createInitialPaths(coordinate: Coordinate) {
    return this.steps_provider.createChildPaths({ coordinate, sum: 0 }, all_directions);
  }

  /**
   * returns the best path or undefined if more steps are needed
   */
  public step(): undefined | PathSum {
    const candidate = this.path_store.consumeNextCandidate()!;
    if (this.hasReachedGoal(candidate.coordinate)) {
      return candidate;
    } else {
      // This is where the magic happens,
      // From this candidate direction, we already explored the possible paths in the same direction
      const directions = this.getCrosswiseDirections(candidate.direction);
      // So from here we only need the possible paths on the other vertical
      const child_paths = this.steps_provider.createChildPaths(candidate, directions);
      // if the candidate the direction was "left" or "right",
      // The child paths will contain 6 paths (the 3 paths going down + the 3 paths going up)
      this.path_store.storeCandidates(child_paths);
    }
    return undefined;
  }
  private getCrosswiseDirections(direction: Direction): Vertical | Horizontal {
    return ['left', 'right'].includes(direction) ? ['down', 'up'] : ['right', 'left'];
  }
  private hasReachedGoal(coordinate: Coordinate) {
    return compareCoordinates(this.goal, coordinate);
  }
  findCheapestPathEfficiency() {
    let path: PathSum | undefined;
    while (path === undefined) {
      path = this.step();
    }
    return path.sum;
  }
}
