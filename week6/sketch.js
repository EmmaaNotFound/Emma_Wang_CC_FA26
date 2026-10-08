let frames = [];
let canTeleport = true;
async function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(12);
    rectMode(CENTER);
    imageMode(CENTER);

    // let img = await loadImage("sequence/Rock1.png")
    // image(img, 0, 0);

    for (let i = 1; i <= 2; i++) {
        frames[i-1] = await loadImage("sequence/" + i + ".png");
        
    }
    // print(frames);
}

let counter = 0;
let xLoc = 0;
let yLoc = 423;
let xV = 7.5;
let yV = 7.5;
let dir = 1;

function draw(){
    background(233, 210, 118);

    let currentFrame = frames[counter%frames.length];
    
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

    // if(xLoc > width){
    //     dir = -1;
    //     xV = -7.5;
    // }
    // else if (xLoc < 0) {
    //     dir = 1;
    //     xV = 7.5;
    // }
    
    image(currentFrame, 0, 0);

    pop();
    fill(190, 50, 100);
    noStroke();

    if(dist(xLoc, yLoc, width/2, height/2) < 50){
        fill(133, 20, 200);
        // window.location.href = "../../index.html";
    }
    if(dist(xLoc, yLoc, width/2, height/2) < 10){
        xLoc = width/3;
        yLoc = height/6;
    }
    if(dist(xLoc, yLoc, width/3, height/6) < 50){
        fill(133, 20, 0);

    }
    if(dist(xLoc, yLoc, width/2, height/2) < 10){
        xLoc = width/2;
        yLoc = height/2;
    }

    
    
    // if(dist(xLoc, yLoc, width/3, height/6) < 10){
    //     xLoc = width/2;
    //     yLoc = height/2;
    // }


    rect(width/2, height/2, 50, 90);

    rect(width/3, height/6, 50, 90);
    


    // counter++;
    // xLoc+=xV;
}

