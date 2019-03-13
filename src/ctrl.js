const Grid = require('./grid');

class ctrl {
    constructor() {}

    start() {
        this.grid = new Grid();
        this.generateRandom();
        this.generateRandom();
        this.drawGrid();
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
        let cellCol = [];
        for (let y = 0; y < this.grid.size; y++) {
            for (let x = 0; x < this.grid.size; x++) {
                cellCol.push(cells[x][y]);
            }
            cellCol = this.rangeRowValue(cellCol);
            for (let x = 0; x < this.grid.size; x++) {
                cells[x][y] = cellCol[x];
            }
        }

        this.action();
    }
    rangeTilesDown() {
        const cells = this.grid.cells;
        let cellCol = [];
        for (let y = 0; y < this.grid.size; y++) {
            for (let x = 0; x < this.grid.size; x++) {
                cellCol.push(cells[x][y]);
            }
            cellCol = this.rangeRowValue(cellCol.reverse()).reverse();
            for (let x = 0; x < this.grid.size; x++) {
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
                } else if (arr[i] === arr[next]) {
                    arr[i] = arr[i] * 2;
                    arr[next] = "";
                }
            }
        }
        return arr;
    }

    action() {
        this.generateRandom();
        this.drawGrid();
    }

}

module.exports = ctrl;