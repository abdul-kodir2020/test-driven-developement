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

  getCategory(): HandCategory {
    return HandCategory.HighCard;
  }
}