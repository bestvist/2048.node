const Grid = require('./grid');

class ctrl {
    constructor() {

    }

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
        this.generateRandom();
        this.drawGrid();
    }
    rangeTilesDown() {
        this.generateRandom();
        this.drawGrid();
    }
    rangeTilesLeft() {
        this.generateRandom();
        this.drawGrid();
    }
    rangeTilesRight() {
        this.generateRandom();
        this.drawGrid();
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

}

module.exports = ctrl;