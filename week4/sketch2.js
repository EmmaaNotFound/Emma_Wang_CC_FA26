let numWave = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    yLoc = windowHeight/2;
    noFill()
}

function draw() {
    background(230);
    // sineWave(4, 150, windowHeight/2, 0.3);
    // sineWave(8, 80, height*0.8, 0.1);
    // sineWave(100, 80, height*0.2, 0.01);

    for(let i = 0; i < numWave; i++) {
        let yLoc = map(i, 0, numWave, 0, 1) * height;
        let speed;
        if(i%2 == 0) {
            speed = 0.1;
        }
        else {
            speed = -0.1;
        }
        sineWave(i, 20, yLoc, speed );
    }

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