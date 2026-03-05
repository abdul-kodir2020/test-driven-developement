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

  it('should detect Flush', () => {
    const cards = [new Card('2', 'H'), new Card('5', 'H'), new Card('7', 'H'), new Card('J', 'H'), new Card('K', 'H')];
    expect(new Hand(cards).getCategory()).toBe(HandCategory.Flush);
  });

  it('should detect Straight', () => {
    const cards = [new Card('5', 'H'), new Card('6', 'D'), new Card('7', 'S'), new Card('8', 'C'), new Card('9', 'H')];
    expect(new Hand(cards).getCategory()).toBe(HandCategory.Straight);
  });

  it('should detect Ace-Low Straight (A-2-3-4-5)', () => {
    const cards = [new Card('A', 'H'), new Card('2', 'D'), new Card('3', 'S'), new Card('4', 'C'), new Card('5', 'H')];
    expect(new Hand(cards).getCategory()).toBe(HandCategory.Straight);
  });

  it('should win with a higher pair than opponent', () => {
  const handA = new Hand([new Card('A', 'H'), new Card('A', 'D'), new Card('10', 'S'), new Card('5', 'C'), new Card('2', 'H')]); // Paire d'As
  const handB = new Hand([new Card('K', 'H'), new Card('K', 'D'), new Card('Q', 'S'), new Card('J', 'C'), new Card('9', 'H')]); // Paire de Rois

  expect(handA.compareTo(handB)).toBeGreaterThan(0); // A > B
});
});