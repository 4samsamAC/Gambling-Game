import { Game } from '../types/Game';
import { Player } from '../../Player/types/Players';
import { Card, SetCard } from '../types/Card';
import { select } from '@inquirer/prompts';
import { Bot } from '../../Bots/BlackJackBot/Bot';

export class BlackJackGame implements Game { 
    public readonly id: string = 'blackjack';
    public readonly name: string = 'Blackjack';
    public readonly description: string = "A classic card game where the goal is to obtain 21 points";
    public readonly minPlayers: number = 2;
    public readonly maxPlayers: number = 7;
    
    private players: Array<Player|Bot> = new Array();
    private isGameActive: boolean = false;
    private deck: SetCard = new SetCard();
    private turn: number = 0;
    private playerTurn: Player|Bot = this.players[this.turn] as Player|Bot;

    // game management

    public async startGame(): Promise<void> {
        if (this.players.length < this.minPlayers) {
            console.log(`At least ${this.minPlayers} players are needed to start the game`);
            try {
                const answer = await select({
                    message: `Would you like to add  ${this.minPlayers - this.players.length} bot ?`,
                    choices: [
                        { name: 'Yes', value: 'yes' },
                        { name: 'No', value: 'no' }
                    ]
                });
                if (answer === 'yes') {
                    const bot: Player|Bot = new Bot('Bot', this.deck) as Player|Bot;
                    this.addPlayer(bot);
                }
                if (answer === 'no') {
                    console.log('The game of Blackjack can\'t start');
                    return;
                }
            } catch (error) {
                console.error('Error when getting input :', error);
            }
        }
        console.log('Players in the games :');
        this.players.forEach(player => {
            console.log(`- ${player.name}`);
        });
        this.isGameActive = true;
        console.log('The game of Blackjack begins!');
        this.deck.shuffleDeck();
        this.turn = -1;
        this.cycleTurn();
    }

    public endGame(): void {
        this.isGameActive = false;
        console.log('The Blackjack game is over');
    }

    public addPlayer(player: Player|Bot): void {
        if (this.players.length >= this.maxPlayers) throw new Error('The maximum number of players has been reached');
        
        this.players.push(player);
        console.log(`Player ${player.name} has joined the game`);
    }

    public removePlayer(player: Player|Bot): void {
        this.players.find(pl => pl == player);
        console.log(`Player ${player.name} has left the game`);
    }

    // games actions 

    hit() {
        const cards = this.deck.drawCard(1);
        if (!cards || cards.length === 0) {
            throw new Error('Unable to draw cards');
        }
        const nonNullCards = cards.filter((card): card is Card => card !== null);
        console.log(`Player ${this.playerTurn.name} drew the cards: ${nonNullCards.map(card => `${card.rank} of ${card.suit}`).join(', ')}`);
        this.playerTurn.addToHand(nonNullCards[0] as unknown as Card);
        const points = this.playerTurn.hand.reduce((acc, card) => acc + card.value, 0);
        console.log(`Player ${this.playerTurn.name} has ${points} points`);
        if (points > 21) {
            console.log(`Player ${this.playerTurn.name} has lost`);
            this.endGame();
            return;
        }
        this.cycleTurn();
    }
    stand() {
        
    }
    double() {
        throw new Error('Method not implemented.');
    }
    split() {
        throw new Error('Method not implemented.');
    }
    fold() {
        throw new Error('Method not implemented.');
    }

    // game loop

    public async cycleTurn(): Promise<void> {
        if (!this.isGameActive) throw new Error("The game is not active");

        this.turn = (this.turn + 1) % this.players.length;
        this.playerTurn = this.players[this.turn] as Player|Bot;
        console.log(`It's player ${this.playerTurn.name}'s turn`);
        const cards = this.deck.drawCard(2);
        if (!cards || cards.length === 0) throw new Error('Unable to draw cards');

        const nonNullCards = cards.filter((card): card is Card => card !== null);
        console.log(`Player ${this.playerTurn.name} drew the cards: ${nonNullCards.map(card => `${card.rank} of ${card.suit}`).join(', ')}`);
        const points = nonNullCards.reduce((acc, card) => acc + card.value, 0);
        this.playerTurn.addToHand(nonNullCards[0] as unknown as Card);
        this.playerTurn.addToHand(nonNullCards[1] as unknown as Card);
        console.log(`Player ${this.playerTurn.name} has ${points} points`);
        if (points > 21) {
            console.log(`Player ${this.playerTurn.name} has lost`);
            this.endGame();
            return;
        }
        else if (points == 21) {
            console.log(`Player ${this.playerTurn.name} won with a Blackjack!`);
            this.endGame();
            return;
        }
        if (this.playerTurn.isBot) {
            await (this.playerTurn as Bot).play();
            this.cycleTurn();
        } else try {
            const answer = await select({
                message: 'What do you want to do?',
                choices: [
                    { name: 'Draw', value: 'hit' },
                    { name: 'Stay', value: 'stand' },
                    { name: 'Double', value: 'double' },
                    { name: 'Split', value: 'split' },
                    { name: 'Fold', value: 'fold' }
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
                case 'slpit':
                    this.split();
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