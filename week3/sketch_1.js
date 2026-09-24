function setup() {
createCanvas(windowWidth, windowHeight);

noCursor();

}

function draw() {
    background(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text('🧲', mouseX, mouseY);


    let incrementW = windowWidth/30;
    let incrementH = windowHeight/20;
    strokeWeight(3);
    stroke(225);

    for (let x = 0; x < windowWidth; x+=incrementW) {
        for (let y = 0; y < windowHeight; y+=incrementH) {
            push();
            translate(x, y);
            // find angle from point to mouse
            let angle = atan2(mouseY - y, mouseX - x);
            rotate(angle);
            // circle(0, 0, 10);
            line(0, 0, y*0.1, 0)
            pop();
        }
    }
}