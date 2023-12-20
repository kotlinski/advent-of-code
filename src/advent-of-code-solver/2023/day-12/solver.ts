import { HotSpringsConsumer } from './hot-springs-consumer';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { summarize } from '../../common/array-operations/reduce';

export interface Row {
  arrangement: string;
  groups: number[];
}
export default class HotSpringsSolver extends Solver<Row[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Row[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line): Row => {
        const arrangement = line.split(' ')[0];
        const groups = line.split(' ')[1].split(',').map(Number);
        return { arrangement, groups };
      });
  }

  solvePartOne(): number {
    return this.input.reduce((sum, row) => {
      const consumer = new HotSpringsConsumer(row.arrangement, row.groups);
      return sum + consumer.calculateNumberOfCombinations();
    }, 0);
  }

  solvePartTwo(): number {
    const unfolded_input = this.input.map((row) => {
      let arrangement = row.arrangement;
      const groups = [...row.groups];
      for (let i = 0; i < 4; i++) {
        arrangement += `?${row.arrangement}`;
        groups.push(...row.groups);
      }
      return { arrangement, groups };
    });
    const results: number[] = [];

    for (const { arrangement, groups } of unfolded_input) {
      // console.time(arrangement);
      const consumer = new HotSpringsConsumer(arrangement, groups);
      results.push(consumer.calculateNumberOfCombinations());
      // console.timeEnd(arrangement);
    }
    return results.reduce(summarize, 0);
  }
}
