#!/usr/bin/env node

const readline = require('readline');
const Game = require('./game')
const game = new Game();

const keyMap = {
    '77': 'up',
    '61': 'left',
    '73': 'down',
    '64': 'right',
    '1b5b41': 'up',
    '1b5b44': 'left',
    '1b5b42': 'down',
    '1b5b43': 'right',
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.prompt();

rl.input.on('data', (chunk) => {
    const direction = keyMap[chunk.toString('hex')];
    if (direction) {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        game.move(direction);
    }
})

rl.on('close', () => {
    game.stop();
})

game.start();