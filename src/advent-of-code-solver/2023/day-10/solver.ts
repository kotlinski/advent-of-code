import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { MapTile } from '../../common/pipe-maze/pipe.js';
import { PipeMaze } from '../../common/pipe-maze/pipe-maze.js';

export default class PipeMazeSolver extends Solver<MapTile[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): MapTile[][] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split('') as MapTile[]);
  }

  solvePartOne(): number {
    const pipe_maze = new PipeMaze(this.input);
    return pipe_maze.findNumberOfStepsInLoop() / 2;
  }

  solvePartTwo(): number {
    const pipe_maze = new PipeMaze(this.input);
    return pipe_maze.findInsideAreaOfLoop();
  }
}
