import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate, removeSpacePredicate } from '../../common/array-operations/filter';

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
    const vectors = this.turnStepsToVectors(this.input);
    const end_coordinate: Coordinate = vectors.pop()!.to;
    return this.calculateDistanceToCoordinate(end_coordinate);
  }

  solvePartTwo(): number {
    const vectors = this.turnStepsToVectors(this.input);
    for (let i = 0; i < vectors.length; i++) {
      // don't compare two adjacent vectors (j + 1)
      for (let j = 0; j + 1 < i; j++) {
        const intersection = this.hasIntersection(vectors[i], vectors[j]);
        if (intersection) {
          return this.calculateDistanceToCoordinate(intersection);
        }
      }
    }
    return 0;
  }
  private subtractCoordinates(v1: Coordinate, v2: Coordinate): Coordinate {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
  }
  private hasIntersection(vector_1: Vector, vector_2: Vector): Coordinate | undefined {
    const v1 = this.subtractCoordinates(vector_1.to, vector_1.from);
    const v2 = this.subtractCoordinates(vector_2.to, vector_2.from);

    const det = v1.x * v2.y - v1.y * v2.x;

    if (det === 0) {
      // Vectors are parallel, no intersection
      return undefined;
    }

    const t = ((vector_2.from.x - vector_1.from.x) * v2.y - (vector_2.from.y - vector_1.from.y) * v2.x) / det;
    const u = ((vector_2.from.x - vector_1.from.x) * v1.y - (vector_2.from.y - vector_1.from.y) * v1.x) / det;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return { x: vector_1.from.x + t * v1.x, y: vector_1.from.y + t * v1.y };
    }
    return undefined;
  }

  private calculateDistanceToCoordinate(end_coordinate: Coordinate) {
    return Math.abs(end_coordinate.x) + Math.abs(end_coordinate.y);
  }
  private turnStepsToVectors(coordinated_steps: CoordinatedStep[]) {
    return coordinated_steps.reduce((previous_vectors: Vector[], coordinated_step: CoordinatedStep) => {
      const recent_vector: Vector | undefined = previous_vectors[previous_vectors.length - 1];
      const from = recent_vector?.to ?? { x: 0, y: 0 };

      const direction: Coordinate = recent_vector ? this.getDirection(recent_vector) : { x: 0, y: 1 };
      const new_direction = this.rotateDirection(coordinated_step, direction);
      const to: Coordinate = {
        x: from.x + new_direction.x * coordinated_step.distance,
        y: from.y + new_direction.y * coordinated_step.distance,
      };
      previous_vectors.push({ from, to });
      return previous_vectors;
    }, []);
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
}
