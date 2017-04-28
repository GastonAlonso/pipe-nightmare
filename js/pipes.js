let config = require('./config');
let Straight = require('./Straight');
let Elbow = require('./Elbow');

class Pipes {
    constructor() {
        this.populateCells();
    }

    populateCells() {
        let numRows = config.GRID_HEIGHT / config.CELL_SIZE;
        let numCols = config.GRID_WIDTH / config.CELL_SIZE;

        this.cells = [];

        for (let col = 0; col < numCols; col++) {
            this.cells[col] = [];

            for (let row = 0; row < numRows; row++) {
                this.cells[col][row] = this.getRandomPipe(col, row);
            }
        }
    }

    getRandomPipe(col, row) {
        if (Math.random() <= 0.5) {
            return new Elbow(col, row);
        }

        return new Straight(col, row);
    }

    at(col, row) {
        if (this.cells[col] !== undefined &&
            this.cells[col][row] !== undefined) {
            return this.cells[col][row];
        }

        return undefined;
    }

    render(context) {
        this.cells.forEach(function(column) {
            column.forEach(function(pipe) {
                pipe.render(context);
            });
        });
    }
}

module.exports = Pipes;
