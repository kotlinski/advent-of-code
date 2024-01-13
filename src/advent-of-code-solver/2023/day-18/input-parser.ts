import { DigInstruction } from './solver';
import { Coordinate } from '../../common/matrix/interface';

function instructionToCoordinate(last: Coordinate, instruction: DigInstruction /* , cycle_direction: boolean*/): Coordinate {
  const { direction, steps } = instruction;
  const coordinate_change = steps;
  switch (direction) {
    case 'up':
      return { ...last, y: last.y - coordinate_change };
    case 'down':
      return { ...last, y: last.y + coordinate_change };
    case 'left':
      return { ...last, x: last.x - coordinate_change };
    case 'right':
      return { ...last, x: last.x + coordinate_change };
  }
}

export function mapToCoordinates(instructions: DigInstruction[]) {
  return instructions.reduce(
    (coordinates: Coordinate[], instruction: DigInstruction, index: number) => {
      const current = coordinates[index];
      const next = instructionToCoordinate(current, instruction);
      coordinates.push(next);
      return coordinates;
    },
    [{ x: 0, y: 0 }],
  );
}
