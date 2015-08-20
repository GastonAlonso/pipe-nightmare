(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var GameManager = require('./game_manager');

window.onload = function () {
    new GameManager();
};

},{"./game_manager":5}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ClickController = (function () {
    function ClickController(canvas, pipes) {
        _classCallCheck(this, ClickController);

        this.canvas = document.getElementById('game-canvas');
        this.pipes = pipes;

        this.canvas.addEventListener('click', this.getClickHandler(), false);
    }

    ClickController.prototype.getClickHandler = function getClickHandler() {
        var _this = this;

        return function (e) {
            var col = Math.floor((e.pageX - _this.canvas.offsetLeft) / 50);
            var row = Math.floor((e.pageY - _this.canvas.offsetTop) / 50);

            _this.pipes.at(col, row).rotate();
        };
    };

    return ClickController;
})();

module.exports = ClickController;

},{}],3:[function(require,module,exports){
"use strict";

module.exports = {
    GRID_WIDTH: 1000,
    GRID_HEIGHT: 600,
    CELL_SIZE: 50,
    FILL_SPEED: 200,
    FPS: 5,
    START_PIPE: {
        col: 19,
        row: 0
    }
};

},{}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pipe = require('./pipe');
var config = require('./config');

var Elbow = (function (_Pipe) {
    _inherits(Elbow, _Pipe);

    function Elbow(col, row) {
        _classCallCheck(this, Elbow);

        _Pipe.call(this, col, row);
    }

    Elbow.prototype.fill = function fill(entry, done) {
        var _this = this;

        this.entry = entry;

        _Pipe.prototype.fill.call(this, function () {
            var nextEntry = _this.getNextEntry(entry);

            done(nextEntry);
        });
    };

    Elbow.prototype.hasEntry = function hasEntry(entry) {
        if (entry === 'top') {
            return this.rotation === 0 || this.rotation === 1;
        } else if (entry === 'bottom') {
            return this.rotation === 2 || this.rotation === 3;
        } else if (entry === 'left') {
            return this.rotation === 0 || this.rotation === 3;
        } else if (entry === 'right') {
            return this.rotation === 1 || this.rotation === 2;
        }

        return false;
    };

    Elbow.prototype.getNextEntry = function getNextEntry(entry) {
        var nextEntry = undefined;

        switch (entry) {
            case 'top':
                if (this.rotation === 0) {
                    nextEntry = 'right';
                } else {
                    nextEntry = 'left';
                }
                break;
            case 'left':
                if (this.rotation === 0) {
                    nextEntry = 'bottom';
                } else {
                    nextEntry = 'top';
                }
                break;
            case 'right':
                if (this.rotation === 1) {
                    nextEntry = 'bottom';
                } else {
                    nextEntry = 'top';
                }
                break;
            case 'bottom':
                if (this.rotation === 3) {
                    nextEntry = 'right';
                } else {
                    nextEntry = 'left';
                }
        }

        return nextEntry;
    };

    Elbow.prototype.render = function render(context) {
        // Create an elbow pipe;
        var pipe = new Path2D();

        // Draw the elbow.
        pipe.arc(5, 5, 8, 0, Math.PI / 2, false);
        pipe.moveTo(35, 5);
        pipe.arc(5, 5, 30, 0, Math.PI / 2, false);

        // Save the context before setting translation and rotation.
        context.save();

        // Set the rotation and offset.
        switch (this.rotation) {
            // Left-Top.
            case 0:
                context.translate(this.xOffset, this.yOffset);
                break;
            // Right-Top.
            case 1:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
                break;
            // Right-Bottom.
            case 2:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI);
                break;
            // Left-Bottom.
            case 3:
                context.translate(this.xOffset, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI * 1.5);
        }

        context.stroke(pipe);

        // Draw the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(10, 0, 30, 5);

        this.renderWaterLevel(context);

        // Restore context to default translation and rotation.
        context.restore();
    };

    Elbow.prototype.renderWaterLevel = function renderWaterLevel(context) {
        if (this.water > 0) {
            context.fillStyle = 'rgb(51, 204, 255)';
            context.beginPath();

            if (this.rotation === 0 && this.entry === 'top' || this.rotation === 1 && this.entry === 'right' || this.rotation === 2 && this.entry === 'bottom' || this.rotation === 3 && this.entry === 'left') {
                context.arc(6, 6, 7, 0, Math.PI / 2 * this.water / 100, false);
                context.arc(6, 6, 28, Math.PI / 2 * this.water / 100, 0, true);
            } else {
                context.arc(6, 6, 7, Math.PI / 2, Math.PI / 2 - Math.PI / 2 * this.water / 100, true);
                context.arc(6, 6, 28, Math.PI / 2 - Math.PI / 2 * this.water / 100, Math.PI / 2, false);
            }

            context.fill();
        }
    };

    return Elbow;
})(Pipe);

