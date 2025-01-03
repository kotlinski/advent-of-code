import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { fillInterval } from '../../common/array-operations/map.js';
import Solver from '../../solver.js';

export default class CampCleanup extends Solver<number[][][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][][] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((pair: string) =>
        pair
          .split(',')
          .map((assignment: string) => assignment.split('-').map(Number))
          .map(fillInterval),
      );
  }

  solvePartOne(): number {
    const duplicate_sections = this.input.filter((interval_pair: number[][]) => {
      const first_interval = interval_pair[0].map((n: number) => `.${n}.`).toString();
      const second_interval = interval_pair[1].map((n: number) => `.${n}.`).toString();
      return second_interval.includes(first_interval) || first_interval.includes(second_interval);
    });
    return duplicate_sections.length;
  }

  solvePartTwo(): number {
    const duplicate_sections = this.input.filter((interval_pair: number[][]) => {
      const first_interval = interval_pair[0];
      const second_interval = interval_pair[1];
      for (const item_1 of first_interval) {
        for (const item_2 of second_interval) {
          if (item_1 === item_2) return true;
        }
      }
      return false;
    });
    return duplicate_sections.length;
  }
}
