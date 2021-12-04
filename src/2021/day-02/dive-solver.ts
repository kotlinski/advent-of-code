import Solver from '../../solver';

enum Direction {
  FORWARD = 'forward',
  DOWN = 'down',
  UP = 'up',
}
export interface Movement {
  direction: Direction;
  steps: number;
}

export default class DiveProblemSolver extends Solver<Movement> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  private static formatMovement(raw_command: string): Movement {
    return {
      direction: raw_command.split(' ')[0] as any as Direction,
      steps: parseInt(raw_command.split(' ')[1], 10),
    };
  }

  parse(raw_input: string): Movement[] {
    return raw_input.split('\n').map(DiveProblemSolver.formatMovement);
  }

  solvePartOne(): number {
    const { depth, horizontal_position } = this.calculatePosition(this.input);
    return depth * horizontal_position;
  }

  private calculatePosition(movements: Movement[]): { horizontal_position: number; depth: number } {
    let horizontal_position = 0;
    let depth = 0;
    movements.forEach((movement) => {
      switch (movement.direction) {
        case Direction.FORWARD:
          horizontal_position += movement.steps;
          break;
        case Direction.DOWN:
          depth += movement.steps;
          break;
        case Direction.UP:
          depth -= movement.steps;
          break;
      }
    });
    return { horizontal_position, depth };
  }

  solvePartTwo(): number {
    return 4711;
  }
}
