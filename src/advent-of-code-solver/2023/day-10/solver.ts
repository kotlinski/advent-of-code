import { PipeMaze } from './pipe-maze';
import Solver from '../../../advent-of-code-solver/solver';

export default class PipeMazeSolver extends Solver<string> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string {
    return raw_input;
  }

  solvePartOne(): number {
    const pipe_maze = new PipeMaze(this.input);
    return pipe_maze.findNumberOfStepsInLoop() / 2;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
