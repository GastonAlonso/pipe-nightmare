let Pipe = require('./pipe');
let config = require('./config');

class Elbow extends Pipe {
    constructor(col, row) {
        super(col, row);
    }

    fill(entry, done) {
        this.entry = entry;

        super(() => {
            let nextEntry = this.getNextEntry(entry);

            done(nextEntry);
        });
    }

    hasEntry(entry) {
        if (entry === 'top') {
            return (this.rotation === 0 || this.rotation === 1);
        } else if (entry === 'bottom') {
            return (this.rotation === 2 || this.rotation === 3);
        } else if (entry === 'left') {
            return (this.rotation === 0 || this.rotation === 3);
        } else if (entry === 'right') {
            return (this.rotation === 1 || this.rotation === 2);
        }

        return false;
    }

    getNextEntry(entry) {
        let nextEntry;

        switch(entry) {
            case 'top':
                if (this.rotation === 0) {
                    nextEntry = 'right';
                }

                else {
                    nextEntry = 'left';
                }
                break;
            case 'left':
                if (this.rotation === 0) {
                    nextEntry = 'bottom';
                }

                else {
                    nextEntry = 'top';
                }
                break;
            case 'right':
                if (this.rotation === 1) {
                    nextEntry = 'bottom';
                }

                else {
                    nextEntry = 'top';
                }
                break;
            case 'bottom':
                if (this.rotation === 3) {
                    nextEntry = 'right';
                }

                else {
                    nextEntry = 'left';
                }
        }

        return nextEntry;
    }

    render(context) {
        // Create an elbow pipe;
        let pipe = new Path2D();

        // Draw the elbow.
        pipe.arc(5, 5, 8, 0, Math.PI / 2, false);
        pipe.moveTo(35, 5);
        pipe.arc(5, 5, 30, 0, Math.PI / 2, false);

        // Save the context before setting translation and rotation.
        context.save();

        // Set the rotation and offset.
        switch(this.rotation) {
            // Left-Top.
            case 0:
                context.translate(this.xOffset, this.yOffset);
                break;
            // Right-Top.
            case 1:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
                break;
            // Right-Bottom.
            case 2:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI);
                break;
            // Left-Bottom.
            case 3:
                context.translate(this.xOffset, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI * 1.5);
        }

        context.stroke(pipe);

        // Draw the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(10, 0, 30, 5);

        this.renderWaterLevel(context);

        // Restore context to default translation and rotation.
        context.restore();
    }

    renderWaterLevel(context) {
        if (this.water > 0) {
            context.fillStyle = 'rgb(51, 204, 255)';
            context.beginPath();

            if ((this.rotation === 0 && this.entry === 'top') ||
                (this.rotation === 1 && this.entry === 'right') ||
                (this.rotation === 2 && this.entry === 'bottom') ||
                (this.rotation === 3 && this.entry === 'left')) {
                context.arc(6, 6, 7, 0, (Math.PI / 2 * this.water) / 100, false);
                context.arc(6, 6, 28, (Math.PI / 2 * this.water) / 100, 0, true);
            } else {
                context.arc(6, 6, 7, (Math.PI / 2), (Math.PI / 2) - ((Math.PI / 2 * this.water) / 100), true);
                context.arc(6, 6, 28, (Math.PI / 2) - ((Math.PI / 2 * this.water) / 100), (Math.PI / 2), false);
            }

            context.fill();
        }
    }
}

module.exports = Elbow;
