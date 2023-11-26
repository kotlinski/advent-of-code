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

  solvePartTwo(): string {
    for (let i = 0; i < this.input.length; i++) {
      for (let j = i; j < this.input.length; j++) {
        const non_equal_indexes = this.countNonEqualChars(this.input[i], this.input[j]);
        if (non_equal_indexes.length === 1) {
          this.input[i].splice(non_equal_indexes[0], 1);
          return this.input[i].join('');
        }
      }
    }

    return '';
  }
  private countNonEqualChars(row_a: string[], row_b: string[]): number[] {
    return row_a.reduce((non_equal_indexes: number[], current, index) => {
      if (current !== row_b[index]) {
        non_equal_indexes.push(index);
      }
      return non_equal_indexes;
    }, []);
  }
}
