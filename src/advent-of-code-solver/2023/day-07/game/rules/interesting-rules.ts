import { CamelCard, CamelCardRules, countCards, findCardCountsOf } from '../camel-card.js';

export class InterestingRules extends CamelCardRules {
  hasFiveOfAKind(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    if (!cards_count.get('J')) {
      return findCardCountsOf(cards_count, 5) === 1;
    } else if (cards_count.get('J') === 1) {
      return findCardCountsOf(cards_count, 4) === 1;
    } else if (cards_count.get('J') === 2) {
      return findCardCountsOf(cards_count, 3) === 1;
    } else if (cards_count.get('J') === 3) {
      return findCardCountsOf(cards_count, 2) === 1;
    } else if (cards_count.get('J') === 4 || cards_count.get('J') === 5) {
      return true;
    }
    return false;
  }
  hasFourOfAKind(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    if (!cards_count.get('J')) {
      return findCardCountsOf(cards_count, 4) === 1;
    } else if (cards_count.get('J') === 1) {
      return findCardCountsOf(cards_count, 3) === 1;
    } else if (cards_count.get('J') === 2) {
      return findCardCountsOf(cards_count, 2) === 2;
    } else if (cards_count.get('J') === 3) {
      return findCardCountsOf(cards_count, 1) === 2;
    }
    return false;
  }
  hasFullHouse(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    if (!cards_count.get('J')) {
      return findCardCountsOf(cards_count, 3) === 1 && findCardCountsOf(cards_count, 2) === 1;
    } else if (cards_count.get('J') === 1) {
      return findCardCountsOf(cards_count, 2) === 2 && findCardCountsOf(cards_count, 1) === 1;
    }
    return false;
  }
  hasThreeOfAKind(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    if (!cards_count.get('J')) {
      return findCardCountsOf(cards_count, 3) === 1 && findCardCountsOf(cards_count, 1) === 2;
    } else if (cards_count.get('J') === 1) {
      return findCardCountsOf(cards_count, 2) === 1 && findCardCountsOf(cards_count, 1) === 3;
    } else if (cards_count.get('J') === 2) {
      return findCardCountsOf(cards_count, 2) === 1 && findCardCountsOf(cards_count, 1) === 3;
    }
    return false;
  }
  hasTwoPair(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    if (!cards_count.get('J')) {
      return findCardCountsOf(cards_count, 2) === 2 && findCardCountsOf(cards_count, 1) === 1;
    } else if (cards_count.get('J') === 1) {
      return findCardCountsOf(cards_count, 2) === 1 && findCardCountsOf(cards_count, 1) === 3;
    }
    return false;
  }
  hasOnePair(hand: CamelCard[]) {
    const cards_count = countCards(hand);
    if (!cards_count.get('J')) {
      return findCardCountsOf(cards_count, 2) === 1 && findCardCountsOf(cards_count, 1) === 3;
    }
    return findCardCountsOf(cards_count, 1) === 5;
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
      case 'J': // Joker
        return 1;
      case 'T':
        return 10;
    }
    throw new Error('unrecognized card');
  }
}
