class ClickController {
    constructor(canvas, pipes) {
        this.canvas = canvas;
        this.pipes  = pipes;

        this.canvas.addEventListener('click', this.handleClick.bind(this), false);
    }

    handleClick(evt) {
        const col = Math.floor((evt.pageX - this.canvas.offsetLeft) / 50);
        const row = Math.floor((evt.pageY - this.canvas.offsetTop) / 50);

        this.pipes.at(col, row).rotate();
    }
}

export default ClickController;
