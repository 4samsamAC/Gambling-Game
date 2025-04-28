export enum Suit {
    HEARTS = 'HEARTS',
    DIAMONDS = 'DIAMONDS',
    CLUBS = 'CLUBS',
    SPADES = 'SPADES'
}

export enum Rank {
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    TEN = '10',
    JACK = 'JACK',
    QUEEN = 'QUEEN',
    KING = 'KING',
    ACE = 'ACE'
}

export interface Card {
    suit: Suit;
    rank: Rank;
    value: number; // Valeur numérique pour les calculs (As = 1 ou 11)
    isFaceUp: boolean; // Pour gérer l'état de la carte (face visible/cachée)
}

// Fonction utilitaire pour obtenir la valeur numérique d'une carte
export function getCardValue(card: Card): number {
    switch (card.rank) {
        case Rank.ACE:
            return 11; // Ou 1 selon le contexte du jeu
        case Rank.KING:
        case Rank.QUEEN:
        case Rank.JACK:
            return 10;
        default:
            return parseInt(card.rank);
    }
}

export function createSetCard(cards: Card[] = [], suit: Suit[] = [], rank: Rank[] = [], isFaceUp: boolean = false): Card[] {
    const newCards: Card[] = [];
    
    // Parcourir toutes les combinaisons possibles de cartes
    Object.values(Suit).forEach((suitValue: Suit) => {
        Object.values(Rank).forEach((rankValue: Rank) => {
            // Vérifier si cette carte doit être exclue
            const shouldExclude = 
                suit.includes(suitValue) || 
                rank.includes(rankValue) ||
                cards.some(existingCard => 
                    existingCard.suit === suitValue && 
                    existingCard.rank === rankValue
                );

            if (!shouldExclude) {
                const card: Card = {
                    suit: suitValue,
                    rank: rankValue,
                    value: parseInt(rankValue),
                    isFaceUp: isFaceUp,
                };
                newCards.push(card);
            }
        });
    });

    return newCards;
}