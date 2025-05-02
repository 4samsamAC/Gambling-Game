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

export class Card {
    constructor(
        public suit: Suit,
        public rank: Rank,
        public value: number,
        public isFaceUp: boolean = false
    ) {
        this.suit = suit;
        this.rank = rank;
        this.value = this.getCardValue();
        this.isFaceUp = isFaceUp;
    }
    public getCardValue(): number {
        switch (this.rank) {
            case Rank.ACE:
                return 11;
            case Rank.KING:
            case Rank.QUEEN:
            case Rank.JACK:
                return 10;
            default:
                return parseInt(this.rank);
        }
    }
}
export class SetCard {
    public deck: Card[] = [];
    constructor(
        public cards: Card[] = [],
        public suit: Suit[] = [],
        public rank: Rank[] = [],
        public isFaceUp: boolean = false,
        public joker: boolean = false
    ) {
        this.cards = cards;
        this.suit = suit;
        this.rank = rank;
        this.isFaceUp = isFaceUp;
        this.joker = joker;
     
        Object.values(Suit).forEach((suitValue: Suit) => {
            Object.values(Rank).forEach((rankValue: Rank) => {
                const shouldExclude = 
                    suit.includes(suitValue) || 
                    rank.includes(rankValue) ||
                    cards.some(existingCard => 
                        existingCard.suit === suitValue && 
                        existingCard.rank === rankValue
                    );

                if (!shouldExclude) {
                    const card = new Card(suitValue, rankValue, parseInt(rankValue), isFaceUp);
                    this.deck.push(card);
                }
            });
        });
    }
}

// export function createSetCard(cards: Card[] = [], suit: Suit[] = [], rank: Rank[] = [], isFaceUp: boolean = false): Card[] {
    

//     return newCards;
// }