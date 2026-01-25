import { SetCard, Card } from "../../Games/types/Card";
import { Player } from "../../Player";


export class Bot extends Player {
    public deck: SetCard;

    constructor(name: string, deck: SetCard) {
        super(`bot-${Math.floor(Math.random() * 10000)}`, name, true);
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