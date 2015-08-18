var Grid = require('./grid');
var Pipes = require('./pipes');
var RenderManager = require('./render_manager');

class GameManager {
    constructor() {
        this.grid = new Grid();
        this.pipes = new Pipes();

        this.RenderManager = new RenderManager(this.grid, this.pipes);
    }
}

module.exports = GameManager;
