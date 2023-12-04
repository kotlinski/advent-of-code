import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { stringToNumber } from '../../common/array-operations/map';
import { summarize } from '../../common/array-operations/reduce';

export class ScratchCard {
  private readonly winning_numbers: number[];
  private readonly scratch_card_numbers: number[];
  public readonly card_id: number;
  public readonly correct_numbers: number[];
  constructor(scratch_card: string) {
    // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    this.card_id = Number(scratch_card.split(':')[0].replace('Card ', '')) - 1;
    const numbers = scratch_card.split(':')[1];
    this.winning_numbers = numbers.split('|')[0].split(' ').filter(removeEmptyLinesPredicate).map(stringToNumber);
    this.scratch_card_numbers = numbers.split('|')[1].split(' ').filter(removeEmptyLinesPredicate).map(stringToNumber);
    this.correct_numbers = this.scratch_card_numbers.filter((number) => this.winning_numbers.includes(number));
  }
}

export default class ScratchcardsSolver extends Solver<ScratchCard[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ScratchCard[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((scratch_card) => new ScratchCard(scratch_card));
  }

  solvePartOne(): number {
    const points: number[] = this.input.map((scratch_card) => {
      const length = scratch_card.correct_numbers.length;
      return length > 0 ? Math.pow(2, scratch_card.correct_numbers.length - 1) : 0;
    });
    return points.reduce(summarize, 0);
  }

  solvePartTwo(): number {
    return this.scratch(this.input);
  }
  private scratch(scratch_cards: ScratchCard[]): number {
    const scratched_map = new Map<number, number>();

    // initiate the original cards
    scratch_cards.forEach((card) => {
      scratched_map.set(card.card_id, 1);
    });
    scratch_cards.forEach((current_card) => {
      const current_card_count = scratched_map.get(current_card.card_id) ?? 0;
      current_card.correct_numbers.forEach((_correct_number, index) => {
        const next_card_index = current_card.card_id + 1 + index;
        const next_card_count = scratched_map.get(next_card_index) ?? 0;
        scratched_map.set(next_card_index, next_card_count + current_card_count);
      });
    });

    return [...scratched_map.values()].reduce(summarize, 0);
  }
}
