import { Card } from './card';
import { Hand } from './hand';
import { PokerSolver } from './solver';
import { HandCategory } from './hand-category';

interface PlayerFinalResult {
  name: string;
  category: string;
  chosen5: string[];
}

export class PokerGame {
  private players: { name: string, holeCards: Card[] }[] = [];

  constructor(private board: Card[]) {}

  addPlayer(name: string, holeCards: Card[]) {
    this.players.push({ name, holeCards });
  }

  /**
   * Logique interne pour trouver les mains gagnantes
   */
  private calculateWinners() {
    const results = this.players.map(p => ({
      name: p.name,
      bestHand: PokerSolver.selectBestHand(p.holeCards, this.board)
    }));

    results.sort((a, b) => b.bestHand.compareTo(a.bestHand));

    const winners = results.filter(r => 
      r.bestHand.compareTo(results[0].bestHand) === 0
    );

    return winners;
  }

  /**
   * Retourne le résultat final au format demandé par le sujet
   */
  getWinners(): PlayerFinalResult[] {
    const winningPlayers = this.calculateWinners();

    return winningPlayers.map(w => ({
      name: w.name,
      category: HandCategory[w.bestHand.getCategory()], // Transforme l'Enum en string (ex: "Straight")
      chosen5: w.bestHand.cards.map(c => `${c.rank}${c.suit}`) // Ex: "5C"
    }));
  }
}