import { categorizeHand, compareHands, getCardRank, HandCategory } from '../camel-card';
import { CamelPokerPlayer } from '../solver';

describe('camel-card', () => {
  describe('compareHands', () => {
    describe('two two pair hands', () => {
      it('should result with highest card winning', () => {
        const res = compareHands(new CamelPokerPlayer('KK677 28'), new CamelPokerPlayer('KTJJT 220'));
        expect(res > 0).toBe(true);
      });
      it('should result with highest card winning no matter of order', () => {
        const res = compareHands(new CamelPokerPlayer('KTJJT 220'), new CamelPokerPlayer('KK677 28'));
        expect(res > 0).toBe(false);
      });
    });
  });
  describe('getCardRank', () => {
    describe('Ace', () => {
      it('return a rank 14', () => {
        expect(getCardRank('A')).toBe(14);
      });
    });
    describe('number 2', () => {
      it('return rank 2', () => {
        expect(getCardRank('2')).toBe(2);
      });
    });
  });
  describe('categorizeHand', () => {
    describe('having five of a kind', () => {
      it('should return five of a kind', () => {
        expect(categorizeHand(['A', 'A', 'A', 'A', 'A'])).toBe<HandCategory>('FIVE-OF-A-KIND');
      });
    });
    describe('a four of a kind', () => {
      it('should return four of a kind', () => {
        expect(categorizeHand(['2', 'A', 'A', 'A', 'A'])).toBe<HandCategory>('FOUR-OF-A-KIND');
      });
    });
    describe('a full house', () => {
      it('should return full house', () => {
        expect(categorizeHand(['2', 'A', '2', 'A', 'A'])).toBe<HandCategory>('FULL-HOUSE');
      });
    });
    describe('three of a kind', () => {
      it('should return three of a kind', () => {
        expect(categorizeHand(['2', 'A', '3', 'A', 'A'])).toBe<HandCategory>('THREE-OF-A-KIND');
      });
    });
    describe('two pairs', () => {
      it('should return two pair', () => {
        expect(categorizeHand(['2', 'A', '3', '3', 'A'])).toBe<HandCategory>('TWO-PAIR');
      });
    });
    describe('one pair', () => {
      it('should return two pair', () => {
        expect(categorizeHand(['2', 'A', '3', '3', '9'])).toBe<HandCategory>('ONE-PAIR');
      });
    });
    describe('a high card', () => {
      it('should return two pair', () => {
        expect(categorizeHand(['2', 'A', '3', 'K', '9'])).toBe<HandCategory>('HIGH-CARD');
      });
    });
  });
});
