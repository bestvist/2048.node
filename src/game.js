const Table = require('cli-table');
const chalk = require('chalk');
const Grid = require('./grid');

class Game {
    constructor() {
        this.score = 0;
        this.hasChange = false;
    }

    start() {
        this.grid = new Grid();
        this.generateRandom();
        this.generateRandom();
        this.action();
    }

    drawGrid() {
        this.grid.drawCells();
    }

    move(direction) {
        switch (direction) {
            case 'up':
                this.rangeTilesUp();
                break;
            case 'down':
                this.rangeTilesDown();
                break;
            case 'left':
                this.rangeTilesLeft();
                break;
            case 'right':
                this.rangeTilesRight();
                break;
            default:
                break;
        }
    }

    rangeTilesUp() {
        const cells = this.grid.cells;
        const size = this.grid.size;
        for (let y = 0; y < size; y++) {
            let cellCol = [];
            for (let x = 0; x < size; x++) {
                cellCol.push(cells[x][y]);
            }
            cellCol = this.rangeRowValue(cellCol);
            for (let x = 0; x < size; x++) {
                cells[x][y] = cellCol[x];
            }
        }

        this.action();
    }
    rangeTilesDown() {
        const cells = this.grid.cells;
        const size = this.grid.size;
        for (let y = 0; y < size; y++) {
            let cellCol = [];
            for (let x = 0; x < size; x++) {
                cellCol.push(cells[x][y]);
            }
            cellCol = this.rangeRowValue(cellCol.reverse()).reverse();
            for (let x = 0; x < size; x++) {
                cells[x][y] = cellCol[x];
            }
        }
        this.action();
    }
    rangeTilesLeft() {
        const cells = this.grid.cells,
            size = this.grid.size;
        for (let x = 0; x < size; x++) {
            cells[x] = this.rangeRowValue(cells[x]);
        }
        this.action();
    }
    rangeTilesRight() {
        const cells = this.grid.cells,
            size = this.grid.size;
        for (let x = 0; x < size; x++) {
            cells[x] = this.rangeRowValue(cells[x].reverse()).reverse();
        }
        this.action();
    }

    drawLogo() {
        const f2048 = `                                                                                                                                                      
___ ___ ___ ___    _____ _____ ____  _____ 
|_  |   | | | . |  |   | |     |    \|   __|
|  _| | |_  | . |  | | | |  |  |  |  |   __|
|___|___| |_|___|  |_|___|_____|____/|_____|
                                        `
        console.log(chalk.cyan(f2048))
    }

    drawBoard() {
        const board = [
            ['Score', this.score]
        ]
        const table = new Table({
            chars: {
                'mid': '',
                'left-mid': '',
                'mid-mid': '',
                'right-mid': ''
            },
            colWidths: [21, 21]
        });
        table.push(...board);
        console.log(table.toString() + '\n');
    }

    drawTip() {
        const tip = `W or ↑ => Up\nA or ← => Left\nS or ↓ => Down\nD or → => Right\nPlease enter key.\n`;
        console.log(tip)
    }

    generateRandom() {
        let cells = this.grid.availableCell();
        if (cells.length) {
            let randomCell = cells[Math.floor(Math.random() * cells.length)];
            let value = this.randomValue();
            this.grid.setCellValue(randomCell.x, randomCell.y, value);
        }
    }

    randomValue() {
        return Math.random() < 0.9 ? 2 : 4;
    }

    rangeRowValue(arr = []) {
        let next;
        for (let i = 0; i < arr.length; i++) {
            next = arr.findIndex((c, m) => {
                return m > i && c !== "";
            })
            if (next !== -1) {
                if (arr[i] === "") {
                    arr[i] = arr[next];
                    arr[next] = "";
                    i -= 1;
                    this.hasChange = true;
                } else if (arr[i] === arr[next]) {
                    arr[i] = arr[i] * 2;
                    arr[next] = "";
                    this.setScore(arr[i]);
                    this.hasChange = true;
                }
            }
        }
        return arr;
    }

    action() {
        if (this.hasChange) {
            this.generateRandom();
            this.hasChange = false;
            if (this.checkOver()) this.lose();
        }
        this.drawLogo();
        this.drawBoard();
        this.drawGrid();
        this.drawTip();
    }

    setScore(score) {
        this.score += score;
        if (score === 2048) {
            this.won();
        }
    }

    checkOver() {
        const cells = this.grid.cells;
        const size = this.grid.size;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (cells[x][y] === "") {
                    return false;
                } else if (cells[x][y - 1] && cells[x][y - 1] === cells[x][y]) {
                    return false;
                } else if (cells[x - 1][y] && cells[x - 1][y] === cells[x][y]) {
                    return false;
                }
            }
        }
        return true;
    }

    won() {
        const str = `CONGRATULATION! YOU WIN!\n`;
        console.log(chalk.yellow(str));
        this.stop();
    }

    lose() {
        const str = `GAME OVER!\n`;
        console.log(chalk.green(str));
        this.stop();
    }

    stop() {
        const str = `Have a good time!\n`;
        console.log(chalk.cyan(str));
    }

}

module.exports = Game;