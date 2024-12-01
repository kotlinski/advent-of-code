import { CrucibleStepsProvider } from './path-finder/crucible-steps-provider.js';
import { Dijkstra } from './path-finder/dijkstra.js';
import { PathStore } from './path-finder/path-store.js';
import { VisitorTracker } from './path-finder/visitor-tracker.js';
import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { Grid } from '../../common/matrix/grid/grid.js';

export default class ClumsyCrucibleSolver extends Solver<number[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((row) => row.split('').map(Number));
  }

  solvePartOne(): number {
    const city_map = new Grid<number>(this.input);
    const steps_provider = new CrucibleStepsProvider(1, 3, city_map);
    return this.findCheapestPathSum(city_map, steps_provider);
  }

  solvePartTwo(): number {
    const city_map = new Grid<number>(this.input);
    const steps_provider = new CrucibleStepsProvider(4, 10, city_map);
    return this.findCheapestPathSum(city_map, steps_provider);
  }
  private findCheapestPathSum(city_map: Grid<number>, steps_provider: CrucibleStepsProvider) {
    const start = { x: 0, y: 0 };
    const goal = { x: city_map.width - 1, y: city_map.height - 1 };
    const path_store = new PathStore(new VisitorTracker());
    const dijkstra = new Dijkstra(steps_provider, path_store, start, goal);
    return dijkstra.findCheapestPathEfficiency();
  }
}
