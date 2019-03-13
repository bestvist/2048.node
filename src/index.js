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
    output: process.stdout,
    prompt: 'Please enter key move\n'
})

rl.prompt();

rl.input.on('keypress', (key) => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    ctrlIn.move(keyMap[key]);
})

rl.on('close', () => {
    console.log('Have a good time ^.^\n');
    process.exit(0);
})

ctrlIn.start();

