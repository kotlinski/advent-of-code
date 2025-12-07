import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

type ParsedType = string[][];

export default class LaboratoriesSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split(''));
  }

  solvePartOne(): number {
    const initial_row = this.input.shift()!;
    const init = initial_row.indexOf('S');

    const { splits } = this.input.reduce(
      ({ streams, splits }, row) => {
        const new_streams = new Set<number>();
        streams.forEach((index) => {
          if (row[index] === '.') {
            new_streams.add(index);
          } else if (row[index] === '^') {
            splits += 1;
            new_streams.add(index - 1);
            new_streams.add(index + 1);
          }
        });
        return { streams: [...new_streams], splits };
      },
      { streams: [init], splits: 0 },
    );
    return splits;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
