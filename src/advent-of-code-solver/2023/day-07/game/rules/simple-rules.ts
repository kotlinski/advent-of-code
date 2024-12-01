import { CamelCard, CamelCardRules, countCards, findCardCountsOf } from '../camel-card.js';

export class SimpleRules extends CamelCardRules {
  hasFiveOfAKind(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    return findCardCountsOf(cards_count, 5) === 1;
  }
  hasFourOfAKind(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    return findCardCountsOf(cards_count, 4) === 1;
  }
  hasFullHouse(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    return findCardCountsOf(cards_count, 3) === 1 && findCardCountsOf(cards_count, 2) === 1;
  }
  hasThreeOfAKind(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    return findCardCountsOf(cards_count, 3) === 1 && findCardCountsOf(cards_count, 1) === 2;
  }
  hasTwoPair(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    return findCardCountsOf(cards_count, 2) === 2 && findCardCountsOf(cards_count, 1) === 1;
  }
  hasOnePair(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    return findCardCountsOf(cards_count, 2) === 1 && findCardCountsOf(cards_count, 1) === 3;
  }
  hasHighCard(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    return findCardCountsOf(cards_count, 1) === 5;
  }
  calculateHandScore(hand: CamelCard[]): number {
    const category = this.categorizeHand(hand);
    switch (category) {
      case 'FIVE-OF-A-KIND':
        return 50;
      case 'FOUR-OF-A-KIND':
        return 40;
      case 'FULL-HOUSE':
        return 35;
      case 'THREE-OF-A-KIND':
        return 30;
      case 'TWO-PAIR':
        return 20;
      case 'ONE-PAIR':
        return 10;
      case 'HIGH-CARD':
        return 0;
    }
  }
  getCardRank(card: CamelCard): number {
    if (Number.isInteger(Number(card))) {
      return Number(card);
    }
    switch (card) {
      case 'A':
        return 14;
      case 'K':
        return 13;
      case 'Q':
        return 12;
      case 'J':
        return 11;
      case 'T':
        return 10;
    }
    throw new Error('unrecognized card');
  }
}
