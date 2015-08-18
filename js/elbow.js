var Pipe = require('./pipe');

class Elbow extends Pipe {
    constructor(col, row) {
        super(col, row);

        this.setInitialRotation();
    }

    setInitialRotation() {
        let random = Math.random();

        if (random >= 0 && random < 0.25) {
            this.rotation = 'left-top';
        } else if (random >= 0.25 && random < 0.5) {
            this.rotation = 'left-bottom';
        } else if (random >= 0.5 && random < 0.75) {
            this.rotation = 'right-top';
        } else if (random >= 0.75 && random <= 1) {
            this.rotation = 'right-bottom';
        }
    }

    render(context) {
        var pipe = new Path2D();

        if (this.rotation === 'left-top') {
            // Draw the elbow.
            pipe.arc(this.xOffset + 5, this.yOffset + 5, 8, 0, Math.PI / 2, false);
            pipe.moveTo(this.xOffset + 35, this.yOffset + 5);
            pipe.arc(this.xOffset + 5, this.yOffset + 5, 30, 0, Math.PI / 2, false);
            context.stroke(pipe);

            // Draw the pipe couplings.
            context.strokeRect(this.xOffset + 0, this.yOffset + 10, 5, 30);
            context.strokeRect(this.xOffset + 10, this.yOffset + 0, 30, 5);
        } else if (this.rotation === 'left-bottom') {
            // Draw the elbow.
            pipe.arc(this.xOffset + 5, this.yOffset + 45, 8, Math.PI * 1.5, 0, false);
            pipe.moveTo(this.xOffset + 5, this.yOffset + 15);
            pipe.arc(this.xOffset + 5, this.yOffset + 45, 30, Math.PI * 1.5, 0, false);
            context.stroke(pipe);

            // Draw the pipe couplings.
            context.strokeRect(this.xOffset + 0, this.yOffset + 10, 5, 30);
            context.strokeRect(this.xOffset + 10, this.yOffset + 45, 30, 5);
        } else if (this.rotation === 'right-top') {
            // Draw the elbow.
            pipe.arc(this.xOffset + 45, this.yOffset + 5, 8, Math.PI / 2, Math.PI, false);
            pipe.moveTo(this.xOffset + 45, this.yOffset + 35);
            pipe.arc(this.xOffset + 45, this.yOffset + 5, 30, Math.PI / 2, Math.PI, false);
            context.stroke(pipe);

            // Draw the pipe couplings.
            context.strokeRect(this.xOffset + 10, this.yOffset + 0, 30, 5);
            context.strokeRect(this.xOffset + 45, this.yOffset + 10, 5, 30);
        } else if (this.rotation === 'right-bottom') {
            // Draw the elbow.
            pipe.arc(this.xOffset + 45, this.yOffset + 45, 8, Math.PI, Math.PI * 1.5, false);
            pipe.moveTo(this.xOffset + 15, this.yOffset + 45);
            pipe.arc(this.xOffset + 45, this.yOffset + 45, 30, Math.PI, Math.PI * 1.5, false);
            context.stroke(pipe);

            // Draw the pipe couplings.
            context.strokeRect(this.xOffset + 45, this.yOffset + 10, 5, 30);
            context.strokeRect(this.xOffset + 10, this.yOffset + 45, 30, 5);
        }
    }
}

module.exports = Elbow;
