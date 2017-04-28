import Pipe from './Pipe';
import config from './config';

let positions = {
    0: 'vertical',
    1: 'horizontal',
    2: 'vertical',
    3: 'horizontal'
};

let openings = {
    0: ['top', 'bottom'],
    1: ['left', 'right'],
    2: ['top', 'bottom'],
    3: ['left', 'right']
};

class Straight extends Pipe {
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

        // Draw the straight.
        pipe.moveTo(5, 15);
        pipe.lineTo(45, 15);
        pipe.moveTo(5, 35);
        pipe.lineTo(45, 35);

        context.save();

        // Set the rotation and offset.
        switch(positions[this.rotation]) {
            case 'horizontal':
                context.translate(this.xOffset, this.yOffset);
                break;
            case 'vertical':
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
        }

        context.stroke(pipe);

        // Draw the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(45, 10, 5, 30);

        this.renderWaterLevel(context);

        context.restore();
    }

    renderWaterLevel(context) {
        if (this.waterLevel > 0) {
            context.fillStyle = config.WATER_COLOR;

            // Fill water one way or the other depending on position and entry.
            if (positions[this.rotation] === 'horizontal' && this.entry === 'left' ||
                positions[this.rotation] === 'vertical' && this.entry === 'top') {
                context.fillRect(6, 16, (38 * this.waterLevel) / 100, 18);
            } else {
                context.fillRect(44 - ((38 * this.waterLevel) / 100), 16, (38 * this.waterLevel) / 100, 18);
            }
        }
    }
}

export default Straight;
