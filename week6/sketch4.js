let frames = [];
let canTeleport = true;
let cloud;
let clouds = [];

async function setup() {
    createCanvas(windowWidth, windowHeight);
    
    frameRate(12);
    rectMode(CENTER);
    imageMode(CENTER);

    for (let i = 1; i <= 2; i++) {
        frames[i-1] = await loadImage("sequence/" + i + ".png");  
    }

    for (let j = 0; j <5; j++){
        let c = new Cloud();
        c.x = random(width);
        c.y = random(height);
        clouds.push(c);
    }

}

let counter = 0;
let xLoc = 0;
let yLoc = 423;
let xV = 7.5;
let yV = 7.5;
let dir = 1;

function draw(){
    
    // background changes colors continously
    let r = map(sin(frameCount * 0.02), -1, 1, 0, 255);
    let g = map(cos(frameCount * 0.02), -1, 1, 0, 255);
    let b = map(sin(frameCount * 0.02+PI), -1, 1, 0, 255);

    background(r, g, b);

    fill(255);


    let currentFrame = frames[counter%frames.length];
    
    push();
    translate(xLoc, yLoc);
    scale(dir, 1);
    image(currentFrame, 0, 0);

    pop();
    
    if (random() < 0.05) {
        clouds.push(new Cloud());
    }
    for (let i = clouds.length - 1; i >=0; i--) {
        clouds[i].drift();
        clouds[i].display();
        if(clouds[i].x < -150) {
            clouds.splice(i, 1);
        }
    }

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

    fill(190, 50, 100);
    noStroke();
}

class Cloud {
    constructor() {
        this.x = width + 150;
        this.y = random(0, height);
        this.speed = random(4, 10);
        this.shape = [
            [0, 0, 50, 30],
            [20, -20, 60, 40],
            [50, -20, 60, 45],
            [75, -10, 60, 50],
            [100, 0, 60, 30],
            [35, 0, 70, 40]
        ];
        // make cloud be randomy a portal back to the last page
        this.portalChance = random() < 0.1;
    }
    display() {
        push();
        translate(this.x, this.y);
        //give portal cloud a different color
        fill(this.portalChance ? color (255, 120, 200, 250) : color(255, 200));
        noStroke();
        for (let shape of this.shape) {
            ellipse(shape[0], shape[1], shape[2], shape[3]);
        }
        pop();

    }
    drift(){
        this.x-= this.speed;
        if (this.portalChance && dist(xLoc, yLoc, this.x, this.y) < 40) {
        window.location.href = "sketch.html";
        }
    }
}