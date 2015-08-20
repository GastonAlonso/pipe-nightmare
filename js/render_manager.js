const config = require('./config');

const FPS_INTERVAL = 1000 / config.FPS;
let startTime;

class RenderManager {
    constructor(canvas, grid, pipes) {
        this.canvas = canvas;
        this.grid = grid;
        this.pipes = pipes;

        startTime = Date.now();
        this.context = this.canvas.getContext('2d');

        this.render();
    }

    render() {
        window.requestAnimationFrame(this.render.bind(this));

        const now = Date.now();
        const elapsed = now - startTime;

        if (elapsed > FPS_INTERVAL) {
            startTime = now - (elapsed % FPS_INTERVAL);

            // Clear canvas.
            this.context.clearRect(0, 0, config.GRID_WIDTH, config.GRID_HEIGHT);

            // Render all modules.
            this.grid.render(this.context);
            this.pipes.render(this.context);
        }
    }
}

module.exports = RenderManager;
