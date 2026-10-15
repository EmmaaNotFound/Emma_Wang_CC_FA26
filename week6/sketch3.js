let doors = [];
let frames = [];
let order = [];
let progress = 0;
let canEnter = true;
let g = 102; // background fade

async function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(22);
    
    for (let i = 0; i < 5; i++) {
        let door = {
            x: random(10, width-30),
            y: random(100, height-50),
            width: 30,
            height: 60,
            color: color(random(255), random(255), random(255)),
            entered: false
        };
        doors.push(door);
    }
    
    frameRate(20);
    rectMode(CENTER);
    imageMode(CENTER);

    for (let i = 1; i <= 2; i++) {
        frames[i-1] = await loadImage("sequence/" + i + ".png");
        
    }

     // have a designated order that you need to pass through
    order = shuffle([0, 1, 2, 3, 4]);
}

let counter = 0;
let xLoc = 0;
let yLoc = 423;
let xV = 7.5;
let yV = 7.5;
let dir = 1;

function draw() {
     background(0, 102, 0);
     text("Enter the doors in the correct order to unlock the mystery space!", width/2, 30);

    // draw several doors
    noStroke();
    for (let door of doors) {
        fill(door.entered ? "green" : door.color);
        rect(door.x, door.y, door.width, door.height);
        fill(255);
        circle(door.x+8, door.y, 8);
    }

    let currentFrame = frames[counter%frames.length];
    
   let nearAnyDoor = false;
   for (let i = 0; i < doors.length; i++) {
    let d = dist(xLoc, yLoc, doors[i].x, doors[i].y);
    if (d < 50) {
        nearAnyDoor = true;
    }

    if (d < 25 && canEnter) {
        canEnter = false;
        if(order[progress]==i) {
            doors[i].entered = true;
            progress++;
        }
        else if (!doors[i].entered){
            progress = 0;
            for (let door of doors){
                door.entered = false;
            }
        }
    }
   }
   if (!nearAnyDoor) {
    canEnter = true;
}
    // if all doors are entered, clear the screen and display the final door
    if (progress == doors.length) {
        g = g*0.99;
        background(0, g, 0);
        fill(255);
        rect(width/2, height/2, 100, 200);
        text("You have unlocked the mystery space!", width/2, 30);

        if(dist(xLoc, yLoc, width/2, height/2) < 80){
            window.location.href = "sketch3.html"
        }
    }
    
    push();
    translate(xLoc, yLoc);
    scale(dir, 1);
    
    if (keyIsDown(RIGHT_ARROW)){
        dir = 1;
        xV = 7.5;
        counter++;
        xLoc+=xV;
    }
    if(keyIsDown(LEFT_ARROW)){
        dir = -1;
        xV = -7.5;
        counter++;
        xLoc+=xV;
    }
    if(keyIsDown(UP_ARROW)){
        print("up pressed");
        dir = -1;
        yV = -7.5;
        counter++;
        yLoc+=yV;
        print(yLoc);
    }
    if(keyIsDown(DOWN_ARROW)){
        print("down pressed");
        dir = 1;
        yV = 7.5;
        counter++;
        yLoc+=yV;
        print(yLoc);
    }

    image(currentFrame, 0, 0);

    pop();

}