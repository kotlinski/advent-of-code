import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { summarize } from '../../common/array-operations/reduce';

export default class TrebuchetSolver extends Solver<string[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate);
  }

  solvePartOne(): number {
    return this.solve({ solve_by_replacing_words: false });
  }
  solvePartTwo(): number {
    return this.solve({ solve_by_replacing_words: true });
  }
  private solve({ solve_by_replacing_words }: { solve_by_replacing_words: boolean }) {
    const numbers = this.input.map((line) => {
      const first_number = this.findNumberFromLeft(line, solve_by_replacing_words);
      const last_number = this.findNumberFromRight(line, solve_by_replacing_words);
      return first_number * 10 + last_number;
    });
    return numbers.reduce(summarize);
  }

  private findNumberFromLeft(line: string, replace_words = false): number {
    let partial_line = '';
    for (let i = 0; !this.parseNumber(partial_line); i++) {
      partial_line += line[i];
      partial_line = replace_words ? this.replaceWordsWithNumbers(partial_line) : partial_line;
    }
    return this.parseNumber(partial_line)!;
  }
  private findNumberFromRight(line: string, replace_words = false): number {
    let partial_line = '';
    for (let i = line.length - 1; !this.parseNumber(partial_line); i--) {
      partial_line = line[i] + partial_line;
      partial_line = replace_words ? this.replaceWordsWithNumbers(partial_line) : partial_line;
    }
    return this.parseNumber(partial_line)!;
  }

  private replaceWordsWithNumbers(partial_line: string) {
    return partial_line
      .replace('one', '1')
      .replace('two', '2')
      .replace('three', '3')
      .replace('four', '4')
      .replace('five', '5')
      .replace('six', '6')
      .replace('seven', '7')
      .replace('eight', '8')
      .replace('nine', '9');
  }

  private parseNumber(line: string): number | undefined {
    const number = line
      .split('')
      .map(Number)
      .filter((character) => Number.isInteger(Number(character)))[0];
    return Number.isInteger(number) ? number : undefined;
  }
}
