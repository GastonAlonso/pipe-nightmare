(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var GameManager = require('./game_manager');

window.onload = function () {
    new GameManager();
};

},{"./game_manager":4}],2:[function(require,module,exports){
"use strict";

module.exports = {
    GRID_WIDTH: 1000,
    GRID_HEIGHT: 600,
    CELL_SIZE: 50
};

},{}],3:[function(require,module,exports){
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
            // Left-Bottom.
            case 1:
                context.translate(this.xOffset, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI * 1.5);
                break;
            // Right-Top.
            case 2:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
                break;
            // Right-Bottom.
            case 3:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset + config.CELL_SIZE);
                context.rotate(Math.PI);
        }

        // Stroke the elbow.
        context.stroke(pipe);

        // Draw the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(10, 0, 30, 5);

        // Restore context to default translation and rotation.
        context.restore();
    };

    return Elbow;
})(Pipe);

module.exports = Elbow;

},{"./config":2,"./pipe":6}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Grid = require('./grid');
var Pipes = require('./pipes');
var RenderManager = require('./render_manager');

var GameManager = function GameManager() {
    _classCallCheck(this, GameManager);

    this.grid = new Grid();
    this.pipes = new Pipes();

    this.RenderManager = new RenderManager(this.grid, this.pipes);
};

module.exports = GameManager;

},{"./grid":5,"./pipes":7,"./render_manager":8}],5:[function(require,module,exports){
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

},{"./config":2}],6:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('./config');

var Pipe = (function () {
    function Pipe(col, row) {
        _classCallCheck(this, Pipe);

        this.col = col;
        this.row = row;

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

    return Pipe;
})();

module.exports = Pipe;

},{"./config":2}],7:[function(require,module,exports){
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
        var random = Math.random();

        if (random <= 0.5) {
            return new Elbow(col, row);
        }

        return new Straight(col, row);
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

},{"./config":2,"./elbow":3,"./straight":9}],8:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('./config');

var RenderManager = (function () {
    function RenderManager(grid, pipes) {
        _classCallCheck(this, RenderManager);

        this.canvas = document.getElementById('game-canvas');

        this.grid = grid;
        this.pipes = pipes;

        window.requestAnimationFrame(this.render.bind(this));
    }

    RenderManager.prototype.render = function render() {
        var context = this.canvas.getContext('2d');

        // Clear canvas.
        context.clearRect(0, 0, config.GRID_WIDTH, config.GRID_HEIGHT);

        // Render all modules.
        this.grid.render(context);
        this.pipes.render(context);

        window.requestAnimationFrame(this.render.bind(this));
    };

    return RenderManager;
})();

module.exports = RenderManager;

},{"./config":2}],9:[function(require,module,exports){
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
            case 0:
            case 1:
                context.translate(this.xOffset, this.yOffset);
                break;

            // Vertical straight.
            case 2:
            case 3:
                context.translate(this.xOffset + config.CELL_SIZE, this.yOffset);
                context.rotate(Math.PI / 2);
        }

        // Stroke the straight.
        context.stroke(pipe);

        // Stroke the pipe couplings.
        context.strokeRect(0, 10, 5, 30);
        context.strokeRect(45, 10, 5, 30);

        // Restore context to default translation and rotation.
        context.restore();
    };

    return Straight;
})(Pipe);

module.exports = Straight;

},{"./config":2,"./pipe":6}]},{},[1]);
