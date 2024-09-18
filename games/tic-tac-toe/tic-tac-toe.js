const WIDTH = 400;
const HEIGHT = 400;
setSize(WIDTH, HEIGHT);

const WINNING_LINE_WIDTH = 10;
const WINNING_LINE_COLOR = "red";

let board = new Grid(3, 3);
// 1 for x 2 for o
let turn = "O";

function main() {
	board.init(0);
	initGrid();
	mouseClickMethod(handleClick);
}

function initGrid() {
    let verticalLineOne = new Line(getWidth() / 3, 0, getWidth() / 3, getHeight());
    add(verticalLineOne);
    
    let verticalLineTwo = new Line(getWidth() / 3 * 2, 0, getWidth() / 3 * 2, getHeight());
    add(verticalLineTwo);
    
    let horizontalLineOne = new Line(0, getHeight() / 3, getWidth(), getHeight() / 3);
    add(horizontalLineOne);
    
    let horizontalLineTwo = new Line(0, getHeight() / 3 * 2, getWidth(), getHeight() / 3 * 2);
    add(horizontalLineTwo);
}

function handleClick(e) {
    let x = e.getX();
    let y = e.getY();
    
    let row = getRowForClick(y);
    
    let col = getColForClick(x);
    
    if (turn == "X" && board.get(row, col) == 0) {
        drawX(row, col);
        turn = "O";
        board.set(row, col, "X");
    } else if (turn == "O" && board.get(row, col) == 0) {
        drawO(row, col);
        turn = "X";
        board.set(row, col, "O");
    }
    //debug to print board grid
    //console.log(board);
    
    checkForWinners(row, col);
}

//use helper functions in handleClick
function getRowForClick(y) {
    if (y <= getHeight() / 3) {
        return(0);
    } else if (y <= getHeight() / 3 * 2) {
        return(1);
    } else {
        return(2);
    }
}

function getColForClick(x) {
    if (x <= getWidth() / 3) {
        return(0);
    } else if (x <= getWidth() / 3 * 2) {
        return(1);
    } else {
        return(2);
    }
}

function drawX(row, col) {
    let x;
    let y;
    
    if (row == 0) {
        y = getHeight() / 6;
    } else if (row == 1) {
        y = getHeight() / 2;
    } else {
        y = getHeight() / 3 * 2 + getHeight() / 6;
    }
    
    if (col == 0) {
        x = getWidth() / 6;
    } else if (col == 1) {
        x = getWidth() / 2;
    } else {
        x = getWidth() / 3 * 2 + getWidth() / 6;
    }
    
    
    let xGraphicOne = new Rectangle(100, 3);
    xGraphicOne.setAnchor({vertical: .5, horizontal: .5});
    xGraphicOne.setPosition(x, y);
    xGraphicOne.setRotation(45, 0);
    add(xGraphicOne)
    
    let xGraphicTwo = new Rectangle(100, 3);
    xGraphicTwo.setAnchor({vertical: .5, horizontal: .5});
    xGraphicTwo.setPosition(x, y);
    xGraphicTwo.setRotation(-45, 0);
    add(xGraphicTwo)
}

function drawO(row, col) {
    let x;
    let y;
    
    if (row == 0) {
        y = getHeight() / 6;
    } else if (row == 1) {
        y = getHeight() / 2;
    } else {
        y = getHeight() / 3 * 2 + getHeight() / 6;
    }
    
    if (col == 0) {
        x = getWidth() / 6;
    } else if (col == 1) {
        x = getWidth() / 2;
    } else {
        x = getWidth() / 3 * 2 + getWidth() / 6;
    }
    
    let oGraphic = new Circle(50);
    oGraphic.setPosition(x, y);
    oGraphic.setBorder(true);
    oGraphic.setFilled(false);
    add(oGraphic);
}

function winnerInRow(row) {
    let rowStatus = "";
    
    for (let i = 0; i < 3; i++) {
        rowStatus += board.get(row, i);
    }
    
    if (rowStatus == "OOO" || rowStatus == "XXX") {
        return(true);
    } else {
        return(false);
    }
}

function winnerInCol(col) {
    let colStatus = "";
    
    for (let i = 0; i < 3; i++) {
        colStatus += board.get(i, col);
    }
    
    if (colStatus == "OOO" || colStatus == "XXX") {
        return(true);
    } else {
        return(false);
    }
}

function winnerInDownDiagonal() {
    let topLeft = board.get(0, 0);
    let middle = board.get(1, 1);
    let bottomRight = board.get(2, 2);
    
    let diagonal = topLeft + middle + bottomRight;

    if (diagonal == "XXX" || diagonal == "OOO") {
        return(true);
    } else {
        return(false);
    }
}

function winnerInUpDiagonal() {
    let topRight = board.get(2, 0);
    let middle = board.get(1, 1);
    let bottomLeft = board.get(0, 2);
    
    let diagonal = topRight + middle + bottomLeft;

    if (diagonal == "XXX" || diagonal == "OOO") {
        return(true);
    } else {
        return(false);
    }
}

function checkForWinners(row, col) {
    let winLineY;
    let winLineX;
    
    winnerInRow(row);
    winnerInCol(col);
    winnerInDownDiagonal();
    winnerInUpDiagonal();
    
    if (row == 0) {
        winLineY = getHeight() / 3 / 2;
    } else if (row == 1) {
        winLineY = getHeight() / 2
    } else {
        winLineY = getHeight() - getHeight() / 3 / 2;
    }
    
    if (col == 0) {
        winLineX = getWidth() / 3 / 2;
    } else if (col == 1) {
        winLineX = getWidth() / 2;
    } else if (col == 2) {
        winLineX = getWidth() - getWidth() / 3 / 2;
    }
    
    if (winnerInRow(row)) {
        let winLine = new Rectangle(getWidth(), WINNING_LINE_WIDTH);
        winLine.setColor(WINNING_LINE_COLOR);
        winLine.setPosition(0, winLineY);
        add(winLine);
    } else if (winnerInCol(col)) {
        let winLine = new Rectangle(WINNING_LINE_WIDTH, getHeight());
        winLine.setColor(WINNING_LINE_COLOR);
        winLine.setPosition(winLineX, 0);
        add(winLine); 
    } else if (winnerInDownDiagonal()) {
        let winLine = new Line(0, 0, getWidth(), getHeight());
        winLine.setColor(WINNING_LINE_COLOR);
        winLine.setLineWidth(WINNING_LINE_WIDTH);
        add(winLine);
    } else if (winnerInUpDiagonal()) {
        let winLine = new Line(getWidth(), 0, 0, getHeight());
        winLine.setColor(WINNING_LINE_COLOR);
        winLine.setLineWidth(WINNING_LINE_WIDTH);
        add(winLine);
    }
}

main();