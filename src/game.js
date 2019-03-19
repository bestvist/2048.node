const Table = require("cli-table");
const chalk = require("chalk");
const Grid = require("./grid");

class Game {
    constructor() {
        this.score = 0;
        this.step = 0;
        this.hasChange = false;
        this.isWon = false;
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
            case "up":
                this.rangeTilesUp();
                break;
            case "down":
                this.rangeTilesDown();
                break;
            case "left":
                this.rangeTilesLeft();
                break;
            case "right":
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
        const f2048 = `\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u005f\u005f\u005f\u0020\u0020\u0020\u005f\u005f\u005f\u0020\u0020\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u0020\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u0020\u0020\u0020\u0020\u000a\u0020\u002f\u0020\u0020\u005f\u005f\u005f\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u0020\u005f\u005f\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u005c\u0020\u007c\u005c\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u0020\u005f\u005f\u0020\u0020\u005c\u0020\u0020\u0020\u0020\u0020\u007c\u005c\u0020\u0020\u0020\u005f\u005f\u005f\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u0020\u005f\u005f\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u0020\u005f\u005f\u005f\u0020\u005c\u007c\u005c\u0020\u0020\u005f\u005f\u005f\u0020\u005c\u0020\u0020\u0020\u0020\u0020\u000a\u002f\u005f\u005f\u002f\u007c\u005f\u002f\u0020\u0020\u002f\u005c\u0020\u005c\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u005f\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u005c\u0020\u0020\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u0020\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005f\u007c\u005c\u0020\u005c\u0020\u005c\u0020\u0020\u0020\u005f\u005f\u002f\u007c\u0020\u0020\u0020\u0020\u000a\u007c\u005f\u005f\u007c\u002f\u002f\u0020\u0020\u002f\u0020\u002f\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u005c\u0020\u0020\u005c\u0020\u005c\u005f\u005f\u005f\u005f\u005f\u005f\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u0020\u005f\u005f\u0020\u0020\u005c\u0020\u0020\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u0020\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u0020\u005c\u005c\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005f\u007c\u002f\u005f\u005f\u0020\u0020\u000a\u0020\u0020\u0020\u0020\u002f\u0020\u0020\u002f\u005f\u002f\u005f\u005f\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u005c\u0020\u0020\u005c\u007c\u005f\u005f\u005f\u005f\u005f\u007c\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u007c\u005c\u0020\u0020\u005c\u0020\u0020\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u0020\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005c\u005c\u0020\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005f\u005c\u005c\u0020\u005c\u0020\u005c\u0020\u0020\u005c\u005f\u007c\u005c\u0020\u005c\u0020\u000a\u0020\u0020\u0020\u007c\u005c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005c\u0020\u005c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005c\u0020\u0020\u0020\u0020\u0020\u005c\u0020\u005c\u005f\u005f\u005c\u0020\u005c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005c\u0020\u0020\u0020\u0020\u005c\u0020\u005c\u005f\u005f\u005c\u005c\u0020\u005c\u005f\u005f\u005c\u0020\u005c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005c\u0020\u005c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005c\u0020\u005c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u005c\u000a\u0020\u0020\u0020\u0020\u005c\u007c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u007c\u005c\u007c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u007c\u0020\u0020\u0020\u0020\u0020\u0020\u005c\u007c\u005f\u005f\u007c\u005c\u007c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u007c\u0020\u0020\u0020\u0020\u0020\u005c\u007c\u005f\u005f\u007c\u0020\u005c\u007c\u005f\u005f\u007c\u005c\u007c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u007c\u005c\u007c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u007c\u005c\u007c\u005f\u005f\u005f\u005f\u005f\u005f\u005f\u007c\n`;
        console.log(chalk.cyan(f2048));
    }

    drawBoard() {
        const board = [
            ["Score", this.score],
            ["Steps", this.step]
        ];
        const table = new Table({
            chars: {
                "mid": "",
                "left-mid": "",
                "mid-mid": "",
                "right-mid": ""
            },
            colWidths: [21, 21]
        });
        table.push(...board);
        console.log(table.toString() + "\n");
    }

    drawTip() {
        const tip = `W or ↑ => Up\nA or ← => Left\nS or ↓ => Down\nD or → => Right\nPlease enter key.\n`;
        console.log(tip);
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
                return m > i && c !== 0;
            });
            if (next !== -1) {
                if (arr[i] === 0) {
                    arr[i] = arr[next];
                    arr[next] = 0;
                    i -= 1;
                    this.hasChange = true;
                } else if (arr[i] === arr[next]) {
                    arr[i] = arr[i] * 2;
                    arr[next] = 0;
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
            this.setStep();
        }

        this.drawLogo();
        this.drawBoard();
        this.drawGrid();
        this.drawTip();

        if (this.hasChange) {
            this.hasChange = false;
            if (this.isWon) this.won();
            if (this.checkLose()) this.lose();
        }
    }

    setScore(score) {
        this.score += score;
        if (score === 2048) {
            this.isWon = true;
        }
    }

    setStep() {
        this.step += 1;
    }

    checkLose() {
        const cells = this.grid.cells;
        const size = this.grid.size;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (cells[x][y] === 0) {
                    return false;
                } else if (cells[x][y - 1] && cells[x][y - 1] === cells[x][y]) {
                    return false;
                } else if (cells[x - 1] && cells[x - 1][y] === cells[x][y]) {
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
        process.exit(0);
    }
}

module.exports = Game;