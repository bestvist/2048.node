const Table = require('cli-table')
const chalk = require('chalk');

class Grid {
    constructor() {
        this.size = 4;
        this.cellWidth = 10;
        this.cells = this.initGrid();
    }

    initGrid() {
        var cells = [];
        for (var x = 0; x < this.size; x++) {
            var row = cells[x] = [];
            for (var y = 0; y < this.size; y++) {
                row.push(0);
            }
        }
        return cells;
    }

    drawCells() {
        const cells = JSON.parse(JSON.stringify(this.cells));
        const size = this.size;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                cells[x][y] = cells[x][y] ? cells[x][y] : '';
                cells[x][y] = this.trimCell(cells[x][y]) + this.colorCell(cells[x][y]);
            }
        }
        const table = new Table({
            chars: {
                'top': '═',
                'top-mid': '╤',
                'top-left': '╔',
                'top-right': '╗',
                'bottom': '═',
                'bottom-mid': '╧',
                'bottom-left': '╚',
                'bottom-right': '╝',
                'left': '║',
                'left-mid': '╟',
                'mid': '─',
                'mid-mid': '┼',
                'right': '║',
                'right-mid': '╢',
                'middle': '│'
            },
            colWidths: [this.cellWidth, this.cellWidth, this.cellWidth, this.cellWidth]
        });
        table.push(...cells);
        console.log(table.toString());
    }

    colorCell(value) {
        if (!value) return value;
        const colorMap = {
            '2': '#03a9f4',
            '4': '#4caf50',
            '8': '#009688',
            '16': '#ffc107',
            '32': '#ff5722',
            '64': '#f44336',
            '128': '#e91e63',
            '256': '#9c27b0',
            '512': '#3f51b5',
            '1028': '#fbd324',
            '2048': '#00bcd4',
        }
        return chalk.hex([colorMap[value]])(value);
    }

    trimCell(value) {
        const length = (this.cellWidth - 4) / 2 + 4 - (value + '').length;
        return new Array(length + 1).join(' ');
    }

    setCellValue(x, y, value) {
        this.cells[x][y] = value;
    }

    availableCell() {
        const cells = [];
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (!this.cells[x][y]) {
                    cells.push({
                        x,
                        y
                    })
                }
            }
        }
        return cells;
    }

}

module.exports = Grid;