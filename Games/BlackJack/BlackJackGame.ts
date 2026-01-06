import { Game } from '../types/Game';
import { Player } from '../../Player/types/Players';
import { Card, SetCard } from '../types/Card';
import { select } from '@inquirer/prompts';
import { Bot } from '../../Bots/BlackJackBot/Bot';

export class BlackJackGame implements Game { 
    public readonly id: string = 'blackjack';
    public readonly name: string = 'Blackjack';
    public readonly description: string = "Un jeu de cartes classique où le but est d'obtenir 21 points";
    public readonly minPlayers: number = 2;
    public readonly maxPlayers: number = 7;
    
    private players: Set<Player> = new Set();
    private isGameActive: boolean = false;
    private deck: SetCard = new SetCard();
    private turn: number = 0;
    private playerTurn: Player = this.players.values().next().value as Player;

    public async startGame(): Promise<void> {
        if (this.players.size < this.minPlayers) {
            console.log(`Il faut au moins ${this.minPlayers} joueurs pour commencer`);
            try {
                const answer = await select({
                    message: `Voulez-vous ajouter ${this.minPlayers - this.players.size} bot ?`,
                    choices: [
                        { name: 'Oui', value: 'yes' },
                        { name: 'Non', value: 'no' }
                    ]
                });
                if (answer === 'yes') {
                    const bot: Player = new Bot('Bot', this.deck) as unknown as Player;
                    this.addPlayer(bot);
                }
                if (answer === 'no') {
                    console.log('La partie de Blackjack ne peut pas commencer');
                    return;
                }
            } catch (error) {
                console.error('Erreur lors de la saisie :', error);
            }
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
        this.deck.shuffleDeck();
        const cards = this.deck.drawCard(1);
        if (!cards || cards.length === 0) {
            throw new Error('Impossible de tirer des cartes');
        }
        const nonNullCards = cards.filter((card): card is Card => card !== null);
        console.log(`Le joueur ${this.playerTurn.name} a tiré les cartes : ${nonNullCards.map(card => `${card.rank} de ${card.suit}`).join(', ')}`);
        this.playerTurn.addToHand(nonNullCards[0] as unknown as Card);
        const points = this.playerTurn.hand.reduce((acc, card) => acc + card.value, 0);
        console.log(`Le joueur ${this.playerTurn.name} a ${points} points`);
        if (points > 21) {
            console.log(`Le joueur ${this.playerTurn.name} a perdu`);
            this.endGame();
            return;
        }
        this.cycleTurn();
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
        this.playerTurn = this.players.values().next().value as Player;
        console.log(`C'est au tour du joueur ${this.playerTurn.name}`);
        this.deck.shuffleDeck();
        const cards = this.deck.drawCard(2);
        if (!cards || cards.length === 0) {
            throw new Error('Impossible de tirer des cartes');
        }
        const nonNullCards = cards.filter((card): card is Card => card !== null);
        console.log(`Le joueur ${this.playerTurn.name} a tiré les cartes : ${nonNullCards.map(card => `${card.rank} de ${card.suit}`).join(', ')}`);
        const points = nonNullCards.reduce((acc, card) => acc + card.value, 0);
        this.playerTurn.addToHand(nonNullCards[0] as unknown as Card);
        this.playerTurn.addToHand(nonNullCards[1] as unknown as Card);
        console.log(`Le joueur ${this.playerTurn.name} a ${points} points`);
        if (points > 21) {
            console.log(`Le joueur ${this.playerTurn.name} a perdu`);
            this.endGame();
            return;
        }
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