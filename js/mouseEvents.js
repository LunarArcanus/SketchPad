"use strict";

// Mouse event handling for the canvas

SketchPad.prototype.initMouseEvents = function() {

    this.getOffsetMouse = function(event) {
        var rect = this.canvas.getBoundingClientRect();
        var offsets = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        return offsets;
    }

    this.canvas.addEventListener("mousemove", event => {
        var pos = this.getOffsetMouse(event);
        this.positions = pos;
    });

    this.canvas.addEventListener("mousedown", () => {
        var pos = this.getOffsetMouse(event);
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
            this.canvas.addEventListener("mousemove", this.brush.drawContinue);
        }
    });

    this.canvas.addEventListener("mouseup", () => {
        this.canvas.removeEventListener("mousemove", this.brush.drawContinue);
    });
}