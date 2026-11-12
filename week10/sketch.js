let mySound;


async function setup() {
    createCanvas(windowWidth, windowHeight);

    mySound = await loadSound('Everglow.mp3');
}
function draw() {
    background(0);
    textAlign(CENTER, CENTER);
    text('Click to play', width/2, height/2);

    // let playBackSpeed = map
    if(mySound.isPlaying()) {
        mySound.rate(mouseX);
    }

}


function mousePressed() {
    if(mySound.isPlaying()) {
        mySound.stop();
    }
    else{}
        mySound.play();
}
