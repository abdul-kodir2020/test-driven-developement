import { Card } from "../src/card";

describe('Card', () => {
  it('should store a rank and a suit', () => {
    const card = new Card('A', 'H');
    expect(card.rank).toBe('A');
    expect(card.suit).toBe('H');
  });

   it('should return the correct numeric value for a rank', () => {
    const ace = new Card('A', 'S');
    const ten = new Card('10', 'D');
    expect(ace.getValue()).toBe(14);
    expect(ten.getValue()).toBe(10);
  });
  
});