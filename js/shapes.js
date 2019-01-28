"use strict";

SketchPad.prototype.colours = {
    getStrokeColour: function() {
        var strokeColourElements = document.getElementsByName("stroke-colour");
        var strokeColour = 'black';

        for (var i = 0; i < strokeColourElements.length; i++) {
            if (strokeColourElements[i].checked) {
                strokeColour = strokeColourElements[i].value;
            }
        }
        return strokeColour;
    },

    getFillColour: function() {
        var fillColourElements = document.getElementsByName("fill-colour");
        var fillColour = 'white';

        for (var i = 0; i < fillColourElements.length; i++) {
            if (fillColourElements[i].checked) {
                fillColour = fillColourElements[i].value;
            }
        }
        return fillColour;
    }
}

SketchPad.prototype.shapes = {
    circle: {
        draw: function(context, x, y, r) {
            r = Math.abs(parseInt(r));
            
            context.beginPath();
            context.strokeStyle = SketchPad.prototype.colours.getStrokeColour();
            context.fillStyle = SketchPad.prototype.colours.getFillColour();
            context.arc(x, y, r, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
            context.closePath();
        },
        options: `
            <div id="circle-options">
                <p>
                    <label>Circle Radius</label>
                    <input class="w3-input w3-center w3-margin drawing-options circle-radius" min="1" placeholder="Radius" type="number" value="10" />
                </p>

                <div class="w3-center option-heading">Stroke Colour</div>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="black" checked />
                    <label>Black</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="red" />
                    <label class="w3-text-red">Red</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="orange" />
                    <label class="w3-text-orange">Orange</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="green" />
                    <label class="w3-text-green">Green</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="blue" />
                    <label class="w3-text-blue">Blue</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="yellow" />
                    <label class="w3-text-yellow">Yellow</label>
                </p>

                <div class="w3-center option-heading">Fill Colour</div>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="black" />
                    <label>Black</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="white" checked />
                    <label>White</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="red" />
                    <label class="w3-text-red">Red</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="orange" />
                    <label class="w3-text-orange">Orange</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="green" />
                    <label class="w3-text-green">Green</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="blue" />
                    <label class="w3-text-blue">Blue</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="yellow" />
                    <label class="w3-text-yellow">Yellow</label>
                </p>
            </div>
        `
    },

    rectangle: {
        draw: function(context, x, y, w, h) {
            w = Math.abs(parseInt(w));
            h = Math.abs(parseInt(h));
            context.beginPath();
            context.strokeStyle = SketchPad.prototype.colours.getStrokeColour();
            context.fillStyle = SketchPad.prototype.colours.getFillColour();
            context.rect(x, y, w, h)
            context.stroke();
            context.fill();
            context.closePath();
        },
        options: `
            <div id="rect-options">
                <label>Width</label>
                <input class="w3-input w3-center w3-margin drawing-options rect-width" min="1" placeholder="Width" type="number" value="10" />
                <label>Height</label>
                <input class="w3-input w3-center w3-margin drawing-options rect-height" min="1" placeholder="Height" type="number" value="10" />

            <div class="w3-center option-heading">Stroke Colour</div>
                
            <p>
                <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="black" checked />
                <label>Black</label>
            </p>
            
            <p>
                <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="red" />
                <label class="w3-text-red">Red</label>
            </p>

            <p>
                <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="orange" />
                <label class="w3-text-orange">Orange</label>
            </p>
            
            <p>
                <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="green" />
                <label class="w3-text-green">Green</label>
            </p>
            
            <p>
                <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="blue" />
                <label class="w3-text-blue">Blue</label>
            </p>

            <p>
                <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="yellow" />
                <label class="w3-text-yellow">Yellow</label>
            </p>

            <div class="w3-center option-heading">Fill Colour</div>

            <p>
                <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="black" />
                <label>Black</label>
            </p>

            <p>
                <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="white" checked />
                <label>White</label>
            </p>
            
            <p>
                <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="red" />
                <label class="w3-text-red">Red</label>
            </p>

            <p>
                <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="orange" />
                <label class="w3-text-orange">Orange</label>
            </p>
            
            <p>
                <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="green" />
                <label class="w3-text-green">Green</label>
            </p>
            
            <p>
                <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="blue" />
                <label class="w3-text-blue">Blue</label>
            </p>

            <p>
                <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="yellow" />
                <label class="w3-text-yellow">Yellow</label>
            </p>
        </div>
        `
    },

    triangle: {
        draw: function(context, x, y, side) {
            side = Math.abs(parseInt(side));
            var height = side * Math.cos(Math.PI/6);
            context.beginPath();
            context.strokeStyle = SketchPad.prototype.colours.getStrokeColour();
            context.fillStyle = SketchPad.prototype.colours.getFillColour();
            context.moveTo(x, y-height);
            context.lineTo(x-side, y+height);
            context.lineTo(x+side, y+height);
            context.closePath();
            context.stroke();
            context.fill();
        },
        options: `
            <div id="tri-options">
                <label>Side Length</label>
                <input class="w3-input w3-center w3-margin drawing-options tri-length" min="1" placeholder="Length" type="number" value="10" />

                <div class="w3-center option-heading">Stroke Colour</div>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="black" checked />
                    <label>Black</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="red" />
                    <label class="w3-text-red">Red</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="orange" />
                    <label class="w3-text-orange">Orange</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="green" />
                    <label class="w3-text-green">Green</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="blue" />
                    <label class="w3-text-blue">Blue</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options stroke-colour" type="radio" name="stroke-colour" value="yellow" />
                    <label class="w3-text-yellow">Yellow</label>
                </p>

                <div class="w3-center option-heading">Fill Colour</div>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="black" />
                    <label>Black</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="white" checked />
                    <label>White</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="red" />
                    <label class="w3-text-red">Red</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="orange" />
                    <label class="w3-text-orange">Orange</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="green" />
                    <label class="w3-text-green">Green</label>
                </p>
                
                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="blue" />
                    <label class="w3-text-blue">Blue</label>
                </p>

                <p>
                    <input class="w3-radio w3-margin drawing-options fill-colour" type="radio" name="fill-colour" value="yellow" />
                    <label class="w3-text-yellow">Yellow</label>
                </p>
            </div>
        `
    }
};