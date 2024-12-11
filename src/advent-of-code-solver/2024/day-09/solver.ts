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
    for (let data_pointer = this.input.length - 2; data_pointer >= 0; data_pointer -= 2) {
      const empty_index = this.findEmptySpace(this.input[data_pointer].length);
      if (empty_index !== undefined && empty_index < data_pointer) {
        const swap = this.input[data_pointer];
        this.input[data_pointer] = this.getNumbersTimes(undefined, swap.length);
        const offset = this.input[empty_index].findIndex((element) => element === undefined);
        for (let i = 0; i < swap.length; i++) {
          this.input[empty_index][offset + i] = swap[i];
        }
      }
    }
    // this.print();
    return this.input.flat().reduce((sum: number, value, index) => {
      return value === undefined ? sum : index * value + sum;
    }, 0);
  }

  private print() {
    console.log(
      `this.input.flat().join(''): ${JSON.stringify(
        this.input
          .flat()
          .map((char) => (char === undefined ? '.' : char))
          .join(''),
        null,
        2,
      )}`,
    );
  }

  private findEmptySpace(size: number): number | undefined {
    for (let i = 1; i < this.input.length; i += 2) {
      const free_space = this.input[i].filter((value) => value === undefined).length;
      if (free_space >= size) {
        return i;
      }
    }
    return undefined;
  }
}
