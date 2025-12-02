import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

type ParsedType = number[][];

/**
 * Part 1
 */
function isValidId(id: string): boolean {
  const chars = id.split('');
  if (chars.length % 2 !== 0) {
    return true;
  }
  const first = chars.slice(0, chars.length / 2);
  const second = chars.slice(chars.length / 2);
  return first.toString() !== second.toString();
}

/**
 * part 2
 */
function isInvalidId(id: string): boolean {
  const chars = id.split('');
  for (let i = 0; i <= chars.length / 2; i++) {
    const first = chars.slice(0, i);
    const second = chars.slice(i);
    if (second.length % first.length === 0) {
      const repetitions = second.length / first.length;
      const parts = [];
      for (let repetition = 0; repetition < repetitions; repetition++) {
        parts.push(second.slice(repetition * first.length, (repetition + 1) * first.length));
      }
      if (parts.every((part) => part.toString() === first.toString())) return true;
    }
  }
  return false;
}

export default class GiftShopSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    return raw_input
      .split(',')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split('-').map((range) => Number(range)));
  }

  solvePartOne(): number {
    let sum = 0;
    for (const range of this.input) {
      const [from, to] = range;
      for (let i = from; i <= to; i++) {
        if (!isValidId(i.toString(10))) {
          sum += i;
        }
      }
    }
    return sum;
  }

  solvePartTwo(): number {
    let sum = 0;
    for (const range of this.input) {
      const [from, to] = range;
      for (let i = from; i <= to; i++) {
        if (isInvalidId(i.toString(10))) {
          sum += i;
        }
      }
    }
    return sum;
  }
}
