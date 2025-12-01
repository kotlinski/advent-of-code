import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { after } from 'node:test';

type ParsedType = number[];

export default class SecretEntranceSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => {
        const parsed = line.replace('L', '-').replaceAll('R', '');
        return Number(parsed);
      });
  }

  solvePartOne(): number {
    let count = 0;
    this.input.reduce((value, line) => {
      const new_value = (value + line) % 100;
      if (new_value === 0) count++;
      return new_value;
    }, 50);
    return count;
  }

  solvePartTwo(): number {
    let counter = 0;
    this.input.reduce((value, line) => {
      const direction = line < 0 ? -1 : 1;
      for (let i = 0; i < Math.abs(line); i++) {
        value += direction;
        if (value < 0) value = 99;
        if (value > 99) value = 0;
        if (value === 0) counter++;
      }
      return value;
    }, 50);
    return counter;
  }
}
