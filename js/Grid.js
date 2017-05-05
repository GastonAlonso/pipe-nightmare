import {
    GRID_WIDTH,
    GRID_HEIGHT,
    CELL_SIZE
} from './constants/settings';

const GRID_LINE_WIDTH = 0.7;
const DEFAULT_LINE_WIDTH = 1.0;

class Grid {
    render(context) {
        let gridLines = new Path2D();
        let numVertCells = GRID_WIDTH / CELL_SIZE;
        let numHorzCells = GRID_HEIGHT / CELL_SIZE;

        // Draw vertical grid lines.
        this.drawGridLines(numVertCells, GRID_HEIGHT, function(lineStart, lineEnd, linePlane) {
            gridLines.moveTo(linePlane, lineStart);
            gridLines.lineTo(linePlane, lineEnd);
        });

        // Draw horizontal grid lines.
        this.drawGridLines(numHorzCells, GRID_WIDTH, function(lineStart, lineEnd, linePlane) {
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
            linePlane = cell * CELL_SIZE;

            // Draw line from start to end of grid.
            lineStart = 0;
            lineEnd = gridDimension;

            callback(lineStart, lineEnd, linePlane);
        }
    }
}

export default Grid;
