import { CamelPokerPlayer } from '../solver';

export type CamelCard = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export type HandCategory =
  | 'FIVE-OF-A-KIND'
  | 'FOUR-OF-A-KIND'
  | 'FULL-HOUSE'
  | 'THREE-OF-A-KIND'
  | 'TWO-PAIR'
  | 'ONE-PAIR'
  | 'HIGH-CARD';

export abstract class CamelCardRules {
  abstract calculateHandScore(hand: CamelCard[]): number;
  abstract getCardRank(card: CamelCard): number;
  abstract hasFiveOfAKind(card: CamelCard[]): boolean;
  abstract hasFourOfAKind(card: CamelCard[]): boolean;
  abstract hasFullHouse(card: CamelCard[]): boolean;
  abstract hasThreeOfAKind(card: CamelCard[]): boolean;
  abstract hasTwoPair(card: CamelCard[]): boolean;
  abstract hasOnePair(card: CamelCard[]): boolean;
  abstract hasHighCard(card: CamelCard[]): boolean;
  categorizeHand(hand: CamelCard[]): HandCategory {
    if (this.hasFiveOfAKind(hand)) return 'FIVE-OF-A-KIND';
    if (this.hasFourOfAKind(hand)) return 'FOUR-OF-A-KIND';
    if (this.hasFullHouse(hand)) return 'FULL-HOUSE';
    if (this.hasThreeOfAKind(hand)) return 'THREE-OF-A-KIND';
    if (this.hasTwoPair(hand)) return 'TWO-PAIR';
    if (this.hasOnePair(hand)) return 'ONE-PAIR';
    if (this.hasHighCard(hand)) return 'HIGH-CARD';
    throw new Error('Invalid combination of cards.');
  }

  public getPlayersComperator(): (player_a: CamelPokerPlayer, player_b: CamelPokerPlayer) => number {
    return (player_a: CamelPokerPlayer, player_b: CamelPokerPlayer): number => {
      if (player_a.score === player_b.score) {
        return player_a.hand.reduce((winner, card, index) => {
          if (winner !== 0) return winner;
          return this.getCardRank(card) - this.getCardRank(player_b.hand[index]);
        }, 0);
      }
      return player_a.score - player_b.score;
    };
  }
}

export function countCards(hand: CamelCard[]) {
  return hand.reduce((card_count: Map<CamelCard, number>, card) => {
    if (!card_count.has(card)) {
      card_count.set(card, 0);
    }
    card_count.set(card, card_count.get(card)! + 1);
    return card_count;
  }, new Map<CamelCard, number>());
}

export function findCardCountsOf(cards_count: Map<CamelCard, number>, card_count: number): number {
  return [...cards_count.values()].filter((count) => count === card_count).length;
}
