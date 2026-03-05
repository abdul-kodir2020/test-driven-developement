import { Card } from '../src/card';
import { Hand } from '../src/hand';
import { HandCategory } from '../src/hand-category';

describe('Hand', () => {
  it('should detect High Card', () => {
    const cards = [
      new Card('A', 'H'), new Card('K', 'D'),
      new Card('7', 'S'), new Card('5', 'C'), new Card('2', 'H')
    ];
    const hand = new Hand(cards);
    expect(hand.getCategory()).toBe(HandCategory.HighCard);
  });

  it('should detect Pair', () => {
    const cards = [new Card('A', 'H'), new Card('A', 'D'), new Card('7', 'S'), new Card('5', 'C'), new Card('2', 'H')];
    expect(new Hand(cards).getCategory()).toBe(HandCategory.Pair);
  });

  it('should detect Four of a Kind', () => {
    const cards = [new Card('Q', 'H'), new Card('Q', 'D'), new Card('Q', 'S'), new Card('Q', 'C'), new Card('2', 'H')];
    expect(new Hand(cards).getCategory()).toBe(HandCategory.FourOfAKind);
  });
});