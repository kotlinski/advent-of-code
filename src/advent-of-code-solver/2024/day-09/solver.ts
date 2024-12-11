import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

export default class DiskFragmenterSolver extends Solver<(number | undefined)[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): (number | undefined)[][] {
    const numbers = raw_input.split('').filter(removeEmptyLinesPredicate).map(Number);
    return numbers.reduce((blocks: (number | undefined)[][], size, index) => {
      if (index % 2 === 1) {
        blocks.push(this.getNumbersTimes(undefined, size));
      } else {
        blocks.push(this.getNumbersTimes(index / 2, size));
      }
      return blocks;
    }, []);
  }

  solvePartOne(): number {
    let empty_pointer = 1;
    let data_pointer = this.input.length - 2;
    let empty_ref = 0;
    let data_ref = this.input[data_pointer].length - 1;
    while (empty_pointer < data_pointer) {
      while (!this.isFilled(this.input[empty_pointer])) {
        if (this.isEmpty(this.input[data_pointer])) {
          data_pointer -= 2;
          data_ref = this.input[data_pointer].length - 1;
        } else {
          const swap = this.input[data_pointer][data_ref];
          this.input[data_pointer][data_ref] = undefined;
          this.input[empty_pointer][empty_ref] = swap;
          data_ref -= 1;
          empty_ref += 1;
        }
      }
      empty_ref = 0;
      empty_pointer += 2;
    }
    return this.input.flat().reduce((sum: number, value, index) => {
      return value === undefined ? sum : index * value + sum;
    }, 0);
  }

  private isEmpty(bucket: (number | undefined)[]) {
    return bucket.every((value) => value === undefined);
  }
  private isFilled(bucket: (number | undefined)[]) {
    return bucket.every((value) => value !== undefined);
  }

  private getNumbersTimes(number: undefined | number, size: number): (number | undefined)[] {
    return Array.from({ length: size }, () => number);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
