let Pipe = require('./pipe');
let config = require('./config');

class Straight extends Pipe {
    constructor(col, row) {
        super(col, row);
    }

    fill(entry, done) {
        this.entry = entry;

        super(() => done(entry));
    }

    hasEntry(entry) {
        if (entry === 'top' || entry === 'bottom') {
            return (this.rotation === 0 || this.rotation === 2);
        } else {
            return (this.rotation === 1 || this.rotation === 3);
        }
    }

    render(context) {
        // Create a straight pipe;
        let pipe = new Path2D();

        // Draw the straight.
        pipe.moveTo(5, 15);
        pipe.lineTo(45, 15);
        pipe.moveTo(5, 35);
        pipe.lineTo(45, 35);

        // Save the context before setting translation and rotation.
        context.save();

        // Set the rotation and offset.
        switch(this.rotation) {
            // Horizontal straight.
            case 1:
            case 3:
                context.translate(this.xOffset, this.yOffset);
                break;

            // Vertical straight.
            case 0:
            case 2:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
        }

        context.stroke(pipe);

        // Draw the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(45, 10, 5, 30);

        this.renderWaterLevel(context);

        // Restore context to default translation and rotation.
        context.restore();
    }

    renderWaterLevel(context) {
        if (this.water > 0) {
            context.fillStyle = 'rgb(51, 204, 255)';

            if (((this.rotation === 1 || this.rotation === 3) && this.entry === 'left') ||
                ((this.rotation === 0 || this.rotation === 2) && this.entry === 'top')) {
                context.fillRect(6, 16, (38 * this.water) / 100, 18);
            } else {
                context.fillRect(44 - ((38 * this.water) / 100), 16, (38 * this.water) / 100, 18);
            }
        }
    }
}

module.exports = Straight;
