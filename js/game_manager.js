let config = require('./config');
let Grid = require('./grid');
let Pipes = require('./pipes');
let RenderManager = require('./render_manager');
let ClickController = require('./click_controller');

let exitToEntry = {
    'top': 'bottom',
    'bottom': 'top',
    'left': 'right',
    'right': 'left'
};

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
        let { col, row } = this.coords =  config.START_PIPE;
        let startPipe = this.pipes.at(col, row);

        // Set the rotation of the first pipe,
        // to take water from the top right corner.
        startPipe.rotation = 0;

        // Start to fill pipe from the top.
        this.fillPipe('top', startPipe);
    }

    fillPipe(entry, pipe) {
        pipe.fill(entry, exit => {
            let nextPipe = this.getNextPipe(exit);
            let nextEntry = exitToEntry[exit];

            if (nextPipe && nextPipe.hasEntry(nextEntry)) {
                return this.fillPipe(nextEntry, nextPipe);
            }

            console.log('Game Over');
        });
    }

    getNextPipe(exit) {
        let { col, row } = this.coords = this.getNextCoords(exit);

        return this.pipes.at(col, row);
    }

    getNextCoords(exit) {
        let { col, row } = this.coords;

        switch(exit) {
            case 'left':
                --col;
                break;
            case 'right':
                ++col;
                break;
            case 'top':
                --row;
                break;
            case 'bottom':
                ++row;
        }

        return { col: col, row: row };
    }
}

module.exports = GameManager;
