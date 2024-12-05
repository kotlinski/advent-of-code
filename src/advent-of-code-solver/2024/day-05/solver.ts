import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

export interface PageOrderingUpdateRules {
  page_ordering_rules: Map<number, number[]>;
  updates: number[][];
}
export default class PrintQueueSolver extends Solver<PageOrderingUpdateRules> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): PageOrderingUpdateRules {
    const lines = raw_input.split('\n');
    // split lines in two when empty line is found
    const [raw_rules, raw_updates] = lines.reduce(
      (acc: string[][], line) => {
        if (line === '') {
          acc.push([]);
        } else {
          acc[acc.length - 1].push(line);
        }
        return acc;
      },
      [[]],
    );
    const page_ordering_rules = raw_rules.reduce((acc, rule) => {
      const [from, to] = rule.split('|');
      const key = Number(from);
      acc.get(key) ?? acc.set(key, []);
      acc.get(key)!.push(Number(to));
      return acc;
    }, new Map<number, number[]>());
    const updates = raw_updates.map((update) => update.split(',').map(Number));
    return { page_ordering_rules, updates };
  }

  solvePartOne(): number {
    const valid_updates = this.getValidUpdates();
    return this.addPageNumbers(valid_updates);
  }

  private getValidUpdates() {
    return this.input.updates.filter((update) => {
      return update.every((current, index) => {
        const rest = update.slice(index + 1);
        if (!this.input.page_ordering_rules.has(current)) {
          this.input.page_ordering_rules.set(current, []);
        }
        return rest.every((next) => {
          const after = this.input.page_ordering_rules.get(current)!;
          return after.includes(next);
        });
      });
    });
  }

  private addPageNumbers(valid_updates: number[][]) {
    return valid_updates
      .map((update) => {
        return update[Math.round(update.length / 2) - 1];
      })
      .reduce(summarize, 0);
  }

  solvePartTwo(): number {
    const valid_updates = this.getValidUpdates();
    const invalid_updates = this.input.updates.filter((update) => !valid_updates.includes(update));
    const sorted_updates = invalid_updates.map((update) => {
      return update.sort((a, b) => {
        return this.input.page_ordering_rules.get(a)!.includes(b) ? 1 : -1;
      });
    });
    return this.addPageNumbers(sorted_updates);
  }
}
