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

  private isFlush(): boolean {
    return new Set(this.cards.map(c => c.suit)).size === 1;
  }

  private isStraight(): boolean {
    const values = this.cards.map(c => c.getValue());
    
    if (values.includes(14) && values.includes(2) && values.includes(3) && values.includes(4) && values.includes(5)) {
      return true;
    }

    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] !== values[i + 1] + 1) return false;
    }
    return true;
  }

  public getCategory(): HandCategory {
    const counts = Object.values(this.getCounts());

    const flush = this.isFlush();
    const straight = this.isStraight();

    if (straight && flush) return HandCategory.StraightFlush;

    if (counts.includes(4)) return HandCategory.FourOfAKind;
    if (counts.includes(3) && counts.includes(2)) return HandCategory.FullHouse;
    if (counts.includes(3)) return HandCategory.ThreeOfAKind;

    if (flush) return HandCategory.Flush;
    if (straight) return HandCategory.Straight;
    
    const pairs = counts.filter(c => c === 2).length;
    if (pairs === 2) return HandCategory.TwoPair;
    if (pairs === 1) return HandCategory.Pair;

    return HandCategory.HighCard;
  }
}