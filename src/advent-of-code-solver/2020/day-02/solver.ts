import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { Letter } from '../../common/interface.js';

export class PasswordValidator {
  private readonly rule_letter: Letter;
  private readonly param_1: number;
  private readonly param_2: number;
  private readonly code: Letter[];
  constructor(line: string) {
    // 1-3 a: abcde
    const rule = line.split(': ')[0];
    this.code = line.split(': ')[1].split('') as Letter[];
    this.rule_letter = rule.split(' ')[1] as Letter;
    const span = rule.split(' ')[0];
    this.param_1 = Number(span.split('-')[0]);
    this.param_2 = Number(span.split('-')[1]);
  }
  public hasValidMinMaxCode(): boolean {
    const letter_count = this.code.reduce((count, letter: Letter) => {
      count += letter === this.rule_letter ? 1 : 0;
      return count;
    }, 0);
    return letter_count >= this.param_1 && letter_count <= this.param_2;
  }
  public hasValidIndexCode(): boolean {
    return (this.code[this.param_1 - 1] === this.rule_letter) !== (this.code[this.param_2 - 1] === this.rule_letter);
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
    const valid_codes = this.input.filter((code_validation) => code_validation.hasValidMinMaxCode());
    return valid_codes.length;
  }

  solvePartTwo(): number {
    const valid_codes = this.input.filter((code_validation) => code_validation.hasValidIndexCode());
    return valid_codes.length;
  }
}
