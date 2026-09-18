function setup() {
    createCanvas(windowWidth, windowHeight);

    rectMode(CENTER);
    angleMode(DEGREES);

}

function draw() {

    background(0);
    noFill();
    stroke(255)
    strokeWeight(2);

    translate(width/2 - mouseX, 0);

    push();

    // transform is the transposition of the canvas not the shape
    translate(width/2, width/2);
    rotate(r); // the order matters
    rect(0, 0, 50); // want to place the object at 00 and use the translate to move them

    line(0, 0, 0, 200)
    translate(0, 200);
    rotate(r); // the order matters
    rect(0, 0, 50); // want to place the object at 00 and use the translate to move them

    line(0, 0, 0, 200)
    translate(0, 200);
    rotate(r); 
    rect(0, 0, 50);

    line(0, 0, 0, 200)
    translate(0, 200);
    rotate(r);
    rect(0, 0, 50);

    pop();

    push();

    translate(width/2, 3*height/4)
    rect(0, 0, 400, height/2);
    
    translate(0, -height/4 -75);
    rect(0, 0, 80, 150);

    fill(0);
    translate(0, -100);
    rect(0, 0, 120, 180, 10);

    pop();
}