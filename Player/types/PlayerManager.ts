import { Player } from './Players';

export class PlayerManager {
    private players: Player[] = [];

    public addPlayer(player: Player): void {
        this.players.push(player);
    }

    public removePlayer(playerId: string): void {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    public getPlayer(playerId: string): Player | undefined {
        return this.players.find(player => player.id === playerId);
    }

    public getAllPlayers(): Player[] {
        return this.players;
    }
}