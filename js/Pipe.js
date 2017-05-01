import {
    CELL_SIZE,
    FILL_SPEED
} from './config';

class Pipe {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.waterLevel = 0;

        this.calculateOffsets();
        this.setInitialRotation();
    }

    calculateOffsets() {
        this.xOffset = this.col * CELL_SIZE;
        this.yOffset = this.row * CELL_SIZE;
    }

    setInitialRotation() {
        this.rotation = Math.floor(Math.random() * 4);
    }

    fill(entry, done) {
        this.entry = entry;

        let waterFill = setInterval(() => {
            if (this.waterLevel >= 100) {
                let exit = this.getExit(entry);

                clearInterval(waterFill);

                return done(exit);
            }

            this.waterLevel += 10;
        }, FILL_SPEED);
    }

    rotate() {
        if (this.waterLevel === 0) {
            this.rotation = ++this.rotation % 4;
        }
    }
}

export default Pipe;
