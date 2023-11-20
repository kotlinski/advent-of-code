import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate, removeSpacePredicate } from '../../common-operations/array-operations/filter';

export interface CoordinatedStep {
  turn: 'L' | 'R';
  distance: number;
}

interface Coordinate {
  x: number;
  y: number;
}

export interface Vector {
  from: Coordinate;
  to: Coordinate;
}
export default class NoTimeForATaxicabSolver extends Solver<CoordinatedStep[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): CoordinatedStep[] {
    return raw_input
      .split(', ')
      .filter(removeEmptyLinesPredicate)
      .filter(removeSpacePredicate)
      .map((string_number: string) => {
        const direction = string_number.split('')[0] as 'L' | 'R';
        const steps = parseInt(string_number.slice(1), 10);
        return { turn: direction, distance: steps };
      });
  }

  solvePartOne(): number {
    const vectors: Vector[] = this.input.reduce((previous_vectors: Vector[], coordinated_step: CoordinatedStep) => {
      const recent_vector: Vector | undefined = previous_vectors[previous_vectors.length - 1];
      const from = recent_vector?.to ?? { x: 0, y: 0 };

      const direction: Coordinate = recent_vector ? this.getDirection(recent_vector) : { x: 0, y: 1 };
      const new_direction = this.rotateDirection(coordinated_step, direction);
      const to: Coordinate = {
        x: from.x + new_direction.x * coordinated_step.distance,
        y: from.y + new_direction.y * coordinated_step.distance,
      };
      previous_vectors.push({ from, to });
      /* console.log(`${JSON.stringify(to)}; ${JSON.stringify(coordinated_step)}`);*/
      return previous_vectors;
    }, []);
    const end_coordinate: Coordinate = vectors.pop()!.to;
    return Math.abs(end_coordinate.x) + Math.abs(end_coordinate.y);
  }

  private rotateDirection(coordinated_step: CoordinatedStep, direction: Coordinate): Coordinate {
    const multiplier = coordinated_step.turn === 'R' ? 1 : -1;
    return { x: direction.y * multiplier, y: direction.x * -1 * multiplier };
  }

  private getDirection(recent_vector: Vector): Coordinate {
    const from = recent_vector.from;
    const to = recent_vector.to;
    const x_dir = to.x - from.x;
    const y_dir = to.y - from.y;
    return {
      x: x_dir === 0 ? 0 : x_dir / Math.abs(x_dir),
      y: y_dir === 0 ? 0 : y_dir / Math.abs(y_dir),
    };
  }

  solvePartTwo(): number {
    return 4711;
  }
}
