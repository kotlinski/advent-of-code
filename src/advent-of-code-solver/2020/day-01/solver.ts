import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';
import { stringToNumber } from '../../common-operations/array-operations/map';

export default class ReportRepairSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(stringToNumber);
  }

  solvePartOne(): number {
    const expense_report = this.input;
    for (let i = 0; i < expense_report.length; i++) {
      for (let j = i; j < expense_report.length; j++) {
        const expense_a = expense_report[i];
        const expense_b = expense_report[j];
        if (expense_b + expense_a === 2020) {
          return expense_b * expense_a;
        }
      }
    }
    throw new Error('no expense');
  }

  solvePartTwo(): number {
    const expense_report = this.input;
    for (let i = 0; i < expense_report.length; i++) {
      for (let j = i; j < expense_report.length; j++) {
        for (let k = j; k < expense_report.length; k++) {
          const expense_a = expense_report[i];
          const expense_b = expense_report[j];
          const expense_c = expense_report[k];
          if (expense_b + expense_a + expense_c === 2020) {
            return expense_b * expense_a * expense_c;
          }
        }
      }
    }
    throw new Error('no expense');
  }
}
