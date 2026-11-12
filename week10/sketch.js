// audio player

let mySound;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound = await loadSound('Everglow.mp3'); // path

  rectMode(CENTER, CENTER)
}

function draw() {
  background(225);
  textAlign(CENTER, CENTER);
  text(mySound && mySound.isPlaying() ? 'Click to stop' : 'Click to play', width / 2, height / 2);

  let time = mySound.currentTime();
  if(mySound.isPlaying) {
    text(round(time), 10, 10);
  }
  rect(map(time, 0, mySound.duration(), 0, width), height/2, 20, 20);
}


function mousePressed() {
  if (!mySound) return; // still loading

  if (!mySound.isPlaying()) {
    mySound.play();
  } else {
    mySound.stop();
  }
}


// create a timestamp tracker
// mySound.jump(map(mouseX, 0, width, 0, mySound.length))