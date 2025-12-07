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
    const initial_row = this.input.shift()!;
    const init = initial_row.indexOf('S');

    const streams = this.input.reduce(
      (streams, row) => {
        const next_row = new Map<number, number>();
        streams.forEach(({ id, score }) => {
          if (row[id] === '.') {
            this.updateNextRow(next_row, id, score);
          } else if (row[id] === '^') {
            this.updateNextRow(next_row, id - 1, score);
            this.updateNextRow(next_row, id + 1, score);
          }
        });
        return [...next_row.entries()].map(([id, score]) => ({ id, score }));
      },
      [{ id: init, score: 1 }],
    );
    return streams.reduce((sum, { score }) => sum + score, 0);
  }

  private updateNextRow(next_row: Map<number, number>, id: number, score: number) {
    const prev = next_row.get(id) ?? 0;
    next_row.set(id, prev + score);
  }
}
