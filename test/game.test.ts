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

  it('should handle split pots when two players have the same hand', () => {
    const board = [
      new Card('A', 'H'), new Card('K', 'S'), new Card('Q', 'D'), 
      new Card('2', 'C'), new Card('3', 'S')
    ];
    // Les deux joueurs ont la même paire d'As avec les mêmes kickers sur le board
    const game = new PokerGame(board);
    game.addPlayer('Alice', [new Card('A', 'D'), new Card('7', 'C')]);
    game.addPlayer('Bob', [new Card('A', 'S'), new Card('7', 'H')]);
    
    const winners = game.getWinners();
    expect(winners.length).toBe(2); // Split !
  });

  it('should detect Ace-low straight (Example A)', () => {
    const board = [new Card('A', 'C'), new Card('2', 'D'), new Card('3', 'H'), new Card('4', 'S'), new Card('9', 'D')];
    const game = new PokerGame(board);
    game.addPlayer('Alice', [new Card('5', 'C'), new Card('K', 'D')]);
    
    const winners = game.getWinners();
    expect(winners[0].category).toBe('Straight');
    expect(winners[0].chosen5).toContain('AC');
  });

  it('should detect Ace-high straight (Example B)', () => {
    const board = [new Card('10', 'C'), new Card('J', 'D'), new Card('Q', 'H'), new Card('K', 'S'), new Card('2', 'D')];
    const game = new PokerGame(board);
    game.addPlayer('Alice', [new Card('A', 'C'), new Card('3', 'D')]);
    
    const winners = game.getWinners();
    expect(winners[0].category).toBe('Straight');
    expect(winners[0].chosen5).toContain('AC');
  });

  it('should pick the 5 best cards for a Flush (Example C)', () => {
    const board = [new Card('A', 'H'), new Card('J', 'H'), new Card('9', 'H'), new Card('4', 'H'), new Card('2', 'C')];
    const game = new PokerGame(board);
    game.addPlayer('Alice', [new Card('6', 'H'), new Card('K', 'D')]);
    
    const winners = game.getWinners();
    expect(winners[0].category).toBe('Flush');
    expect(winners[0].chosen5).toContain('6H');
    expect(winners[0].chosen5).not.toContain('2C');
  });

  it('should result in a tie when the board is the best hand (Example D)', () => {
    const board = [new Card('5', 'C'), new Card('6', 'D'), new Card('7', 'H'), new Card('8', 'S'), new Card('9', 'D')];
    const game = new PokerGame(board);
    game.addPlayer('Player1', [new Card('A', 'C'), new Card('A', 'D')]);
    game.addPlayer('Player2', [new Card('K', 'C'), new Card('Q', 'D')]);
    
    const winners = game.getWinners();
    expect(winners.length).toBe(2); // Split pot
    expect(winners[0].category).toBe('Straight');
  });

  it('should decide winner by kicker when quads are on board (Example E)', () => {
    const board = [new Card('7', 'C'), new Card('7', 'D'), new Card('7', 'H'), new Card('7', 'S'), new Card('2', 'D')];
    const game = new PokerGame(board);
    game.addPlayer('Alice', [new Card('A', 'C'), new Card('K', 'C')]);
    game.addPlayer('Bob', [new Card('Q', 'C'), new Card('J', 'C')]);
    
    const winners = game.getWinners();
    expect(winners.length).toBe(1);
    expect(winners[0].name).toBe('Alice');
  });

  it('should rank Full House higher than Flush', () => {
    const board = [new Card('2', 'H'), new Card('2', 'D'), new Card('A', 'H'), new Card('K', 'H'), new Card('Q', 'H')];
    const game = new PokerGame(board);
    game.addPlayer('Alice', [new Card('2', 'S'), new Card('A', 'D')]); // Full House (2-2-A) avec As kicker
    game.addPlayer('Bob', [new Card('10', 'H'), new Card('5', 'H')]);   // Flush
    
    const winners = game.getWinners();
    expect(winners[0].name).toBe('Alice');
    expect(winners[0].category).toBe('FullHouse');
  });

  it('should decide between two identical pairs using the 5th card kicker', () => {
    const board = [new Card('10', 'S'), new Card('10', 'D'), new Card('8', 'C'), new Card('8', 'H'), new Card('2', 'D')];
    const game = new PokerGame(board);
    game.addPlayer('Alice', [new Card('A', 'C'), new Card('5', 'S')]); // Deux paires, kicker As
    game.addPlayer('Bob', [new Card('K', 'C'), new Card('Q', 'S')]);   // Deux paires, kicker Roi
    
    const winners = game.getWinners();
    expect(winners[0].name).toBe('Alice');
    expect(winners[0].chosen5).toContain('AC');
  });
});