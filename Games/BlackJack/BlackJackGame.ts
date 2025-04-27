import { Game } from '../types/Game';
import { Player } from '../../Player/types/Players';

export class BlackJackGame implements Game {
    public readonly id: string = 'blackjack';
    public readonly name: string = 'Blackjack';
    public readonly description: string = "Un jeu de cartes classique où le but est d'obtenir 21 points";
    public readonly minPlayers: number = 1;
    public readonly maxPlayers: number = 7;
    
    private players: Set<Player> = new Set();
    private isGameActive: boolean = false;

    public startGame(): void {
        if (this.players.size < this.minPlayers) {
            throw new Error(`Il faut au moins ${this.minPlayers} joueurs pour commencer`);
        }
        this.isGameActive = true;
        console.log('La partie de Blackjack commence !');
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

    public cycleTurn(): void {
        if (!this.isGameActive) {
            throw new Error("La partie n'est pas active");
        }
        console.log("C'est le tour du joueur");

    }
} 