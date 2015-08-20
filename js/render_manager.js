let config = require('./config');

const FPS_INTERVAL = 1000 / config.FPS;
let startTime;

class RenderManager {
    constructor(grid, pipes) {
        this.canvas = document.getElementById('game-canvas');

        this.grid = grid;
        this.pipes = pipes;

        startTime = Date.now();
        this.render();
    }

    render() {
        window.requestAnimationFrame(this.render.bind(this));

        let now = Date.now();
        let elapsed = now - startTime;

        if (elapsed > FPS_INTERVAL) {
            startTime = now - (elapsed % FPS_INTERVAL);

            let context = this.canvas.getContext('2d');

            // Clear canvas.
            context.clearRect(0, 0, config.GRID_WIDTH, config.GRID_HEIGHT);

            // Render all modules.
            this.grid.render(context);
            this.pipes.render(context);
        }
    }
}

module.exports = RenderManager;
