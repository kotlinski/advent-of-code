import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

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
    return 4711;
  }
}
