import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { coordinateToString, stringToCoordinate } from '../../common/matrix/grid/grid.js';
import { Coordinate } from '../../common/matrix/interface.js';

interface Square {
  x: number;
  y: number;
  neighbours: Square[];
  symbol: string;
}

type ParsedType = Map<string, Square>;

export default class PrintingDepartmentSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    const rows = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    const map = new Map<string, Square>();
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      for (let x = 0; x < row.length; x++) {
        const square_symbol = row[x];
        map.set(coordinateToString({ x, y }), { x, y, neighbours: [], symbol: square_symbol });
      }
    }
    for (const [key, square] of map.entries()) {
      const neighbours: Square[] = [];
      const directions = [
        { dx: 0, dy: -1 }, // top
        { dx: 1, dy: 0 }, // right
        { dx: 0, dy: 1 }, // bottom
        { dx: -1, dy: 0 }, // left
        { dx: -1, dy: -1 }, // top-left
        { dx: 1, dy: -1 }, // top-right
        { dx: 1, dy: 1 }, // bottom-right
        { dx: -1, dy: 1 }, // bottom-left
      ];
      for (const { dx, dy } of directions) {
        const { x, y } = stringToCoordinate(key);
        const neighbour = map.get(coordinateToString({ x: x + dx, y: y + dy }));
        if (neighbour) neighbours.push(neighbour);
      }
      square.neighbours = neighbours;
    }
    return map;
  }

  solvePartOne(): number {
    return this.findAccessibleCoordinates(this.input).length;
  }

  private findAccessibleCoordinates(map: ParsedType): Coordinate[] {
    const removable_coordinates: Coordinate[] = [];
    for (const [key, square] of map.entries()) {
      if (square.symbol === '.') continue;
      const rolls = square.neighbours.filter((neighbour) => neighbour.symbol === '@');
      if (rolls.length >= 4) continue;
      removable_coordinates.push(stringToCoordinate(key));
    }
    return removable_coordinates;
  }

  solvePartTwo(): number {
    const map = new Map(this.input);
    let count = 0;
    let accessible_coordinates: Coordinate[];
    do {
      accessible_coordinates = this.findAccessibleCoordinates(map);
      for (const coordinate of accessible_coordinates) {
        const key = coordinateToString(coordinate);
        map.get(key)!.symbol = '.';
      }
      count += accessible_coordinates.length;
    } while (accessible_coordinates.length !== 0);
    return count;
  }
}
