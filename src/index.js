#!/usr/bin/env node

const readline = require('readline');
const Game = require('./game')
const game = new Game();

const keyMap = {
    'w': 'up',
    's': 'down',
    'a': 'left',
    'd': 'right'
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.prompt();

rl.input.on('keypress', (key) => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    game.move(keyMap[key]);
})

rl.on('close', () => {
    game.gameover();
})

game.start();