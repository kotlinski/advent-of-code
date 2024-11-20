import { CamelPokerPlayer } from '../../../solver.js';
import { SimpleRules } from '../simple-rules.js';
import { before, describe, it } from 'node:test';
import { expect } from 'expect';

describe('camel-card', () => {
  let rules: SimpleRules;
  before(() => {
    rules = new SimpleRules();
  });
  describe('compareHands', () => {
    describe('two two pair hands', () => {
      let player_a: CamelPokerPlayer;
      let player_b: CamelPokerPlayer;
      before(() => {
        player_a = new CamelPokerPlayer('KK677 28', rules);
        player_b = new CamelPokerPlayer('KTJJT 220', rules);
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
        expect(rules.getCardRank('J')).toBe(11);
      });
    });
    describe('number 2', () => {
      it('return rank 2', () => {
        expect(rules.getCardRank('2')).toBe(2);
      });
    });
  });
});
