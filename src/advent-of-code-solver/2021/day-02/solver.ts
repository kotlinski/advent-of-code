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
class UnderWaterVector {
  constructor(
    private depth: number,
    private horizontal_position: number,
    private aim: number,
  ) {}
  public push(coordinate: UnderWaterVector): UnderWaterVector {
    this.depth += coordinate.depth;
    this.horizontal_position += coordinate.horizontal_position;
    this.aim += coordinate.aim;
    return this;
  }
  getUnderWaterValue() {
    return this.depth * this.horizontal_position;
  }

  increaseDepthByAim(steps: number): UnderWaterVector {
    this.depth += this.aim * steps;
    return this;
  }
}

type PerformMovement = (coordinate: UnderWaterVector, steps: number) => UnderWaterVector;

export default class DiveProblemSolver extends Solver<Movement[]> {
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
    const under_water_coordinate = this.calculateUnderWaterCoordinate(
      this.input,
      (coordinate, steps) => coordinate.push(new UnderWaterVector(0, steps, 0)),
      (coordinate, steps) => coordinate.push(new UnderWaterVector(steps, 0, 0)),
      (coordinate, steps) => coordinate.push(new UnderWaterVector(-steps, 0, 0)),
    );
    return under_water_coordinate.getUnderWaterValue();
  }

  solvePartTwo(): number {
    const under_water_coordinate = this.calculateUnderWaterCoordinate(
      this.input,
      (coordinate: UnderWaterVector, steps: number) =>
        coordinate.push(new UnderWaterVector(0, steps, 0)).increaseDepthByAim(steps),
      (coordinate: UnderWaterVector, steps: number) => coordinate.push(new UnderWaterVector(0, 0, steps)),
      (coordinate: UnderWaterVector, steps: number) => coordinate.push(new UnderWaterVector(0, 0, -steps)),
    );
    return under_water_coordinate.getUnderWaterValue();
  }

  private calculateUnderWaterCoordinate(
    movements: Movement[],
    move_forward: PerformMovement,
    move_down: PerformMovement,
    move_up: PerformMovement,
  ): UnderWaterVector {
    const coordinate = new UnderWaterVector(0, 0, 0);
    movements.forEach((movement) => {
      switch (movement.direction) {
        case Direction.FORWARD:
          move_forward(coordinate, movement.steps);
          break;
        case Direction.DOWN:
          move_down(coordinate, movement.steps);
          break;
        case Direction.UP:
          move_up(coordinate, movement.steps);
          break;
      }
    });
    return coordinate;
  }
}
