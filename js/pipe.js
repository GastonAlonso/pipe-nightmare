var config = require('./config');

class Pipe {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.calculateOffsets();
        this.setInitialRotation();
    }

    calculateOffsets() {
        this.xOffset = this.col * config.CELL_SIZE;
        this.yOffset = this.row * config.CELL_SIZE;
    }

    setInitialRotation() {
        this.rotation = Math.floor(Math.random() * 4);
    }

    rotate() {
        this.rotation = ++this.rotation % 4;
    }
}

module.exports = Pipe;
