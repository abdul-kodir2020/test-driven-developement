import { Card } from './card';
import { HandCategory } from './hand-category';

export class Hand {
  constructor(public cards: Card[]) {
    this.cards.sort((a, b) => b.getValue() - a.getValue());
  }

  private getCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.cards.forEach(c => counts[c.rank] = (counts[c.rank] || 0) + 1);
    return counts;
  }

  public getCategory(): HandCategory {
    const counts = Object.values(this.getCounts());

    if (counts.includes(4)) return HandCategory.FourOfAKind;
    if (counts.includes(3) && counts.includes(2)) return HandCategory.FullHouse;
    if (counts.includes(3)) return HandCategory.ThreeOfAKind;
    
    const pairs = counts.filter(c => c === 2).length;
    if (pairs === 2) return HandCategory.TwoPair;
    if (pairs === 1) return HandCategory.Pair;

    return HandCategory.HighCard;
  }
}