import { calculateHandScore, CamelCard, compareHands } from './camel-card';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';

export class CamelPokerPlayer {
  public readonly hand: CamelCard[];
  public readonly bid: number;
  public readonly score: number;
  constructor(line: string) {
    this.hand = line
      .split(' ')[0]
      .split('')
      .map((card) => card as CamelCard);
    this.bid = Number(line.split(' ')[1]);
    this.score = calculateHandScore(this.hand);
  }
}

export default class CamelCardsSolver extends Solver<CamelPokerPlayer[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): CamelPokerPlayer[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => new CamelPokerPlayer(line));
  }

  solvePartOne(): number {
    const ranked_players = this.input.sort(compareHands);
    return ranked_players.reduce((total_winnings, player, rank) => total_winnings + player.bid * (rank + 1), 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
