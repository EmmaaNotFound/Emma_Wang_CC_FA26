// poop speed (Y coord)
let v = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(RADIANS);
}

function draw(){
    background(150,200, 235);

    let wing = sin(frameCount * 0.15); // for wing rotation motion
    let body = wing * 8;    // for body up down

    // whole body motion
    push();
    translate(width/2, height/2+body);

   // poop
    push();
    fill(110, 70, 40);
    translate(-20, 0);
    v+=5;
    if (v > height/2+30) {
        v = 0
    }
    circle(0, v, 10);
    pop();

    // wing
    push();
    noStroke();
    fill(210, 130, 60);
    translate(-10, -10);
    rotate(wing*0.5);
    ellipse(-35, 0, 90, 20)
    pop();

    // body
    fill(240, 180, 80);
    noStroke();
    ellipse(0, 0, 100, 80);

    // tail
    push();
    fill(240, 180, 80);
    translate(-40, -10);
    rotate(-wing*0.3);
    triangle(-30, -10, -30, 10, 0, 0);
    pop();

     // wing 2
    push();
    translate(-5, -15);
    rotate(wing*0.8);
    fill(255, 205, 120);
    ellipse(-40, 0, 90, 20);
    pop();

    // head
    push();
    translate(55, -30);
    fill(240, 180, 80);
    circle(0, 0, 55);
    // eye
    fill(0);
    circle(10, -6, 10);
    // beak
    push();
    translate(23, 4);
    rotate(0.2);
    fill(250, 130, 60);
    triangle(0, -8, 0, 8, 26, 0);
    pop();

    pop();


}