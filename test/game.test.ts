import { Card } from "../src/card";
import { PokerGame } from "../src/game";

describe('PokerGame', () => {
  it('should identify the winner among two players', () => {
    const board = [
      new Card('2', 'H'), new Card('3', 'S'), new Card('J', 'D'), 
      new Card('Q', 'C'), new Card('K', 'S')
    ];
    const player1 = { name: 'Alice', holeCards: [new Card('A', 'H'), new Card('5', 'D')] }; // A-High Straight possible
    const player2 = { name: 'Bob', holeCards: [new Card('4', 'H'), new Card('7', 'C')] };   // Rien
    
    const game = new PokerGame(board);
    game.addPlayer(player1.name, player1.holeCards);
    game.addPlayer(player2.name, player2.holeCards);
    
    const winners = game.getWinners();
    expect(winners[0].name).toBe('Alice');
  });
});