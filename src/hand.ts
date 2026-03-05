import { Card } from './card';
import { HandCategory } from './hand-category';

export class Hand {
  constructor(public cards: Card[]) {
    // On calcule les fréquences avant de trier
    const counts = this.getCounts();

    // Tri intelligent : Par fréquence d'abord (ex: Brelan avant Paire), puis par valeur faciale
    this.cards.sort((a, b) => {
      const countA = counts[a.rank];
      const countB = counts[b.rank];

      if (countA !== countB) {
        return countB - countA;
      }
      return b.getValue() - a.getValue();
    });
  }

  private getCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.cards.forEach(c => counts[c.rank] = (counts[c.rank] || 0) + 1);
    return counts;
  }

  private isFlush(): boolean {
    return new Set(this.cards.map(c => c.suit)).size === 1;
  }

  private isStraight(): boolean {
    // Pour la quinte, on a besoin des valeurs pures triées sans tenir compte de la fréquence
    const values = this.cards.map(c => c.getValue()).sort((a, b) => b - a);
    
    // Cas spécial As-bas (5-4-3-2-A)
    const isAceLow = values.includes(14) && values.includes(2) && values.includes(3) && values.includes(4) && values.includes(5);
    if (isAceLow) return true;

    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] !== values[i + 1] + 1) return false;
    }
    return true;
  }

  public getCategory(): HandCategory {
    const counts = Object.values(this.getCounts());
    const flush = this.isFlush();
    const straight = this.isStraight();

    if (straight && flush) return HandCategory.StraightFlush;
    if (counts.includes(4)) return HandCategory.FourOfAKind;
    if (counts.includes(3) && counts.includes(2)) return HandCategory.FullHouse;
    if (flush) return HandCategory.Flush;
    if (straight) return HandCategory.Straight;
    if (counts.includes(3)) return HandCategory.ThreeOfAKind;
    
    const pairs = counts.filter(c => c === 2).length;
    if (pairs === 2) return HandCategory.TwoPair;
    if (pairs === 1) return HandCategory.Pair;

    return HandCategory.HighCard;
  }

  public compareTo(other: Hand): number {
    //Comparaison par catégorie
    if (this.getCategory() !== other.getCategory()) {
      return this.getCategory() - other.getCategory();
    }

    // Comparaison carte par carte Grâce au tri par fréquence dans le constructeur : Pour un Brelan on aura les 3 cartes identiques en premier, pour une Paire les 2 cartes identiques seront en premier, etc.
    for (let i = 0; i < this.cards.length; i++) {
      const diff = this.cards[i].getValue() - other.cards[i].getValue();
      if (diff !== 0) return diff;
    }

    return 0;
  }
}