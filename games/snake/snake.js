const POINTS_TEXT_X = 5;
const POINTS_TEXT_Y_BUFFER = 5;
const POINTS_FONT = "17pt Arial";

const FOOD_DELAY = 6000;
const FOOD_RADIUS = 7;
const FOOD_COLOR = "green";

const SNAKE_DIM = 10;  // size of the snake
const SNAKE_COLOR = "purple";
const DELAY = 100; // how often the snake should be drawn

// track snake's movement
let dx, dy;
let snake;
let direction;
let food;
let currentPoints = 0;
let points;

function main(){
   initSnake();
   dx = SNAKE_DIM;
   dy = 0;
   setTimer(moveSnake, DELAY);
   keyDownMethod(changeDirection);
   setTimer(generateFood, FOOD_DELAY);
}

function initSnake() {
    snake = new Rectangle(SNAKE_DIM, SNAKE_DIM);
    snake.setPosition(getWidth() / 2 - SNAKE_DIM, getHeight() / 2 - SNAKE_DIM);
    snake.setColor(SNAKE_COLOR);
    add(snake);
}

function moveSnake() {
    remove(points);
    
    checkCollision();
    
    let snakeCurrent = new Rectangle(SNAKE_DIM, SNAKE_DIM);
    snakeCurrent.setPosition(snake.getX(), snake.getY());
    snakeCurrent.setColor(SNAKE_COLOR);
    add(snakeCurrent);
    snakeCurrent.move(dx, dy);
    snake = snakeCurrent;
    
    checkWallCollisions();
    
    pointCounter();
    currentPoints += 1;
}

function changeDirection(e) {
    if (e.key == "ArrowLeft") {
        dx = -SNAKE_DIM;
        dy = 0;
        direction = "left";
    } else if (e.key == "ArrowRight") {
        dx = SNAKE_DIM;
        dy = 0;
        direction = "right";
    } else if (e.key == "ArrowUp") {
        dx = 0;
        dy = -SNAKE_DIM;
        direction = "up";
    } else if (e.key == "ArrowDown") {
        dx = 0;
        dy = SNAKE_DIM;
        direction = "down";
    }
}
//add one to top and bottom getX to avoid errors with left anchor point position
function checkCollision() {
    let leftElement = getElementAt(snake.getX() - SNAKE_DIM - 2, snake.getY() + 2);
    let rightElement = getElementAt(snake.getX() + SNAKE_DIM + 2, snake.getY() + 2);
    let topElement = getElementAt(snake.getX() + 2, snake.getY() - SNAKE_DIM - 2);
    let bottomElement = getElementAt(snake.getX() + 2, snake.getY() + SNAKE_DIM + 2);
    
    
    if (direction == "left") {
        if (leftElement != null) {
            if (leftElement.getType() == "Rectangle") {
                stopTimer(moveSnake);
                stopTimer(generateFood);
                gameOver();
            } else if (leftElement.getType() == "Circle") {
                remove(food);
                currentPoints += 100;
            }        
        }
    } else if (direction == "right") {
        if (rightElement != null) {
            if (rightElement.getType() == "Rectangle") {
                stopTimer(moveSnake);
                stopTimer(generateFood);
                gameOver();
            } else if (rightElement.getType() == "Circle") {
                remove(food);
                currentPoints += 100;
            } 
        }
    } else if (direction == "up") {
        if (topElement != null) {
            if (topElement.getType() == "Rectangle") {
                stopTimer(moveSnake);
                stopTimer(generateFood);
                gameOver();
            } else if (topElement.getType() == "Circle") {
                remove(food);
                currentPoints += 100;
            } 
        }
    } else if (direction == "down") {
        if (bottomElement != null) {
            if (bottomElement.getType() == "Rectangle") {
                stopTimer(moveSnake);
                stopTimer(generateFood);
                gameOver();
            } else if (bottomElement.getType() == "Circle") {
                remove(food);
                currentPoints += 100;
            } 
        }
    }
}

function checkWallCollisions() {
    if (snake.getX() > getWidth()) {
        snake.setPosition(0, snake.getY());
    } else if (snake.getX() < 0) {
        snake.setPosition(getWidth(), snake.getY());
    } else if (snake.getY() > getHeight()) {
        snake.setPosition(snake.getX(), 0);
    } else if (snake.getY() < 0) {
        snake.setPosition(snake.getX(), getHeight());
    }
}

function gameOver() {
    let txt = new Text("Game over!", "30pt Arial");
    txt.setPosition(getWidth() / 2 - txt.getWidth() / 2 , getHeight() / 2 - txt.getHeight() / 2);
    txt.setColor("red");
    add(txt);
    txt.layer = 10;
}

function generateFood() {
    let x = Randomizer.nextInt(FOOD_RADIUS, getWidth() - FOOD_RADIUS);
    let y = Randomizer.nextInt(FOOD_RADIUS, getHeight() - FOOD_RADIUS);
    food = new Circle(FOOD_RADIUS);
    food.setColor(FOOD_COLOR);
    food.setPosition(x, y);
    add(food);
}

function pointCounter() {
    points = new Text(currentPoints, "12pt Arial");
    points.setPosition(10, getHeight() - points.getHeight());
    points.setColor("red");
    points.layer = 9;
    add(points);
}
main();