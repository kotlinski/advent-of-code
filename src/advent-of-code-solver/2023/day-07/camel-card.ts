import { CamelPokerPlayer } from './solver';

export type CamelCard = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
export type HandCategory =
  | 'FIVE-OF-A-KIND'
  | 'FOUR-OF-A-KIND'
  | 'FULL-HOUSE'
  | 'THREE-OF-A-KIND'
  | 'TWO-PAIR'
  | 'ONE-PAIR'
  | 'HIGH-CARD';
export function calculateHandScore(hand: CamelCard[]): number {
  const category = categorizeHand(hand);
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
export function compareHands(player_a: CamelPokerPlayer, player_b: CamelPokerPlayer): number {
  if (player_a.score === player_b.score) {
    return player_a.hand.reduce((winner, card, index) => {
      if (winner !== 0) return winner;
      return getCardRank(card) - getCardRank(player_b.hand[index]!);
    }, 0);
  }
  return player_a.score - player_b.score;
}

export function categorizeHand(hand: CamelCard[]): HandCategory {
  if (hasFiveOfAKind(hand)) return 'FIVE-OF-A-KIND';
  if (hasFourOfAKind(hand)) return 'FOUR-OF-A-KIND';
  if (hasFullHouse(hand)) return 'FULL-HOUSE';
  if (hasThreeOfAKind(hand)) return 'THREE-OF-A-KIND';
  if (hasTwoPair(hand)) return 'TWO-PAIR';
  if (hasOnePair(hand)) return 'ONE-PAIR';
  if (hasHighCard(hand)) return 'HIGH-CARD';
  throw new Error('Invalid combination of cards.');
}
export function getCardRank(card: CamelCard): number {
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

function countCards(hand: CamelCard[]) {
  return hand.reduce((card_count: Map<CamelCard, number>, card) => {
    if (!card_count.has(card)) {
      card_count.set(card, 0);
    }
    card_count.set(card, card_count.get(card)! + 1);
    return card_count;
  }, new Map<CamelCard, number>());
}

function findCardCountsOf(cards_count: Map<CamelCard, number>, card_count: number): number {
  return [...cards_count.values()].filter((count) => count === card_count).length;
}

function hasFiveOfAKind(hand: CamelCard[]) {
  const cards_count = countCards(hand);
  return findCardCountsOf(cards_count, 5) === 1;
}
function hasFourOfAKind(hand: CamelCard[]) {
  const cards_count = countCards(hand);
  return findCardCountsOf(cards_count, 4) === 1;
}
function hasFullHouse(hand: CamelCard[]) {
  const cards_count = countCards(hand);
  return findCardCountsOf(cards_count, 3) === 1 && findCardCountsOf(cards_count, 2) === 1;
}
function hasThreeOfAKind(hand: CamelCard[]) {
  const cards_count = countCards(hand);
  return findCardCountsOf(cards_count, 3) === 1 && findCardCountsOf(cards_count, 1) === 2;
}
function hasTwoPair(hand: CamelCard[]) {
  const cards_count = countCards(hand);
  return findCardCountsOf(cards_count, 2) === 2 && findCardCountsOf(cards_count, 1) === 1;
}
function hasOnePair(hand: CamelCard[]) {
  const cards_count = countCards(hand);
  return findCardCountsOf(cards_count, 2) === 1 && findCardCountsOf(cards_count, 1) === 3;
}
function hasHighCard(hand: CamelCard[]) {
  const cards_count = countCards(hand);
  return findCardCountsOf(cards_count, 1) === 5;
}