module.exports = Elbow;

},{"./config":3,"./pipe":7}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('./config');
var Grid = require('./grid');
var Pipes = require('./pipes');
var RenderManager = require('./render_manager');
var ClickController = require('./click_controller');

var GameManager = (function () {
    function GameManager() {
        _classCallCheck(this, GameManager);

        this.canvas = document.getElementById('game-canvas');
        this.grid = new Grid();
        this.pipes = new Pipes();

        this.renderManager = new RenderManager(this.canvas, this.grid, this.pipes);
        this.clickManager = new ClickController(this.canvas, this.pipes);

        this.startWaterFlow();
    }

    GameManager.prototype.startWaterFlow = function startWaterFlow() {
        var _coords = this.coords = config.START_PIPE;

        var col = _coords.col;
        var row = _coords.row;

        var startPipe = this.pipes.at(col, row);

        // Set the rotation of the first pipe,
        // to take water from the top right corner.
        startPipe.rotation = 0;

        // Start to fill pipe from the top.
        this.fillPipe('top', startPipe);
    };

    GameManager.prototype.fillPipe = function fillPipe(entry, pipe) {
        var _this = this;

        pipe.fill(entry, function (nextEntry) {
            var nextPipe = _this.getNextPipe(nextEntry);

            if (nextPipe && nextPipe.hasEntry(nextEntry)) {
                return _this.fillPipe(nextEntry, nextPipe);
            }

            console.log('Game Over');
        });
    };

    GameManager.prototype.getNextPipe = function getNextPipe(nextEntry) {
        var _coords2 = this.coords = this.getNextCoords(nextEntry);

        var col = _coords2.col;
        var row = _coords2.row;

        return this.pipes.at(col, row);
    };

    GameManager.prototype.getNextCoords = function getNextCoords(nextEntry) {
        var _coords3 = this.coords;
        var col = _coords3.col;
        var row = _coords3.row;

        switch (nextEntry) {
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
    };

    return GameManager;
})();

module.exports = GameManager;

},{"./click_controller":2,"./config":3,"./grid":6,"./pipes":8,"./render_manager":9}],6:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('./config');

var GRID_LINE_WIDTH = 0.7;
var DEFAULT_LINE_WIDTH = 1.0;

var Grid = (function () {
    function Grid() {
        _classCallCheck(this, Grid);
    }

    Grid.prototype.render = function render(context) {
        var gridLines = new Path2D();
        var numVertCells = config.GRID_WIDTH / config.CELL_SIZE;
        var numHorzCells = config.GRID_HEIGHT / config.CELL_SIZE;

        // Draw vertical grid lines.
        this.drawGridLines(numVertCells, config.GRID_HEIGHT, function (lineStart, lineEnd, linePlane) {
            gridLines.moveTo(linePlane, lineStart);
            gridLines.lineTo(linePlane, lineEnd);
        });

        // Draw horizontal grid lines.
        this.drawGridLines(numHorzCells, config.GRID_WIDTH, function (lineStart, lineEnd, linePlane) {
            gridLines.moveTo(lineStart, linePlane);
            gridLines.lineTo(lineEnd, linePlane);
        });

        // Set line width slightly thinner for drawing
        // grid lines, then set it back to the default.
        context.lineWidth = GRID_LINE_WIDTH;
        context.stroke(gridLines);
        context.lineWidth = DEFAULT_LINE_WIDTH;
    };

    Grid.prototype.drawGridLines = function drawGridLines(numCells, gridDimension, callback) {
        var cell = undefined,
            lineStart = undefined,
            lineEnd = undefined,
            linePlane = undefined;

        // Go from the first cell to the last cell, plus one.
        for (cell = 0; cell < numCells + 1; cell++) {

            // Set line plane in cell sized intervals.
            linePlane = cell * config.CELL_SIZE;

            // Draw line from start to end of grid.
            lineStart = 0;
            lineEnd = gridDimension;

            callback(lineStart, lineEnd, linePlane);
        }
    };

    return Grid;
})();

module.exports = Grid;

},{"./config":3}],7:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('./config');

var Pipe = (function () {
    function Pipe(col, row) {
        _classCallCheck(this, Pipe);

        this.col = col;
        this.row = row;

        this.water = 0;

        this.calculateOffsets();
        this.setInitialRotation();
    }

    Pipe.prototype.calculateOffsets = function calculateOffsets() {
        this.xOffset = this.col * config.CELL_SIZE;
        this.yOffset = this.row * config.CELL_SIZE;
    };

    Pipe.prototype.setInitialRotation = function setInitialRotation() {
        this.rotation = Math.floor(Math.random() * 4);
    };

    Pipe.prototype.fill = function fill(done) {
        var _this = this;

        var waterFill = setInterval(function () {
            if (_this.water >= 100) {
                clearInterval(waterFill);

                return done();
            }

            _this.water += 10;
        }, config.FILL_SPEED);
    };

    Pipe.prototype.rotate = function rotate() {
        if (this.water === 0) {
            this.rotation = ++this.rotation % 4;
        }
    };

    return Pipe;
})();

