var Pipe = require('./pipe');

class Straight extends Pipe {
    constructor(col, row) {
        super(col, row);

        this.setInitialRotation();
    }

    setInitialRotation() {
        let random = Math.random();

        if (random >= 0 && random < 0.5) {
            this.rotation = 'horizontal';
        } else {
            this.rotation = 'vertical';
        }
    }

    render(context) {
        // Create a horizontal straight;
        var pipe = new Path2D();

        if (this.rotation === 'horizontal') {
            // Draw the elbow.
            pipe.moveTo(this.xOffset + 5, this.yOffset + 15);
            pipe.lineTo(this.xOffset + 45, this.yOffset + 15);
            pipe.moveTo(this.xOffset + 5, this.yOffset + 35);
            pipe.lineTo(this.xOffset + 45, this.yOffset + 35);
            context.stroke(pipe);

            // Draw the pipe couplings.
            context.strokeRect(this.xOffset + 0, this.yOffset + 10, 5, 30);
            context.strokeRect(this.xOffset + 45, this.yOffset + 10, 5, 30);
        } else if (this.rotation === 'vertical') {
            // Draw the elbow.
            pipe.moveTo(this.xOffset + 15, this.yOffset + 5);
            pipe.lineTo(this.xOffset + 15, this.yOffset + 45);
            pipe.moveTo(this.xOffset + 35, this.yOffset + 5);
            pipe.lineTo(this.xOffset + 35, this.yOffset + 45);
            context.stroke(pipe);

            // Draw the pipe couplings.
            context.strokeRect(this.xOffset + 10, this.yOffset + 0, 30, 5);
            context.strokeRect(this.xOffset + 10, this.yOffset + 45, 30, 5);
        }
    }
}

module.exports = Straight;
