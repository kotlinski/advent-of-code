import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

type ParsedType = { ranges: [number, number][]; ingredients: number[] };

export default class CafeteriaSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    const ranges = lines.reduce((ranges: [number, number][], line: string) => {
      if (line.includes('-')) {
        const [start, end] = line.split('-').map(Number);
        ranges.push([start, end]);
      }
      return ranges;
    }, []);
    const ingredients = lines.filter((line) => !line.includes('-')).map(Number);
    return { ranges, ingredients };
  }

  solvePartOne(): number {
    const { ranges, ingredients } = this.input;
    const fresh = ingredients.filter((ingredient) => ranges.some(([from, to]) => from <= ingredient && ingredient <= to));
    return fresh.length;
  }

  solvePartTwo(): number {
    const { ranges } = this.input;
    ranges.sort((a, b) => a[0] - b[0]);
    const new_ranges = ranges.reduce((overlapping: [number, number][], range) => {
      const last = overlapping.pop();
      if (last === undefined) return [range];

      const new_range = isOverlapping(last, range);
      overlapping.push(...(new_range ? [new_range] : [last, range]));
      return overlapping;
    }, []);
    const count = new_ranges.map(([start, end]) => {
      return end - start + 1;
    });
    return count.reduce(summarize);
  }
}

function isOverlapping(
  [first_start, first_end]: [number, number],
  [second_start, second_end]: [number, number],
): [number, number] | undefined {
  if (first_end + 1 >= second_start) {
    return [first_start, Math.max(first_end, second_end)];
  }
  return;
}
