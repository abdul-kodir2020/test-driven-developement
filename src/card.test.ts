import { Card } from "./card";


describe('Card', () => {
  it('should store a rank and a suit', () => {
    const card = new Card('A', 'H');
    expect(card.rank).toBe('A');
    expect(card.suit).toBe('H');
  });
});