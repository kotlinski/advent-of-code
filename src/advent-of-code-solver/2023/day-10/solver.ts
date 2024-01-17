import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { MapTile } from '../../common/pipe-maze/pipe';
import { PipeMaze } from '../../common/pipe-maze/pipe-maze';

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
