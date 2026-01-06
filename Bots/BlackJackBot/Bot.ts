import { SetCard, Card } from "../../Games/types/Card";

export interface Bot {
    name: string;
    deck: SetCard;
}

export class Bot {
    public name: string;
    public deck: SetCard;

    constructor(name: string, deck: SetCard) {
        this.name = name;
        this.deck = deck;
    }

    public async play(): Promise<void> {
        const cards = this.deck.drawCard();
        const nonNullCards = cards.filter((card): card is Card => card !== null);
        console.log(`${this.name} a tiré les cartes : ${nonNullCards.map(card => `${card.rank} de ${card.suit}`).join(', ')}`);
        const points = nonNullCards.reduce((acc, card) => acc + card.value, 0);
        console.log(`${this.name} a ${points} points`);
        if (points > 21) {
            console.log(`${this.name} a perdu`);
            return;
        }
        return;
    }
}