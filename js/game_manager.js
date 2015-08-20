const config = require('./config');
const Grid = require('./grid');
const Pipes = require('./pipes');
const RenderManager = require('./render_manager');
const ClickController = require('./click_controller');

class GameManager {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.grid = new Grid();
        this.pipes = new Pipes();

        this.renderManager = new RenderManager(this.canvas, this.grid, this.pipes);
        this.clickManager = new ClickController(this.canvas, this.pipes);

        this.startWaterFlow();
    }

    startWaterFlow() {
        const { col, row } = this.coords =  config.START_PIPE;
        const startPipe = this.pipes.at(col, row);

        // Set the rotation of the first pipe,
        // to take water from the top right corner.
        startPipe.rotation = 0;

        // Start to fill pipe from the top.
        this.fillPipe('top', startPipe);
    }

    fillPipe(entry, pipe) {
        pipe.fill(entry, nextEntry => {
            const nextPipe = this.getNextPipe(nextEntry);

            if (nextPipe && nextPipe.hasEntry(nextEntry)) {
                return this.fillPipe(nextEntry, nextPipe);
            }

            console.log('Game Over');
        });
    }

    getNextPipe(nextEntry) {
        const { col, row } = this.coords = this.getNextCoords(nextEntry);

        return this.pipes.at(col, row);
    }

    getNextCoords(nextEntry) {
        let { col, row } = this.coords;

        switch(nextEntry) {
            case 'left':
                ++col;
                break;
            case 'right':
                --col;
                break;
            case 'top':
                ++row;
                break;
            case 'bottom':
                --row;
        }

        return { col: col, row: row };
    }
}

module.exports = GameManager;
