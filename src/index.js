const readline = require('readline');
const ctrl = require('./ctrl')
const ctrlIn = new ctrl();

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
    ctrlIn.move(keyMap[key]);
})

rl.on('close', () => {
    ctrlIn.gameover();
    process.exit(0);
})

ctrlIn.start();

