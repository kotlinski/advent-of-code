import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

function isRowSafe(row: number[]): boolean {
  let direction = 0;
  for (let i = 1; i < row.length; i++) {
    const prev = row[i - 1];
    const current = row[i];
    const diff = prev - current;
    const abs_diff = Math.abs(diff);
    const new_direction = diff / abs_diff;
    if (abs_diff <= 0 || abs_diff > 3) {
      return false;
    }
    else if (direction !== 0 && new_direction !== direction) return false;
    direction = new_direction;
  }
  return true;
}

export default class RedSolver extends Solver<number[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][] {
    const string_rows = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return string_rows.map((line) => line.split(' ').filter(removeEmptyLinesPredicate).map(Number));
  }

  solvePartOne(): number {
    const safe_rows = this.input.filter((row) => isRowSafe(row));
    return safe_rows.length;
  }

  solvePartTwo(): number {
    const safe_rows = this.input.filter((row) => {
      const combinations = row.map((_v, i) => [...row.slice(0, i), ...row.slice(i+1)]);
      return combinations.some((combination) => isRowSafe(combination));
    });
    return safe_rows.length;
  }
}
