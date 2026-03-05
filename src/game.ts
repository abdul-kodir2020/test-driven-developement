import { Card } from './card';
import { Hand } from './hand';
import { PokerSolver } from './solver';

interface PlayerResult {
  name: string;
  bestHand: Hand;
}

export class PokerGame {
  private players: { name: string, holeCards: Card[] }[] = [];

  constructor(private board: Card[]) {}

  addPlayer(name: string, holeCards: Card[]) {
    this.players.push({ name, holeCards });
  }

  getWinners(): PlayerResult[] {
    // Calculer la meilleure main pour chaque joueur
    const results: PlayerResult[] = this.players.map(p => ({
      name: p.name,
      bestHand: PokerSolver.selectBestHand(p.holeCards, this.board)
    }));

    // Trier les résultats (la meilleure main en premier)
    results.sort((a, b) => b.bestHand.compareTo(a.bestHand));

    // retourner tous ceux qui sont à égalité avec le premier
    return results.filter(r => 
      r.bestHand.compareTo(results[0].bestHand) === 0
    );
  }
}