var config = require('./config');
var Straight = require('./straight');
var Elbow = require('./elbow');

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
        let random = Math.random();

        if (random <= 0.5) {
            return new Elbow(col, row);
        }

        return new Straight(col, row);
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
