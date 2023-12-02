import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { splitStringOnChar } from '../../common/array-operations/map';
import { summarize } from '../../common/array-operations/reduce';
import Solver from '../../solver';

export default class RucksackReorganization extends Solver<string[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[][] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(splitStringOnChar(''));
  }

  solvePartOne(): number {
    const duplicates_in_rucksacks = this.input
      .map((rucksack: string[]) => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)])
      .map((rucksack: string[][]) => this.findDuplicateItems(rucksack[0], rucksack[1]))
      .flat();
    return this.calculateScore(duplicates_in_rucksacks);
  }

  solvePartTwo(): number {
    const group_of_elves: string[][][] = [];
    while (this.input.length > 0) {
      group_of_elves.push([this.input.pop()!, this.input.pop()!, this.input.pop()!]);
    }
    const duplicates = group_of_elves
      .map((group) => this.findDuplicateItems(group[2], this.findDuplicateItems(group[0], group[1]).flat()))
      .flat();
    return this.calculateScore(duplicates);
  }

  private findDuplicateItems(first: string[], second: string[]): string[] {
    const duplicates: string[] = [];
    for (const item of first) {
      if (second.includes(item) && !duplicates.includes(item)) {
        duplicates.push(item);
      }
    }
    return duplicates;
  }

  private calculateScore(duplicates_in_rucksacks: string[]) {
    return duplicates_in_rucksacks.map(this.scoreForRucksackItem()).reduce(summarize, 0);
  }

  private scoreForRucksackItem(): (item: string) => number {
    return (item: string) => {
      const char_code = item.charCodeAt(0);
      if (this.isCapitalLetter(char_code)) {
        return char_code - 65 + 27;
      }
      return char_code - 96;
    };
  }

  private isCapitalLetter(char_code: number) {
    return char_code < 97;
  }
}
