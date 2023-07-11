import { removeEmptyLinesPredicate } from '../../array-operations/filter';
import Solver from '../../solver';

export default class TuningTrouble extends Solver<string[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[] {
    return raw_input.split('').filter(removeEmptyLinesPredicate);
  }

  solvePartOne(): number {
    return this.finder(4);
  }

  solvePartTwo(): number {
    return this.finder(14);
  }

  private finder(length: number) {
    for (let i = 0; i < this.input.length; i++) {
      if (i < length) {
        // skip
      } else if (this.hasUniqueChars(this.input.slice(i - length, i))) {
        return i;
      }
    }
    return -1;
  }

  private hasUniqueChars(chars: string[]) {
    console.log(`chars: ${JSON.stringify(chars, null, 2)}`);
    while (chars.length > 0) {
      const letter: string = chars.pop()!;
      if (chars.concat('').includes(letter)) {
        return false;
      }
    }
    return true;
  }
}
