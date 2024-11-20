import { findArea } from './gauss-area-formula.js';
import { mapToCoordinates } from './input-parser.js';
import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';
import { Direction, mapDirection } from '../../common/matrix/grid/direction.js';
import { Coordinate } from '../../common/matrix/interface.js';

export interface DigInstruction {
  direction: Direction;
  steps: number;
  hex: string;
}

export default class LavaductLagoonSolver extends Solver<DigInstruction[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): DigInstruction[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line: string): DigInstruction => {
        const [direction, steps, hex] = line.split(' ');
        return {
          direction: mapDirection(direction),
          steps: Number(steps),
          hex: hex.replace(/[(#)]/g, ''),
        };
      });
  }
  solvePartOne(): number {
    return this.calculateArea(this.input);
  }

  /**
   * The instructions -> coordinates won't be perfect for calculating area with Gauss formula,
   * since 2 steps to the right and 1 step down from {x:0,y:0} will end up at {x:2,y:2},
   * but the area of such instructions would actually be 2x3.
   *
   * To compensate for this,
   * we calculate the perimeter and divide it by 2.
   * +1 to reach the top of the first square meter.
   */
  private calculateArea(instructions: DigInstruction[]) {
    const coordinates: Coordinate[] = mapToCoordinates(instructions);
    const area = findArea(coordinates);
    const steps = instructions.map((instruction) => instruction.steps);
    const radius = steps.reduce(summarize, 0) / 2;
    return area + radius + 1;
  }

  solvePartTwo(): number {
    const real_input = this.input.map((instruction): DigInstruction => {
      const hex = instruction.hex.split('');
      const direction_code = hex.pop()!;
      const string = hex.join('');
      const steps = parseInt(string, 16);
      return {
        hex: instruction.hex,
        direction: ['right', 'down', 'left', 'up'].at(['0', '1', '2', '3'].indexOf(direction_code))! as Direction,
        steps,
      };
    });
    return this.calculateArea(real_input);
  }
}
