function setup() {
    createCanvas(windowWidth, windowHeight);

    rectMode(CENTER);
    angleMode(DEGREES);

    background(0);
    noFill();
    strokeWeight(2);
    stroke(255);

    // to slow draw sown
    frameRate(20)

}

function draw() {
    background(0)
    for(let i = 0; i < 100; i++){

        push();
        translate(random(width), random(height)); // randomize locations rectangle
        rect(0, 0, random(100), random(100));
        pop();
    }
    
}