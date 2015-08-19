var Pipe = require('./pipe');
var config = require('./config');

class Elbow extends Pipe {
    constructor(col, row) {
        super(col, row);
    }

    render(context) {
        // Create an elbow pipe;
        var pipe = new Path2D();

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

        // Stroke the elbow.
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
            context.arc(6, 6, 7, 0, (Math.PI / 2 * this.water) / 100, false);
            context.arc(6, 6, 28, (Math.PI / 2 * this.water) / 100, 0, true);
            context.fill();
        }
    }
}

module.exports = Elbow;
