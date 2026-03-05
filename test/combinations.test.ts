import { Card } from '../src/card';
import { getCombinations } from '../src/combinations';

describe('Combinations', () => {
  it('should generate 21 combinations of 5 cards from 7 cards', () => {
    const cards = [
      new Card('A', 'H'), new Card('K', 'H'), new Card('Q', 'H'),
      new Card('J', 'H'), new Card('10', 'H'), new Card('9', 'H'), new Card('8', 'H')
    ];
    const combinations = getCombinations(cards, 5);
    expect(combinations.length).toBe(21);
    expect(combinations[0].length).toBe(5);
  });
});