import { CamelPokerPlayer } from '../../../solver.js';
import { InterestingRules } from '../interesting-rules.js';
import { before, describe, it } from 'node:test';
import { expect } from 'expect';

describe('camel-card', () => {
  let rules: InterestingRules;
  before(() => {
    rules = new InterestingRules();
  });
  describe('compareHands', () => {
    describe('two two pair hands', () => {
      let player_a: CamelPokerPlayer;
      let player_b: CamelPokerPlayer;
      before(() => {
        player_a = new CamelPokerPlayer('QQQQ2 684', rules);
        player_b = new CamelPokerPlayer('JKKK2 483', rules);
      });
      it('should result with highest card winning', () => {
        expect([player_a, player_b].sort(rules.getPlayersComperator())).toEqual([player_b, player_a]);
      });
      it('should result with highest card winning no matter of order', () => {
        expect([player_b, player_a].sort(rules.getPlayersComperator())).toEqual([player_b, player_a]);
      });
    });
  });
  describe('getCardRank', () => {
    describe('Ace', () => {
      it('return a rank 14', () => {
        expect(rules.getCardRank('J')).toBe(1);
      });
    });
    describe('number 2', () => {
      it('return rank 2', () => {
        expect(rules.getCardRank('2')).toBe(2);
      });
    });
  });
  describe('hasTwoPair', () => {
    describe('valid two pairs', () => {
      it('return should return true', () => {
        expect(rules.hasTwoPair(new CamelPokerPlayer('KK677', rules).hand)).toBe(true);
        expect(rules.hasTwoPair(new CamelPokerPlayer('KK6J7', rules).hand)).toBe(true);
      });
    });
  });
  describe('hasOnePair', () => {
    describe('valid one pair', () => {
      it('return should return true', () => {
        expect(rules.hasOnePair(new CamelPokerPlayer('32T3K', rules).hand)).toBe(true);
        expect(rules.hasOnePair(new CamelPokerPlayer('32TJK', rules).hand)).toBe(true);
      });
    });
  });
  describe('hasThreeOfAKind', () => {
    describe('valid three of a kind', () => {
      it('return should return true', () => {
        expect(rules.hasThreeOfAKind(new CamelPokerPlayer('3233K', rules).hand)).toBe(true);
        expect(rules.hasThreeOfAKind(new CamelPokerPlayer('323JK', rules).hand)).toBe(true);
        expect(rules.hasThreeOfAKind(new CamelPokerPlayer('32JJK', rules).hand)).toBe(true);
      });
    });
  });
  describe('hasFourOfAKind', () => {
    describe('valid four of a kind', () => {
      it('return should return true', () => {
        expect(rules.hasFourOfAKind(new CamelPokerPlayer('3333K', rules).hand)).toBe(true);
        expect(rules.hasFourOfAKind(new CamelPokerPlayer('333JK', rules).hand)).toBe(true);
        expect(rules.hasFourOfAKind(new CamelPokerPlayer('33JJK', rules).hand)).toBe(true);
        expect(rules.hasFourOfAKind(new CamelPokerPlayer('3JJJK', rules).hand)).toBe(true);
      });
    });
  });
  describe('hasFullHouse', () => {
    describe('valid full house', () => {
      it('return should return true', () => {
        expect(rules.hasFullHouse(new CamelPokerPlayer('333KK', rules).hand)).toBe(true);
        expect(rules.hasFullHouse(new CamelPokerPlayer('33KJK', rules).hand)).toBe(true);
      });
    });
  });
});
