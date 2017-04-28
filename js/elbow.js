let Pipe = require('./pipe');
let config = require('./config');

let positions = {
    0: 'left-top',
    1: 'right-top',
    2: 'right-bottom',
    3: 'left-bottom'
};

let openings = {
    0: ['left', 'top'],
    1: ['right', 'top'],
    2: ['right', 'bottom'],
    3: ['left', 'bottom']
};

class Elbow extends Pipe {
    constructor(col, row) {
        super(col, row);
    }

    hasEntry(entry) {
        return openings[this.rotation].indexOf(entry) > -1;
    }

    getExit(entry) {
        let exit;

        openings[this.rotation].forEach(opening =>  {
            if (opening !== entry) {
                exit = opening
            }
        });

        return exit;
    }

    render(context) {
        let pipe = new Path2D();

        // Draw the elbow.
        pipe.arc(5, 5, 8, 0, Math.PI / 2, false);
        pipe.moveTo(35, 5);
        pipe.arc(5, 5, 30, 0, Math.PI / 2, false);

        context.save();

        // Set the rotation and offset.
        switch(positions[this.rotation]) {
            case 'left-top':
                context.translate(this.xOffset, this.yOffset);
                break;
            case 'right-top':
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
                break;
            case 'right-bottom':
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI);
                break;
            case 'left-bottom':
                context.translate(this.xOffset, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI * 1.5);
        }

        context.stroke(pipe);

        // Draw the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(10, 0, 30, 5);

        this.renderWaterLevel(context);

        context.restore();
    }

    renderWaterLevel(context) {
        if (this.waterLevel > 0) {
            context.fillStyle = config.WATER_COLOR;
            context.beginPath();

            // Fill water one way or the other depending on position and entry.
            if (positions[this.rotation] === 'left-top' && this.entry === 'top' ||
                positions[this.rotation] === 'right-top' && this.entry === 'right' ||
                positions[this.rotation] === 'right-bottom' && this.entry === 'bottom' ||
                positions[this.rotation] === 'left-bottom' && this.entry === 'left') {
                context.arc(6, 6, 7, 0, (Math.PI / 2 * this.waterLevel) / 100, false);
                context.arc(6, 6, 28, (Math.PI / 2 * this.waterLevel) / 100, 0, true);
            } else {
                context.arc(6, 6, 7, (Math.PI / 2), (Math.PI / 2) - ((Math.PI / 2 * this.waterLevel) / 100), true);
                context.arc(6, 6, 28, (Math.PI / 2) - ((Math.PI / 2 * this.waterLevel) / 100), (Math.PI / 2), false);
            }

            context.fill();
        }
    }
}

module.exports = Elbow;
