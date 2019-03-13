const Table = require('cli-table')
const Grid = require('./grid');

class ctrl {
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

    isWin() {

    }

    drawLogo(){
        const f2048 = `                                            
___ ___ ___ ___    _____ _____ ____  _____ 
|_  |   | | | . |  |   | |     |    \|   __|
|  _| | |_  | . |  | | | |  |  |  |  |   __|
|___|___| |_|___|  |_|___|_____|____/|_____|
                                        `                                                                                                                              
        console.log(f2048)
    }

    drawBoard(){
        const board = [
            ['Score', this.score]
        ]
        const table = new Table({
            chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
            colWidths: [21, 21]
        });
        table.push(...board);
        console.log(table.toString()+ '\n');
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
                    this.score += arr[i];
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
        } 
            
        this.drawLogo();
        this.drawBoard();
        this.drawGrid();
    }

}

module.exports = ctrl;