const inquirer = require("@inquirer/prompts");
const fs = require("fs");
const {
    GameHandler,
    BlackJackGame
} = require('./Games');

const gameHandler = new GameHandler();

gameHandler.addGame(new BlackJackGame());

console.log('Jeux disponibles :', gameHandler.listGames().map(game => game.name));

const blackjack = gameHandler.getGame('blackjack');
if (blackjack) {
    blackjack.addPlayer(new Player('P1'));
    blackjack.startGame();
}