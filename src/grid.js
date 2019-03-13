const Table = require('cli-table')

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
        table.push(...this.cells);
        console.log(table.toString());
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