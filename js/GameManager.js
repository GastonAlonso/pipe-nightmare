import { START_PIPE }  from './config';
import Grid            from './Grid';
import Pipes           from './Pipes';
import RenderManager   from './RenderManager';
import ClickController from './ClickController';

const exitToEntryMap = {
    'top':    'bottom',
    'bottom': 'top',
    'left':   'right',
    'right':  'left'
};

class GameManager {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.grid   = new Grid();
        this.pipes  = new Pipes();

        this.renderManager   = new RenderManager(this.canvas, this.grid, this.pipes);
        this.clickController = new ClickController(this.canvas, this.pipes);

        this.coords = START_PIPE;

        this.startWaterFlow();
    }

    startWaterFlow() {
        const { col, row } = this.coords;
        const startPipe    = this.pipes.at(col, row);

        // Set the rotation of the first pipe,
        // to take water from the top right corner.
        startPipe.rotation = 0;

        // Start to fill pipe from the top.
        this.fillPipe('top', startPipe);
    }

    fillPipe(entry, pipe) {
        pipe.fill(entry, exit => {
            // set the next coords depending on exit
            this.coords = this.getNextCoords(exit);

            const { col, row } = this.coords;

            // get next entry point and next pipe
            const nextEntry = exitToEntryMap[exit];
            const nextPipe  = this.pipes.at(col, row);

            // if there is a matching pipe, fill it
            if (nextPipe && nextPipe.hasEntry(nextEntry)) {
                return this.fillPipe(nextEntry, nextPipe);
            }

            // otherwise game over
            console.log('Game Over');
        });
    }

    getNextCoords(exit) {
        const { col, row } = this.coords;

        switch(exit) {
            case 'left':
                return { col: col - 1, row };
            case 'right':
                return { col: col + 1, row };
            case 'top':
                return { col, row: row - 1 };
            case 'bottom':
                return { col, row: row + 1 };
        }
    }
}

export default GameManager;
