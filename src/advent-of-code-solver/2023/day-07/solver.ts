import { CamelCard, CamelCardRules } from './game/camel-card';
import { InterestingRules } from './game/rules/interesting-rules';
import { SimpleRules } from './game/rules/simple-rules';
import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';

export class CamelPokerPlayer {
  public readonly hand: CamelCard[];
  public readonly bid: number;
  public readonly score: number;
  constructor(line: string, rules: CamelCardRules) {
    this.hand = line
      .split(' ')[0]
      .split('')
      .map((card) => card as CamelCard);
    this.bid = Number(line.split(' ')[1]);
    this.score = rules.calculateHandScore(this.hand);
  }
}
class CamePokerGame {
  private readonly players: CamelPokerPlayer[];
  constructor(players_input: string[], private readonly rules: CamelCardRules) {
    this.players = players_input.map((player_input) => new CamelPokerPlayer(player_input, this.rules));
  }
  private rankPlayers() {
    return this.players.sort(this.rules.getPlayersComperator());
  }

  calculateTotalWinnings(): number {
    return this.rankPlayers().reduce((total_winnings, player, rank) => total_winnings + player.bid * (rank + 1), 0);
  }
}
export default class CamelCardsSolver extends Solver<string[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate);
  }

  solvePartOne(): number {
    const game = new CamePokerGame(this.input, new SimpleRules());
    return game.calculateTotalWinnings();
  }

  solvePartTwo(): number {
    const game = new CamePokerGame(this.input, new InterestingRules());
    return game.calculateTotalWinnings();
  }
}
