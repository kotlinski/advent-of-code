import { PathSum } from './path-store.js';
import { Direction } from '../../../common/matrix/grid/direction.js';
import { Grid } from '../../../common/matrix/grid/grid.js';

export class CrucibleStepsProvider {
  constructor(
    private readonly min_steps: number,
    private readonly max_steps: number,
    private readonly city_map: Grid<number>,
  ) {}
  /**
   * the argument will contain the base coordinate + efficiency sum, together with the new direction.
   */
  createChildPathsInDirection(base: PathSum): PathSum[] {
    const paths: PathSum[] = [];
    let path_sum: PathSum | undefined = base;
    for (let step_count = 1; step_count <= this.max_steps && path_sum; step_count++) {
      path_sum = this.step(path_sum);
      if (path_sum && step_count >= this.min_steps) {
        paths.push(path_sum);
      }
    }
    return paths;
  }

  /**
   * Will create a new child path per step
   */
  createChildPaths(path_sum: Omit<PathSum, 'direction'>, directions: Direction[]): PathSum[] {
    const paths: PathSum[] = [];
    for (const direction of directions) {
      const child_paths = this.createChildPathsInDirection({ ...path_sum, direction });
      paths.push(...child_paths);
    }
    return paths;
  }
  private step({ coordinate, sum, direction }: PathSum): PathSum | undefined {
    const tile = this.city_map.getNextTileInDirection(coordinate, direction);
    if (!tile) return undefined;
    return {
      sum: sum + tile.value,
      direction,
      coordinate: tile.getCoordinate(),
    };
  }
}
