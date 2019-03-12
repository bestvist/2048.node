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
        // this.generateRandom();
        // this.drawGrid();
        const cells = this.grid.cells;
        for (let x = 0; x < this.grid.size; x++) {
            for (let y = 0; y < this.grid.size; y++) {
                let cell = cells[x][y];


            }
        }
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

    rangeRowValue(arr) {
        //遍历数组从数组的的当前位置的下一个开始遍历，找不是0的位置()
        // 如果没找到什么也不做
        // 如果找到
        //如果当前位置是0，那么像当前位置与下一个进行互换（当前位置获得下一个位置的数据，并且将下一个位置数据置为0，将下标减一）
        //如果当前位置和下一个位置相等，将当前位置数据*2，下个位置数据置0
        var i, nextI, len, m;
        len = arr.length;
        for (i = 0; i < len; i += 1) {
            //先找nextI
            nextI = -1;
            for (m = i + 1; m < len; m++) {
                if (arr[m] !== 0) {
                    nextI = m;
                    break;
                }
            }

            if (nextI !== -1) {
                //存在下个不为0的位置
                if (arr[i] === 0) {
                    arr[i] = arr[nextI];
                    arr[nextI] = 0;
                    i -= 1;
                } else if (arr[i] === arr[nextI]) {
                    arr[i] = arr[i] * 2;
                    arr[nextI] = 0;
                }
            }
        }
        return arr;
    }

}

module.exports = ctrl;