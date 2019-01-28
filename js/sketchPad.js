"use strict";

function SketchPad() {
    var self = this;
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.positions = {}; // relative x and y positions cursor events
    this.currentTool = "brush"; // specific tool, e.g. circle or brush
    this.args = [1, "black"]; // default args, for brush

    this.clearArgs = function() {
        this.args = [];
    }

    this.brush = {
        drawStart: function() {
            var x = this.positions.x;
            var y = this.positions.y;
            this.context.lineJoin = "round";
            this.context.lineCap = "round";

            // For brush args: args[0] is line width and args[1] is line colour
            this.context.lineWidth = this.args[0];
            this.context.strokeStyle = this.args[1]; // black is default
            
            this.context.beginPath();
            this.context.moveTo(x, y);
        }.bind(self),
    
        drawContinue: function() {
            var x = this.positions.x;
            var y = this.positions.y;
            this.context.lineTo(x, y);
            this.context.stroke();
        }.bind(self)
    }

    this.initMouseEvents();
    this.initTouchEvents();
}