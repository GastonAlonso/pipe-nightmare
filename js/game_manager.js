var Grid = require('./grid');
var Pipes = require('./pipes');
var RenderManager = require('./render_manager');
var ClickManager = require('./click_manager');

class GameManager {
    constructor() {
        this.grid = new Grid();
        this.pipes = new Pipes();

        this.renderManager = new RenderManager(this.grid, this.pipes);
        this.clickManager = new ClickManager(this.pipes);
    }
}

module.exports = GameManager;
