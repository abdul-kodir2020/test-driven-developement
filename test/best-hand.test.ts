import { Card } from "../src/card";
import { HandCategory } from "../src/hand-category";
import { PokerSolver } from "../src/solver";


describe('Best Hand Selection', () => {
  it('should select the best 5-card hand out of 7', () => {
    const board = [
      new Card('2', 'H'), new Card('3', 'H'), new Card('4', 'H'), 
      new Card('10', 'S'), new Card('J', 'D')
    ];
    const holeCards = [new Card('8', 'H'), new Card('9', 'H')]; // Flush possible
    const bestHand = PokerSolver.selectBestHand(holeCards, board);

    expect(bestHand.getCategory()).toBe(HandCategory.Flush);
  });
});