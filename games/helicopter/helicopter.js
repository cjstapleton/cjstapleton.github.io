// fix how dust is removed, causes game to freeze after about two seconds

const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 100;
const NUM_OBSTACLES = 3;

const MAX_DY = 12;
let SPEED = 5;

let copter;
let dy = SPEED;

let clicking = false;

const POINTS_PER_ROUND = 5;
let points = 0;
let score;

let DUST_RADIUS = 3;
let DUST_BUFFER = 10;

let TERRAIN_WIDTH = 10;
let MIN_TERRAIN_HEIGHT = 20;
let MAX_TERRAIN_HEIGHT = 50;

let top_terrain = [];
let bottom_terrain = [];
let dust = [];
let obstacles = [];

function main(){
    let DELAY;
    
    while (true) {
        let difficulty = readInt("1 for easy, 2 for medium, 3 for hard ");
        if (difficulty == 1) {
            DELAY = 50;
            break;
        } else if (difficulty == 2) {
            DELAY = 40;
            break;
        } else if (difficulty == 3) {
            DELAY = 30;
            break;
        }
    }
    
    initGame();
    setTimer(game, DELAY);
    mouseUpMethod(mouseUp);
    mouseDownMethod(mouseDown);
}1

function initGame() {
    setBackgroundColor(Color.black);
    
    copter = new WebImage("https://codehs.com/uploads/15abed95d2a8657f836b0ffb6e8c6cb0");
    copter.setSize(50, 25);
    copter.setPosition(getWidth() / 3, getHeight() / 2);
    copter.setColor(Color.blue);
    add(copter);
    
    addObstacles();
    addTerrain();
    
    score = new Text("0");
    score.setColor(Color.white);
    score.setPosition(10, 30);
    add(score);
}

function updateScore() {
    points += POINTS_PER_ROUND;
    score.setText(points);
}

function game() {
    updateScore();
    
    if (hitWall()) {
        lose();
        return;
    }
    
    let collider = getCollider();
    if (collider != null && collider != copter && collider.getColor != "black") {
        lose();
        return;
    }
    
    if (clicking) {
        dy -= 1;
        if (dy < -MAX_DY) {
            dy = -MAX_DY;
        }
    } else {
        dy += 1;
        if (dy > MAX_DY) {
            dy = MAX_DY;
        }
    }
    
    copter.move(0, dy);
    moveObstacle();
    moveTerrain();
    moveDust();
    //addDust();
}

function mouseUp(e) {
    clicking = false;
}

function mouseDown(e) {
    clicking = true;
}

function addObstacles() {
    for (let i = 0; i < NUM_OBSTACLES; i++) {
        let obstacle = new Rectangle(OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
        obstacle.setColor(Color.green);
        obstacle.setPosition(getWidth() + i * (getWidth() / NUM_OBSTACLES), Randomizer.nextInt(0, getHeight() - OBSTACLE_HEIGHT));
        obstacles.push(obstacle);
        add(obstacle);
    }    
}

function moveObstacle() {
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.move(-SPEED, 0);
        if (obstacle.getX() + OBSTACLE_WIDTH < 0) {
            obstacle.setPosition(getWidth(), Randomizer.nextInt(0, getHeight() - OBSTACLE_HEIGHT));
        }
    }
}

function hitWall() {
    let hitTop = copter.getY() < 0;
    let hitBottom = copter.getY() + copter.getHeight() > getHeight();
    
    return hitTop || hitBottom;
}

function lose() {
    stopTimer(game);
    let loseText = new Text("You Lose!");
    loseText.setColor(Color.red);
    loseText.setPosition(getWidth() / 2 - loseText.getWidth() / 2, getHeight() / 2);
    add(loseText);
}

function getCollider() {
    let topLeft = getElementAt(copter.getX() - 1, copter.getY() - 1);
    if (topLeft != null) {
        return topLeft;
    }
    
    let topRight = getElementAt(copter.getX() + copter.getWidth() + 1, copter.getY() -1 );
    if (topRight != null) {
        return topRight;
    }
    
    let bottomLeft = getElementAt(copter.getX() - 1, copter.getY() + copter.getHeight() + 1);
    if (bottomLeft != null) {
        return bottomLeft;
    }
    
    let bottomRight = getElementAt(copter.getX() + copter.getWidth() + 1, copter.getY() + copter.getHeight() + 1);
    if (bottomRight != null) {
        return bottomRight;
    }
    
    return null;
}

function addTerrain() {
    for (let i = 0; i < getWidth() / TERRAIN_WIDTH; i++) {
        let height = Randomizer.nextInt(MIN_TERRAIN_HEIGHT, MAX_TERRAIN_HEIGHT);
        let terrain = new Rectangle(TERRAIN_WIDTH, height);
        terrain.setPosition(TERRAIN_WIDTH * i, 0);
        terrain.setColor(Color.green);
        top_terrain.push(terrain);
        add(terrain);
        
        height = Randomizer.nextInt(MIN_TERRAIN_HEIGHT, MAX_TERRAIN_HEIGHT);
        let bottomTerrain = new Rectangle(TERRAIN_WIDTH, height);
        bottomTerrain.setPosition(TERRAIN_WIDTH * i, getHeight() - bottomTerrain.getHeight());
        bottomTerrain.setColor(Color.green);
        bottom_terrain.push(bottomTerrain);
        add(bottomTerrain);
    }
}

function moveTerrain() {
    for (let i = 0; i < top_terrain.length; i++) {
        let obj = top_terrain[i];
        obj.move(-SPEED, 0);
        if (obj.getX() < -obj.getWidth()) {
            obj.setPosition(getWidth(), 0);
        }
    }
    
    for (let i = 0; i < bottom_terrain.length; i++) {
        let obj = bottom_terrain[i];
        obj.move(-SPEED, 0);
        if (obj.getX() < -obj.getWidth()) {
            obj.setPosition(getWidth(), getHeight() - obj.getHeight());
        }
    }
}

function addDust() {
    let d = new Circle(DUST_RADIUS);
    d.setColor("#cccccc");
    d.setPosition(copter.getX() - d.getWidth(), copter.getY() + DUST_BUFFER);
    dust.push(d);
    add(d);
}

function moveDust() {
    for (let i = 0; i < dust.length; i++) {
        let d = dust[i];
        d.move(-SPEED, 0);
        d.setRadius(d.getRadius() - .1);
        if (d.getX() < 0) {
            remove(d);
            dust.remove(i);
            i--;
        }
    }
}
main();