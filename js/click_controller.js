class ClickController {
    constructor(canvas, pipes) {
        this.canvas = document.getElementById('game-canvas');
        this.pipes = pipes;

        this.canvas.addEventListener('click', this.getClickHandler(), false);
    }

    getClickHandler() {
        return e => {
            const col = Math.floor((e.pageX - this.canvas.offsetLeft) / 50);
            const row = Math.floor((e.pageY - this.canvas.offsetTop) / 50);

            this.pipes.at(col, row).rotate();
        };
    }
}

module.exports = ClickController;
