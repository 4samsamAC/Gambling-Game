import { Game } from './types/Game';

export class GameHandler {
    private games: Map<string, Game>;

    constructor() {
        this.games = new Map();
    }

    /**
     * Ajoute un nouveau jeu au gestionnaire
     * @param game Le jeu à ajouter
     */
    public addGame(game: Game): void {
        if (this.games.has(game.id)) {
            throw new Error(`Un jeu avec l'ID ${game.id} existe déjà`);
        }
        this.games.set(game.id, game);
    }

    /**
     * Récupère un jeu par son ID
     * @param gameId L'ID du jeu
     * @returns Le jeu correspondant ou undefined si non trouvé
     */
    public getGame(gameId: string): Game | undefined {
        return this.games.get(gameId);
    }

    /**
     * Liste tous les jeux disponibles
     * @returns Un tableau contenant tous les jeux
     */
    public listGames(): Game[] {
        return Array.from(this.games.values());
    }

    /**
     * Supprime un jeu du gestionnaire
     * @param gameId L'ID du jeu à supprimer
     */
    public removeGame(gameId: string): void {
        this.games.delete(gameId);
    }
} 