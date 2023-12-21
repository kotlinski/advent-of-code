import { summarize } from '../../common/array-operations/reduce';
import { memoize } from '../../common/cache';

export class HotSpringsConsumer {
  private readonly memoized: (arrangement: string, groups: number[]) => number;
  private readonly arrangement: string;

  constructor(
    arrangement: string,
    private readonly groups: number[],
  ) {
    this.arrangement = arrangement.replace(/[.]{2,}/g, '.'); // replace clusters of .
    // I tried to solve this with a Map<string, number> as cache first, but ran out of memory when running task 2.
    this.memoized = memoize<[string, number[]], number>(
      this.getRecursiveConsumer(),
      (input) => `${input[0].length}${input[1].length}`,
    );
  }

  calculateNumberOfCombinations(): number {
    return this.memoized(this.arrangement, this.groups);
  }
  private getRecursiveConsumer(): (arrangement: string, groups: number[]) => number {
    return (arrangement: string, groups: number[]): number => {
      if (groups.length === 0) {
        // not a valid solution if remaining ´#´
        return arrangement.includes('#') ? 0 : 1;
      }
      const arrangement_min_length = groups.reduce(summarize) + groups.length - 1;
      if (arrangement.length < arrangement_min_length) {
        // can't complete if arrangement shorter than groups+separators
        return 0;
      }
      let sum = 0;
      if (arrangement[0] !== '#') {
        // skip a bit to see if there are more combinations with the same group, but not allowed to skip '#'
        sum += this.memoized(arrangement.substring(1), groups);
      }
      const group = arrangement.substring(0, groups[0]);
      if (!group.includes('.') && arrangement[groups[0]] !== '#') {
        // consume a "group" from the groups. A group can't include ´.´ and the delimiter can't be a ´#´
        sum += this.memoized(arrangement.substring(groups[0] + 1), groups.slice(1));
      }
      return sum;
    };
  }
}
