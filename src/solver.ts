import { Card } from './card';
import { Hand } from './hand';
import { getCombinations } from './combinations';

export class PokerSolver {
  static selectBestHand(holeCards: Card[], board: Card[]): Hand {
    const allCards = [...holeCards, ...board];
    
    // Génère les 21 combinaisons de 5 cartes
    const combinations = getCombinations(allCards, 5);
    
    // Transforme chaque combinaison en objet Hand
    const hands = combinations.map(c => new Hand(c));
    
    // Trie les mains : compareTo renvoie un nombre positif si a > b.
    // On trie en ordre décroissant (b vs a) pour avoir la meilleure en index 0.
    hands.sort((a, b) => b.compareTo(a));

    return hands[0];
  }
}