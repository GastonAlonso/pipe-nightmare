var config = require('./config');

class Pipe {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.water = 0;

        this.calculateOffsets();
        this.setInitialRotation();
        this.fillWithWater();
    }

    calculateOffsets() {
        this.xOffset = this.col * config.CELL_SIZE;
        this.yOffset = this.row * config.CELL_SIZE;
    }

    setInitialRotation() {
        this.rotation = Math.floor(Math.random() * 4);
    }

    fillWithWater() {
        let waterFill = setInterval(() => {
            this.water += 10;

            if (this.water === 100) {
                clearInterval(waterFill);
            }
        }, 1000);
    }

    rotate() {
        if (this.water === 0) {
            this.rotation = ++this.rotation % 4;
        }
    }
}

module.exports = Pipe;
