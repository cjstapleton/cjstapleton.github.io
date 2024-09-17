// fix that one thing from the ap test, it was about function parameters

let colors = ["red", "green", "blue", "purple", "pink", "yellow", "black", "orange"];
let brush = "Circle";
let brushSize = 20;
let color = "black";

function main() {
	initCanvas();
	mouseDragMethod(draw);
	mouseClickMethod(utilityChoice);
	keyDownMethod(brushSizeHandler);
}

// Initialize pencil and eraser, brush types, and colors
function initCanvas() {
	setSize(1250, 725); 

	let editorBorder = new Line(1100, 0, 1100, getHeight());
	editorBorder.setLineWidth(5);
	add(editorBorder);

	// pencil and eraser
	let pencil = new WebImage("https://cdn-icons-png.flaticon.com/512/5772/5772465.png");
	pencil.setSize(100, 100);
	pencil.setPosition(1125, 0);
	//pencil.debug = true;
	pencil.tag = "Pencil";
	add(pencil);

	let eraser = new WebImage("https://static.thenounproject.com/png/177493-200.png");
	eraser.setSize(75, 75);
	eraser.setPosition(1135, 115);
	//eraser.debug = true;
	eraser.tag = "Eraser";
	add(eraser);

	initColorChoices(1120, 250);

	let colorWheelBorder = new Rectangle(60, 60);
	colorWheelBorder.setPosition(1150, 525);
	add(colorWheelBorder);

	let colorWheel = new WebImage("https://codehs.com/uploads/717651788aa543cc41a6c001d6e89fd0");
	colorWheel.setSize(50, 50);
	colorWheel.setPosition(1155, 530);
	colorWheel.tag = "Color Wheel";
	add(colorWheel);

	// brushes

	let squareBrush = new Rectangle(50, 50);
	squareBrush.setPosition(1120, 625);
	squareBrush.name = "squareBrush";
	add(squareBrush);

	let circleBrush = new Circle(25);
	circleBrush.setPosition(1215, 650);
	circleBrush.name = "circleBrush";
	add(circleBrush);
}

function initColorChoices(x, y) {
	let color;

	for (let i = 0; i < 8; i++) {
		if (i <= 3) {
				color = colors[i];

				drawColorChoices(x, y, color);
				y += 65;
		} else if (i == 4) {
				y = 250;
				x = 1185; 
				color = colors[i];

				drawColorChoices(x, y, color);
				y += 65;
		} else {
				color = colors[i];

				drawColorChoices(x, y, color);
				y += 65;
		}
	}
}

function drawColorChoices(x, y, color) {
	let colorBorder = new Rectangle(50, 50);
	colorBorder.setPosition(x, y);
	add(colorBorder);

	let colorSquare = new Rectangle(40, 40);
	colorSquare.setPosition(x + 5, y + 5);
	colorSquare.setColor(color);
	add(colorSquare);
}

function draw(e) {
	if (brush == "Rectangle" && e.getX() < 1100) {
		let drawing = new Rectangle(brushSize, brushSize);
		drawing.setPosition(e.getX(), e.getY());
		drawing.setColor(color);
		add(drawing);
	} else if (brush == "Circle" && e.getX() < 1100) {
		let drawing = new Circle(brushSize);
		drawing.setPosition(e.getX(), e.getY());
		drawing.setColor(color);
		add(drawing);
	} else if (brush == "Eraser" && e.getX() < 1100) {
				remove(getElementAt(e.getX(), e.getY()));
		}
}

function utilityChoice(e) {
	let currentObj = getElementAt(e.getX(), e.getY());
	// view object properties
	//console.log(currentObj);

	//identify color choices by type and coordinates
	if (e.getX() > 1100 && currentObj != null && currentObj.getWidth() == 40) {
		color = currentObj.color;
	} else if (e.getX() > 1100 && currentObj != null && currentObj.getType() == "Rectangle") {
			// square brush
			brush = currentObj.getType();
	} else if (e.getX() > 1100 && currentObj != null && currentObj.getType() == "Circle") {
				// circle brush
				brush = currentObj.getType();
	} else if (e.getX() > 1100 && currentObj != null && currentObj.getType() == "WebImage") {
		if (currentObj.tag == "Eraser") {
				brush = "Eraser";
		} else if (currentObj.tag == "Pencil") {
				brush = "Circle";
		} else if (currentObj.tag == "Color Wheel") {
				let r = readInt("R value: ");
                while (r < 0 || r > 255) {
                    alert("Please enter a value from 0 - 255.");
                    r = readInt("R value: "); 
                }
                    
				let g = readInt("G value: ");
                while (g < 0 || g > 255) {
                    alert("Please enter a value from 0 - 255.");
                    g = readInt("G value: "); 
                }

				let b = readInt("B value: ");
                while (b < 0 || b > 255) {
                    alert("Please enter a value from 0 - 255.");
                    b = readInt("B value: "); 
                }

				let userColor = new Color(r, g, b);

				color = userColor;
		}
	}
}

function brushSizeHandler(e) {
		if (e.key == "ArrowUp") {
			brushSize += 2;
			console.log(brushSize);
	} else if (e.key == "ArrowDown") {
			brushSize -= 2;
			console.log(brushSize);
	}
}


main();