import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { stringToNumber } from '../../common/array-operations/map';
import { summarize } from '../../common/array-operations/reduce';

export class ScratchCard {
  private readonly winning_numbers: number[];
  private readonly scratch_card_numbers: number[];
  constructor(scratch_card: string) {
    const numbers = scratch_card.split(':')[1];
    this.winning_numbers = numbers.split('|')[0].split(' ').filter(removeEmptyLinesPredicate).map(stringToNumber);
    this.scratch_card_numbers = numbers.split('|')[1].split(' ').filter(removeEmptyLinesPredicate).map(stringToNumber);
  }
  public getCorrectNumbers(): number[] {
    return this.scratch_card_numbers.filter((number) => this.winning_numbers.includes(number));
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
      const length = scratch_card.getCorrectNumbers().length;
      return length > 0 ? Math.pow(2, scratch_card.getCorrectNumbers().length - 1) : 0;
    });
    return points.reduce(summarize, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
