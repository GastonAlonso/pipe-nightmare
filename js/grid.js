var config = require('./config');

const GRID_LEFT = 0;
const GRID_RIGHT = config.GRID_WIDTH;
const GRID_TOP = 0;
const GRID_BOTTOM = config.GRID_HEIGHT;
const CELL_SIZE = config.CELL_SIZE;
const GRID_LINE_WIDTH = 0.7;

class Grid {
    render(context) {
        let gridLines = new Path2D();

        // Draw vertical grid lines.
        for (let i = 0; i <= GRID_RIGHT; i++) {
            let startX, endX, startY, endY;

            // X is set in cell sized intervals.
            startX = endX = CELL_SIZE * i;

            // Y draws from top to bottom.
            startY = GRID_TOP;
            endY = GRID_BOTTOM;

            if (startX === GRID_LEFT) {
                ++startX;
                ++endX;
            }

            if (startX === GRID_RIGHT) {
                --startX;
                --endX;
            }

            gridLines.moveTo(startX, startY);
            gridLines.lineTo(endX, endY);
        }

        // Draw horizontal grid lines.
        for (let i = 0; i <= GRID_BOTTOM; i++) {
            let startX, startY, endX, endY;

            // Y is set in cell sized intervals.
            startY = endY = CELL_SIZE * i;

            // X draws from left to right.
            startX = GRID_LEFT;
            endX = GRID_RIGHT;

            if (startY === GRID_TOP) {
                ++startY;
                ++endY;
            }

            if (startY === GRID_BOTTOM) {
                --startY;
                --endY;
            }

            gridLines.moveTo(startX, startY);
            gridLines.lineTo(endX, endY);
        }

        context.lineWidth = GRID_LINE_WIDTH;
        context.stroke(gridLines);
        context.lineWidth = 1;
    }
}

module.exports = Grid;
