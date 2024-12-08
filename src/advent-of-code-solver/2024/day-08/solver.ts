import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { Coordinate } from '../../common/matrix/interface.js';

type ParsedType = {
  width: number;
  height: number;
  antennas: Map<string, Coordinate[]>;
};

export default class ResonantCollinearitySolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    const matrix = lines.map((line) => line.split(''));
    const antennas = new Map<string, Coordinate[]>();
    matrix.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell !== '.') {
          if (!antennas.has(cell)) {
            antennas.set(cell, []);
          }
          antennas.get(cell)!.push({ x, y });
        }
      }),
    );
    return {
      width: matrix[0].length,
      height: matrix.length,
      antennas,
    };
  }

  solvePartOne(): number {
    const { antennas } = this.input;
    const antinodes = new Set<string>();
    antennas.forEach((coordinates) => {
      let copy = [...coordinates];
      while (copy.length > 1) {
        const [first, ...rest] = copy;
        rest.forEach((coordinate) => {
          const coefficient = this.getCoefficientOfProportionality(first, coordinate);
          const distance = Math.sqrt((coordinate.x - first.x) ** 2 + (coordinate.y - first.y) ** 2);
          const coordinates: Coordinate[] = this.findValidAntinodes(first, coordinate, coefficient, distance);
          coordinates.forEach((coordinate: Coordinate) => antinodes.add(`${coordinate.x},${coordinate.y}`));
        });
        copy = rest;
      }
    });
    this.printMap(new Set());
    console.log('\n\n--------\n\n');
    this.printMap(antinodes);
    return antinodes.size;
  }

  private printMap(antinodes: Set<string>) {
    for (let y = 0; y < this.input.height; y++) {
      let line = '';
      for (let x = 0; x < this.input.width; x++) {
        let next_char = antinodes.has(`${x},${y}`) ? '#' : '.';
        this.input.antennas.forEach((coordinates, key) => {
          if (coordinates.some((coordinate) => coordinate.x === x && coordinate.y === y)) {
            next_char = key;
          }
        });
        line += next_char;
      }
      console.log(line);
    }
  }

  private getCoefficientOfProportionality(first: Coordinate, coordinate: Coordinate) {
    return (coordinate.y - first.y) / (coordinate.x - first.x);
  }

  solvePartTwo(): number {
    return 4711;
  }

  private findValidAntinodes(first: Coordinate, second: Coordinate, coefficient: number, distance: number) {
    const multiples = [
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
      [-1, -2],
      [-1, 2],
      [-2, -1],
      [-2, 1],
    ];
    const antinodes = multiples.reduce((antinodes: Coordinate[], [a, b]) => {
      const { x: x1, y: y1 } = this.calculateNewCoordinate(first, distance * a, coefficient);
      const { x: x2, y: y2 } = this.calculateNewCoordinate(second, distance * b, coefficient);
      if (x1 === x2 && y1 === y2) {
        return [...antinodes, { x: x1, y: y1 }];
      }
      return antinodes;
    }, []);
    return antinodes.filter(({ x, y }) => x >= 0 && x < this.input.width && y >= 0 && y < this.input.height);
  }

  private calculateNewCoordinate(first: Coordinate, distance: number, coefficient: number): Coordinate {
    const x = Number((first.x + distance / Math.sqrt(1 + coefficient ** 2)).toFixed(0));
    const y = Number((first.y + (distance * coefficient) / Math.sqrt(1 + coefficient ** 2)).toFixed(0));
    return { x, y };
  }
}
