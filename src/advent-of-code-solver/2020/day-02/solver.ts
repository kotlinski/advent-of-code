import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { Letter } from '../../common/interface';

export class PasswordValidator {
  private readonly rule_letter: Letter;
  private readonly min: number;
  private readonly max: number;
  private readonly code: Letter[];
  constructor(line: string) {
    // 1-3 a: abcde
    const rule = line.split(': ')[0];
    this.code = line.split(': ')[1].split('') as Letter[];
    this.rule_letter = rule.split(' ')[1] as Letter;
    const span = rule.split(' ')[0];
    this.min = Number(span.split('-')[0]);
    this.max = Number(span.split('-')[1]);
  }
  public hasValidCode(): boolean {
    const letter_count = this.code.reduce((count, letter: Letter) => {
      count += letter === this.rule_letter ? 1 : 0;
      return count;
    }, 0);
    return letter_count >= this.min && letter_count <= this.max;
  }
}
export default class PasswordPhilosophySolver extends Solver<PasswordValidator[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): PasswordValidator[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => new PasswordValidator(line));
  }

  solvePartOne(): number {
    const valid_codes = this.input.filter((code_validation) => code_validation.hasValidCode());
    return valid_codes.length;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
