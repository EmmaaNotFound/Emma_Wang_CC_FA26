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
}
/* runs in definitely */

function mouseDragged() {
    // ellipse(mouseX, mouseY, 50, 50);
    // background(100);
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function mousePressed() {
    // background(100);
}

function keyPressed() {
    if (key == 'r') {
        background(100);
    } // erase the canvas when pressed r
}