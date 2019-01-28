"use strict";

SketchPad.prototype.initPage = function() {
    // Declare and initialise variables in relation to various elements on the page
    var canvasArea = document.getElementById("canvas-area");
    var dropDown = document.getElementsByClassName("shapes-dropdown")[0];
    var shapeMenuElement = document.getElementById("shape-menu-button");
    var shapeList = Object.entries(SketchPad.prototype.shapes);
    var modal = document.getElementById("option-modal");
    var brushModal = document.getElementById("option-modal-brush");
    var modalClose; // Modal close button for shape dialog
    var modalCloseBrush; // Modal close button for brush dialog
    var modalContentArea = document.querySelector("#option-modal .w3-modal-content .w3-container");
    var currentToolText = document.getElementById("current-tool");
    var ddownContent = document.querySelector("div.w3-dropdown-content");

    var shapeNode, shapeName, shapeMembers, textNode;

    var brushElement = document.getElementById("brush");
    var clearElement = document.getElementById("clear-canvas");
    var saveElement = document.getElementById("save-canvas");

    var args; // Arguments to the drawing function

    // The default canvas background is transparent, so this function
    // will be used to set it to a solid colour, i.e. white
    // for contrast
    var setBackground = (colour) => {
        var fill = this.context.fillStyle;
        this.context.fillStyle = colour;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = fill; // reset fillStyle to previous value
    };

    var resize = () => {
        var areaW = canvasArea.offsetWidth;
        var areaH = canvasArea.offsetHeight;

        var width = areaW / 1.5;
        var height = (width / 2) - 6; // Minus (the canvas border width  + 1)
        // var height = areaH - 1;

        this.canvas.setAttribute("width", width + 'px');
        this.canvas.setAttribute("height", height + 'px');

        // Saving the image locally triggers resize() and the background is not updated
        // so canvas state is saved here and the background is reset, before the state is restored
        this.context.save();
        setBackground("white");
        this.context.restore();
    };

    // This should fire in the onload event, but in case it doesn't, it is repeated
    setBackground("white");
    window.addEventListener("load", resize);
    window.addEventListener("resize", resize);

    function capitalise(string) {
        return string.substring(0,1).toUpperCase() + string.substring(1, string.length)
    }

    currentToolText.innerText = capitalise(this.currentTool); // Set current tool text to default, i.e. brush

    // Initialise shapes in dropdown
    shapeList.forEach(shape => {
        shapeNode = document.createElement("button");
        shapeName = capitalise(shape[0]);
        textNode = document.createTextNode(shapeName);

        // shapeNode.setAttribute("href", "#");
        shapeNode.className = "shape w3-bar-item w3-button";
        shapeNode.appendChild(textNode);
        dropDown.appendChild(shapeNode);

        // Add event handler to each shape
        shapeNode.addEventListener("click", event => {
            shapeMembers = shape[1];

            this.currentTool = event.target.innerText.toLowerCase();
            currentToolText.innerText = capitalise(this.currentTool);
            modalContentArea.innerHTML = shapeMembers.options.trim();
            modal.style.display = 'block';

            // Close the dropdown menu
            if (ddownContent.className.indexOf("w3-show")) {
                ddownContent.className = ddownContent.className.replace(" w3-show", " w3-hide");
            }

            modalClose = document.getElementById("modal-close-button");
            modalClose.addEventListener("click", () => {
                this.clearArgs();
                args = [];
                var _args = document.getElementsByClassName("drawing-options");
                for (var i = 0; i < _args.length; i++) {
                    args.push(_args[i].value);
                }
                this.args = args;
                modal.style.display = 'none'
            });
        });
    });


    brushElement.addEventListener("click", () => {
        this.currentTool = "brush";
        currentToolText.innerText = "Brush";
        brushModal.style.display = 'block';

        modalCloseBrush = document.getElementById("modal-close-button-brush");
        modalCloseBrush.addEventListener("click", () => {
            this.clearArgs();
            args = [];
            var brushWidth = document.getElementsByClassName("brush-width")[0];
            var strokeColours = document.getElementsByClassName("stroke-colour");
            args.push(Math.abs(parseInt(brushWidth.value)));
            for (var i = 0; i < strokeColours.length; i++) {
                if (strokeColours[i].checked) {
                    args.push(strokeColours[i].value);
                }
            }
            this.args = args;
            brushModal.style.display = 'none';
        });
    });

    shapeMenuElement.addEventListener("click", () => {
        if (ddownContent.className.indexOf("w3-show") == -1) {
            ddownContent.className += " w3-show";
        }
        else { 
            ddownContent.className = ddownContent.className.replace(" w3-show", "");
        }
    });

    clearElement.addEventListener("click", () => {
        // Clear the canvas and re-add the white background
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        setBackground("white");
    });

    saveElement.addEventListener("click", () => {
        var date = new Date();
        var dateString = date.getFullYear() + "-" + (parseInt(date.getMonth()+1)) + "-" + date.getDate();
        var data = this.canvas.toDataURL("image/png");
        var downloadName = dateString + " Eynar-drawn-image.png";
        saveElement.setAttribute("download", downloadName);
        saveElement.setAttribute("href", data);
    });
}