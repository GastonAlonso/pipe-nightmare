let config = require('./config');

class Pipe {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.water = 0;

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

    fill(done) {
        let waterFill = setInterval(() => {
            if (this.water >= 100) {
                clearInterval(waterFill);

                return done();
            }

            this.water += 10;
        }, config.FILL_SPEED);
    }

    rotate() {
        if (this.water === 0) {
            this.rotation = ++this.rotation % 4;
        }
    }
}

module.exports = Pipe;
