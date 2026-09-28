// how many waves we want per canvas
let waveNum = 8;
let amplitude = 100;
let offset = 0;
let yLoc;

function setup() {
    createCanvas(windowWidth, windowHeight);
    yLoc = windowHeight/2;
    noFill()
}

function draw() {
    background(230);

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

    offset = frameCount * 0.1;
}