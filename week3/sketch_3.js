let colNum = 40;
let rowNum = 30;

function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(0);
    stroke(225);
    strokeWeight(3);
    noFill();

    let colGap = windowWidth/colNum;
    let rowGap = windowHeight/rowNum;

    // horizontal lines
    for(let i = 0; i <= rowNum; i++) {

        beginShape();
        for(let x = 0; x <= width; x+=5) {
            let shape = swirl(x, i*rowGap);
            vertex(shape.x, shape.y); // create individual points so it can be twisted later
        }
        endShape();
    }

    // vertical lines
    for(let j = 0; j <= colNum; j++) {

        beginShape();
        for(let y = 0; y <= height; y+=5) {
            let shape = swirl(j*colGap, y);
            vertex(shape.x, shape.y); // create individual points so it can be twisted later
        }
        endShape();
    }
}

// customize where each point should move
function swirl(x, y) {
    // distance from mouse
    let d = dist(mouseX, mouseY, x, y);
    let twistAngle = map(d, 0, 200, PI/2, 0, true); //the further away from mouse, the less affected
    // offset from mouse in x and y directions
    let offX = x - mouseX;
    let offY = y - mouseY;

    let xNew = cos(twistAngle) * offX - sin(twistAngle) * offY + mouseX;
    let yNew = sin(twistAngle) * offX + cos(twistAngle) * offY + mouseY;

    return createVector(xNew, yNew);
    

}