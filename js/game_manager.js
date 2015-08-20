let config = require('./config');
let Grid = require('./grid');
let Pipes = require('./pipes');
let RenderManager = require('./render_manager');
let ClickController = require('./click_controller');

class GameManager {
    constructor() {
        this.grid = new Grid();
        this.pipes = new Pipes();

        this.renderManager = new RenderManager(this.grid, this.pipes);
        this.clickManager = new ClickController(this.pipes);

        this.startWaterFlow();
    }

    startWaterFlow() {
        let startCol = this.colIndex = config.START_COL;
        let startRow = this.rowIndex = config.START_ROW;

        let firstPipe = this.pipes.cells[startCol][startRow];

        // Set the rotation of the first pipe,
        // to take water from the top right corner.
        firstPipe.rotation = 0;

        // Start to fill pipe from the top.
        this.fillPipe('top', firstPipe);
    }

    fillPipe(entry, pipe) {
        pipe.fill(entry, nextEntry => {
            this.setNextPipeCoords(nextEntry);

            let nextPipe = this.getNextPipe();

            if (!nextPipe || !nextPipe.hasEntry(nextEntry)) {
                console.log('Game Over');
                return;
            }

            this.fillPipe(nextEntry, this.getNextPipe());
        });
    }

    setNextPipeCoords(nextEntry) {
        if (nextEntry === 'left') {
            ++this.colIndex;
        }

        else if (nextEntry === 'right') {
            --this.colIndex;
        }

        if (nextEntry === 'top') {
            ++this.rowIndex;
        }

        else if (nextEntry === 'bottom') {
            --this.rowIndex;
        }
    }

    getNextPipe() {
        let nextCol = this.colIndex;
        let nextRow = this.rowIndex;

        if (this.pipes.cells[nextCol] === undefined) {
            return undefined;
        }

        if (this.pipes.cells[nextCol][nextRow] === undefined) {
            return undefined;
        }

        return this.pipes.cells[nextCol][nextRow];
    }
}

module.exports = GameManager;
