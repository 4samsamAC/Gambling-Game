import { Player } from '../../Player/types/Players';

export interface Game {
    id: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    startGame(): void;
    endGame(): void;
    addPlayer(player: Player): void;
    removePlayer(player: Player): void;
    cycleTurn(): void;
} 
