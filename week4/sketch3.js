let numWave = 10;
let yLoc;

function setup() {
    // background(230); // for the sine wave
    createCanvas(windowWidth, windowHeight);
    yLoc = windowHeight/2;
    noFill()
}

function draw() {
    background(230);
    noiseWave(10, 100, height*0.5, 0.01);
}

function sineWave(waveNum, amplitude, yLoc, speed) {
    let offset = frameCount * speed;
    push();
    translate(0, yLoc);

    beginShape();
    for(let x = 0; x < width; x++) {

        let mappedI = map(x, 0, width, 0, waveNum*TWO_PI);
        let y = sin(mappedI-offset)*amplitude;
        // map over width
        vertex(x, y);

    }
    endShape();

    pop();

}

// create a pentagon from a point
function nShape(xLoc, yLoc, numVertices, radius) {
    push();
    translate(xLoc, yLoc);

    beginShape();
    for(let i = 0; i < numVertices; i++) {
        let mappedI = map(i, 0, numVertices, 0, TWO_PI);
        let x = sin(mappedI) * radius;
        let y = cos(mappedI) * radius;

        vertex(x, y);
        
    }
    endShape(CLOSE); // connects the last vertex to the previous vertex instead of the beginning vertex
    pop();
}

function noiseWave(density, amplitude, yLoc, speed) {
    let offset = frameCount * speed;
    push();
    translate(0, yLoc);

    beginShape();
    for(let x = 0; x < width; x++) {

        let seed = map(x, 0, width, 0, density) + offset;
        let y = noise(seed)*amplitude;
        // map over width
        vertex(x, y);

    }
    endShape();

    pop();

}

function mousePressed() {
    let v = floor(random(3, 20));
    nShape(mouseX, mouseY, v, v*4);

}