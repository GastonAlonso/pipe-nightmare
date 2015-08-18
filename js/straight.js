var Pipe = require('./pipe');
var config = require('./config');

class Straight extends Pipe {
    constructor(col, row) {
        super(col, row);
    }

    render(context) {
        // Create a straight pipe;
        var pipe = new Path2D();

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
            case 0:
            case 1:
                context.translate(this.xOffset, this.yOffset);
                break;

            // Vertical straight.
            case 2:
            case 3:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
        }

        // Stroke the straight.
        context.stroke(pipe);

        // Stroke the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(45, 10, 5, 30);

        // Restore context to default translation and rotation.
        context.restore();
    }
}

module.exports = Straight;
