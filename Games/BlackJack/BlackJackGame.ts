import { Game } from '../types/Game';
import { Player } from '../../Player/types/Players';
import { Card, SetCard } from '../types/Card';
import { select } from '@inquirer/prompts';

export class BlackJackGame implements Game {
    public readonly id: string = 'blackjack';
    public readonly name: string = 'Blackjack';
    public readonly description: string = "Un jeu de cartes classique où le but est d'obtenir 21 points";
    public readonly minPlayers: number = 1;
    public readonly maxPlayers: number = 7;
    
    private players: Set<Player> = new Set();
    private isGameActive: boolean = false;
    private deck: SetCard = new SetCard();
    private turn: number = 0;

    public startGame(): void {
        if (this.players.size < this.minPlayers) {
            throw new Error(`Il faut au moins ${this.minPlayers} joueurs pour commencer`);
        }
        console.log('Joueurs dans la partie :');
        this.players.forEach(player => {
            console.log(`- ${player.name}`);
        });
        this.isGameActive = true;
        console.log('La partie de Blackjack commence !');
        this.turn = 0;
        this.cycleTurn();
    }

    public endGame(): void {
        this.isGameActive = false;
        console.log('La partie de Blackjack est terminée');
    }

    public addPlayer(player: Player): void {
        if (this.players.size >= this.maxPlayers) {
            throw new Error('Le nombre maximum de joueurs est atteint');
        }
        this.players.add(player);
        console.log(`Le joueur ${player.name} a rejoint la partie`);
    }

    public removePlayer(player: Player): void {
        this.players.delete(player);
        console.log(`Le joueur ${player.name} a quitté la partie`);
    }

    hit() {
        throw new Error('Method not implemented.');
    }
    stand() {
        throw new Error('Method not implemented.');
    }
    double() {
        throw new Error('Method not implemented.');
    }
    fold() {
        throw new Error('Method not implemented.');
    }

    public async cycleTurn(): Promise<void> {
        if (!this.isGameActive) {
            throw new Error("La partie n'est pas active");
        }
        this.turn = (this.turn + 1) % this.players.size;
        console.log(`C'est au tour du joueur ${this.turn}`);
        this.deck.shuffleDeck();
        const cards = this.deck.drawCard(2);
        if (!cards || cards.length === 0) {
            throw new Error('Impossible de tirer des cartes');
        }
        const nonNullCards = cards.filter((card): card is Card => card !== null);
        console.log(`Le joueur ${this.turn} a tiré les cartes : ${nonNullCards.map(card => `${card.rank} de ${card.suit}`).join(', ')}`);
        console.log(`Le joueur ${this.turn} a ${nonNullCards.reduce((acc, card) => acc + card.value, 0)} points`);
        try {
            const answer = await select({
                message: 'Que voulez-vous faire ?',
                choices: [
                    { name: 'Tirer une carte', value: 'hit' },
                    { name: 'Rester', value: 'stand' },
                    { name: 'Doubler', value: 'double' },
                    { name: 'Se coucher', value: 'fold' }
                ]
            });

            switch (answer) {
                case 'hit':
                    this.hit();
                    break;
                case 'stand':
                    this.stand();
                    break;
                case 'double':
                    this.double();
                    break;
                case 'fold':
                    this.fold();
                    break;
                default:
                    console.log('Action non reconnue');
            }
        } catch (error) {
            console.error('Erreur lors de la saisie :', error);
        }
    }
} 