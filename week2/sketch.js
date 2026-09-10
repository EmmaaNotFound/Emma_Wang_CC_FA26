function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);

    fill(100, 50, 0);
    // nostroke();
    // strokeweight(10);
    stroke(255, 0, 0);
    
}
/* runs once*/

function draw() {
    ellipse(mouseX, mouseY, 50, 50);
}
/* runs in definitely */

function mousePressed() {
    background(100);
}