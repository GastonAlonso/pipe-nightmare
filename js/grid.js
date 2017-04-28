import config from './config';

const GRID_LINE_WIDTH = 0.7;
const DEFAULT_LINE_WIDTH = 1.0;

class Grid {
    render(context) {
        let gridLines = new Path2D();
        let numVertCells = config.GRID_WIDTH / config.CELL_SIZE;
        let numHorzCells = config.GRID_HEIGHT / config.CELL_SIZE;

        // Draw vertical grid lines.
        this.drawGridLines(numVertCells, config.GRID_HEIGHT, function(lineStart, lineEnd, linePlane) {
            gridLines.moveTo(linePlane, lineStart);
            gridLines.lineTo(linePlane, lineEnd);
        });

        // Draw horizontal grid lines.
        this.drawGridLines(numHorzCells, config.GRID_WIDTH, function(lineStart, lineEnd, linePlane) {
            gridLines.moveTo(lineStart, linePlane);
            gridLines.lineTo(lineEnd, linePlane);
        });

        // Set line width slightly thinner for drawing
        // grid lines, then set it back to the default.
        context.lineWidth = GRID_LINE_WIDTH;
        context.stroke(gridLines);
        context.lineWidth = DEFAULT_LINE_WIDTH;
    }

    drawGridLines(numCells, gridDimension, callback) {
        let cell,
            lineStart,
            lineEnd,
            linePlane;

        // Go from the first cell to the last cell, plus one.
        for (cell = 0; cell < numCells + 1; cell++) {

            // Set line plane in cell sized intervals.
            linePlane = cell * config.CELL_SIZE;

            // Draw line from start to end of grid.
            lineStart = 0;
            lineEnd = gridDimension;

            callback(lineStart, lineEnd, linePlane);
        }
    }
}

export default Grid;
