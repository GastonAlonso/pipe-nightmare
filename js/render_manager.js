var config = require('./config');

class RenderManager {
    constructor(grid, pipes) {
        this.canvas = document.getElementById('game-canvas');

        this.grid = grid;
        this.pipes = pipes;

        window.requestAnimationFrame(this.render.bind(this));
    }

    render() {
        let context = this.canvas.getContext('2d');

        // Clear canvas.
        context.clearRect(0, 0, config.GRID_WIDTH, config.GRID_HEIGHT);

        // Render all modules.
        this.grid.render(context);
        this.pipes.render(context);

        window.requestAnimationFrame(this.render.bind(this));
    }
}

module.exports = RenderManager;
