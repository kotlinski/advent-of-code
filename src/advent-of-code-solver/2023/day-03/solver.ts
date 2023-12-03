import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { summarize } from '../../common/array-operations/reduce';
import { Coordinate } from '../../common/interface';

class PartNumber {
  private end_coordinate: Coordinate;

  constructor(private number: number, private readonly start_coordinate: Coordinate) {
    this.end_coordinate = start_coordinate;
  }
  append(number: number, coordinate: Coordinate) {
    this.end_coordinate = coordinate;
    this.number = this.number * 10 + number;
  }
  getValue(): number {
    return this.number;
  }

  isConnectedTo(symbol_coordinate: Coordinate) {
    const box_start_x = this.start_coordinate.x - 1;
    const box_start_y = this.start_coordinate.y - 1;
    const box_end_x = this.end_coordinate.x + 1;
    const box_end_y = this.end_coordinate.y + 1;
    const within_x = symbol_coordinate.x >= box_start_x && symbol_coordinate.x <= box_end_x;
    const within_y = symbol_coordinate.y >= box_start_y && symbol_coordinate.y <= box_end_y;
    return within_x && within_y;
  }
}
export class EngineSchematic {
  public readonly part_numbers: PartNumber[] = [];
  readonly symbol_coordinates: Coordinate[] = [];
  constructor(engine_schematics: string[][]) {
    for (let y = 0; y < engine_schematics.length; y++) {
      const row = engine_schematics[y];
      let part_number: PartNumber | undefined;
      for (let x = 0; x < row.length; x++) {
        if (Number.isInteger(Number(row[x]))) {
          if (!part_number) {
            part_number = new PartNumber(Number(row[x]), { x, y });
            this.part_numbers.push(part_number);
          } else {
            part_number.append(Number(row[x]), { x, y });
          }
        } else if (row[x] === '.') {
          part_number = undefined;
          // noop
        } else {
          part_number = undefined;
          this.symbol_coordinates.push({ x, y });
        }
      }
    }
  }
  getPartNumbersConnectedToSymbols(): PartNumber[] {
    return this.part_numbers.filter((part) => {
      for (const symbol_coordinate of this.symbol_coordinates) {
        if (part.isConnectedTo(symbol_coordinate)) {
          return true;
        }
      }
      return false;
    });
  }
}
export default class GearRatiosSolver extends Solver<EngineSchematic> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): EngineSchematic {
    return new EngineSchematic(
      raw_input
        .split('\n')
        .filter(removeEmptyLinesPredicate)
        .map((line) => line.split('')),
    );
  }

  solvePartOne(): number {
    const parts = this.input.getPartNumbersConnectedToSymbols();
    const part_values = parts.map((part) => part.getValue());
    return part_values.reduce(summarize, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
