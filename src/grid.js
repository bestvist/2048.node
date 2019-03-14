const Table = require('cli-table')
const chalk = require('chalk');

class Grid {
    constructor() {
        this.size = 4;
        this.cells = this.initGrid();
    }

    initGrid() {
        var cells = [];
        for (var x = 0; x < this.size; x++) {
            var row = cells[x] = [];
            for (var y = 0; y < this.size; y++) {
                row.push("");
            }
        }
        return cells;
    }

    drawCells() {
        const cells = JSON.parse(JSON.stringify(this.cells));
        const size = this.size;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                cells[x][y] = this.colorCell(cells[x][y]);
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
            colWidths: [10, 10, 10, 10]
        });
        table.push(...cells);
        console.log(table.toString());
    }

    colorCell(value) {
        if (!value) return value;
        const colorMap = {
            '2': 'blueBright',
            '4': 'blue',
            '8': 'greenBright',
            '16': 'green',
            '32': 'redBright',
            '64': 'red',
            '128': 'magentaBright',
            '256': 'magenta',
            '512': 'cyanBright',
            '1028': 'cyan',
            '2048': 'yellow',
        }
        return chalk[colorMap[value]](value);
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