module.exports = Pipe;

},{"./config":3}],8:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('./config');
var Straight = require('./straight');
var Elbow = require('./elbow');

var Pipes = (function () {
    function Pipes() {
        _classCallCheck(this, Pipes);

        this.populateCells();
    }

    Pipes.prototype.populateCells = function populateCells() {
        var numRows = config.GRID_HEIGHT / config.CELL_SIZE;
        var numCols = config.GRID_WIDTH / config.CELL_SIZE;

        this.cells = [];

        for (var col = 0; col < numCols; col++) {
            this.cells[col] = [];

            for (var row = 0; row < numRows; row++) {
                this.cells[col][row] = this.getRandomPipe(col, row);
            }
        }
    };

    Pipes.prototype.getRandomPipe = function getRandomPipe(col, row) {
        if (Math.random() <= 0.5) {
            return new Elbow(col, row);
        }

        return new Straight(col, row);
    };

    Pipes.prototype.at = function at(col, row) {
        if (this.cells[col] !== undefined && this.cells[col][row] !== undefined) {
            return this.cells[col][row];
        }

        return undefined;
    };

    Pipes.prototype.render = function render(context) {
        this.cells.forEach(function (column) {
            column.forEach(function (pipe) {
                pipe.render(context);
            });
        });
    };

    return Pipes;
})();

module.exports = Pipes;

},{"./config":3,"./elbow":4,"./straight":10}],9:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('./config');

var FPS_INTERVAL = 1000 / config.FPS;
var startTime = undefined;

var RenderManager = (function () {
    function RenderManager(canvas, grid, pipes) {
        _classCallCheck(this, RenderManager);

        this.canvas = canvas;
        this.grid = grid;
        this.pipes = pipes;

        startTime = Date.now();
        this.context = this.canvas.getContext('2d');

        this.render();
    }

    RenderManager.prototype.render = function render() {
        window.requestAnimationFrame(this.render.bind(this));

        var now = Date.now();
        var elapsed = now - startTime;

        if (elapsed > FPS_INTERVAL) {
            startTime = now - elapsed % FPS_INTERVAL;

            // Clear canvas.
            this.context.clearRect(0, 0, config.GRID_WIDTH, config.GRID_HEIGHT);

            // Render all modules.
            this.grid.render(this.context);
            this.pipes.render(this.context);
        }
    };

    return RenderManager;
})();

module.exports = RenderManager;

},{"./config":3}],10:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pipe = require('./pipe');
var config = require('./config');

var Straight = (function (_Pipe) {
    _inherits(Straight, _Pipe);

    function Straight(col, row) {
        _classCallCheck(this, Straight);

        _Pipe.call(this, col, row);
    }

    Straight.prototype.fill = function fill(entry, done) {
        this.entry = entry;

        _Pipe.prototype.fill.call(this, function () {
            return done(entry);
        });
    };

    Straight.prototype.hasEntry = function hasEntry(entry) {
        if (entry === 'top' || entry === 'bottom') {
            return this.rotation === 0 || this.rotation === 2;
        } else {
            return this.rotation === 1 || this.rotation === 3;
        }
    };

    Straight.prototype.render = function render(context) {
        // Create a straight pipe;
        var pipe = new Path2D();

        // Draw the straight.
        pipe.moveTo(5, 15);
        pipe.lineTo(45, 15);
        pipe.moveTo(5, 35);
        pipe.lineTo(45, 35);

        // Save the context before setting translation and rotation.
        context.save();

        // Set the rotation and offset.
        switch (this.rotation) {
            // Horizontal straight.
            case 1:
            case 3:
                context.translate(this.xOffset, this.yOffset);
                break;

            // Vertical straight.
            case 0:
            case 2:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
        }

        context.stroke(pipe);

        // Draw the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(45, 10, 5, 30);

        this.renderWaterLevel(context);

        // Restore context to default translation and rotation.
        context.restore();
    };

    Straight.prototype.renderWaterLevel = function renderWaterLevel(context) {
        if (this.water > 0) {
            context.fillStyle = 'rgb(51, 204, 255)';

            if ((this.rotation === 1 || this.rotation === 3) && this.entry === 'left' || (this.rotation === 0 || this.rotation === 2) && this.entry === 'top') {
                context.fillRect(6, 16, 38 * this.water / 100, 18);
            } else {
                context.fillRect(44 - 38 * this.water / 100, 16, 38 * this.water / 100, 18);
            }
        }
    };

    return Straight;
})(Pipe);

module.exports = Straight;

},{"./config":3,"./pipe":7}]},{},[1]);
