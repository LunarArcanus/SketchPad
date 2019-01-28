"use strict";

// Touch event handling for the canvas

SketchPad.prototype.initTouchEvents = function() {

    this.getOffsetTouch = function(event) {
        var rect = this.canvas.getBoundingClientRect();
        var touches = event.touches[0];
        var offsets = {
            x: touches.clientX - rect.left,
            y: touches.clientY - rect.top
        };
        return offsets;
    }

    this.canvas.addEventListener("touchmove", event => {
        var pos = this.getOffsetTouch(event);
        this.positions = pos;
    });

    this.canvas.addEventListener("touchstart", event => {
        var pos = this.getOffsetTouch(event);
        var x = pos.x;
        var y = pos.y;
        this.positions = pos;

        // If the current tool is a shape, we draw the shape
        // at the clicked position.
        // If it is a brush, the behaviour is a little bit different
        // because we want continuous strokes.
        if (this.currentTool in this.shapes) {
            // Reset line parameters to default
            this.context.lineCap = "butt";
            this.context.lineJoin = "miter";
            this.context.lineWidth = 1.5;
            this.shapes[this.currentTool].draw(this.context, x, y, ...this.args);
        }
        else if (this.currentTool == "brush") {
            this.brush.drawStart();
            this.brush.drawContinue();
            this.canvas.addEventListener("touchmove", this.brush.drawContinue);
        }
    });

    this.canvas.addEventListener("touchend", () => {
        this.canvas.removeEventListener("touchmove", this.brush.drawContinue);
    });
}