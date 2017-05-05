import {
    GRID_WIDTH,
    GRID_HEIGHT,
    FPS
} from './constants/settings';

const FPS_INTERVAL = 1000 / FPS;

class RenderManager {
    constructor(canvas, grid, pipes) {
        this.grid  = grid;
        this.pipes = pipes;

        this.startTime = Date.now();
        this.context   = canvas.getContext('2d');

        this.render();
    }

    render() {
        window.requestAnimationFrame(this.render.bind(this));

        const currentTime = Date.now();
        const timeElapsed = currentTime - this.startTime;

        if (timeElapsed > FPS_INTERVAL) {
            this.startTime = currentTime - (timeElapsed % FPS_INTERVAL);

            // Clear canvas.
            this.context.clearRect(0, 0, GRID_WIDTH, GRID_HEIGHT);

            // Render all modules.
            this.grid.render(this.context);
            this.pipes.render(this.context);
        }
    }
}

export default RenderManager;
