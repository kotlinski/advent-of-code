import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';

export default class InventoryManagementSystemSolver extends Solver<string[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[][] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split(''));
  }

  solvePartOne(): number {
    const rows_with_two_equal_chars = this.input.filter(this.hasXEqual(2));
    const rows_with_three_equal_chars = this.input.filter(this.hasXEqual(3));
    return rows_with_two_equal_chars.length * rows_with_three_equal_chars.length;
  }

  private hasXEqual(equal_count: number) {
    return (row: string[]) => {
      const map_count = new Map<string, number>();
      for (const char of row) {
        if (!map_count.has(char)) {
          map_count.set(char, 0);
        }
        map_count.set(char, map_count.get(char)! + 1);
      }
      for (const count of map_count.values()) {
        if (count === equal_count) return true;
      }
      return false;
    };
  }

  solvePartTwo(): number {
    return 4711;
  }
}
