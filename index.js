const inquirer = require("@inquirer/prompts");
const fs = require("fs");
const {
    GameHandler,
    BlackJackGame
} = require('./Games');
const {
    Player
} = require('./Player');

const gameHandler = new GameHandler();

gameHandler.addGame(new BlackJackGame());

console.log('Jeux disponibles :', gameHandler.listGames().map(game => game.name));

const blackjack = gameHandler.getGame('blackjack');
if (blackjack) {
    blackjack.addPlayer(new Player(1, 'P1'));
    blackjack.startGame();
}