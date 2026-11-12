let mySound;
let fft;
let spec;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound = await loadSound('Everglow.mp3');
  mySound.loop(true);

  fft = new p5.FFT(1024);
  mySound.connect(fft);      // this replaces fft.setInput(mySound)

  spec = createGraphics(width, height);
  spec.pixelDensity(1);
  spec.background(0);
  spec.noStroke();
  spec.colorMode(HSB, 360, 100, 100); // full saturation and brightness
}

function draw() {
  let spectrum = fft.analyze();
  let n = spectrum.length;

  // shift spectrogram left by 1px
  spec.copy(spec, 1, 0, spec.width - 1, spec.height, 0, 0, spec.width - 1, spec.height);

  // newest column on the right edge, log frequency axis
  for (let i = 0; i < n; i++) {
    // column1 is i+1, column 2 is i+2
    let y1 = map(log(i + 1), 0, log(n), spec.height, 0); // map to log scale to approximate how human hears, map log scale to height
    let y2 = map(log(i + 2), 0, log(n), spec.height, 0);
    let a = constrain(spectrum[i] / 0.1, 0, 1);   // same 0–0.1 range as the example
    spec.fill(map(a, 0, 1, 260, 10), 100, a * 200); // map brightness according to spetral energy intensity
    spec.rect(spec.width - 1, y2, 1, y1 - y2 + 1);
  }

  image(spec, 0, 0);

  // waveform overlay
  let waveform = fft.waveform();
  noFill();
  strokeWeight(2);
  stroke(255, 120, 0);
  
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  if (!mySound.isPlaying()) {
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    text('Click to play', width / 2, height / 2);
  }



  // draw a player
  if(mySound.isPlaying) {
    text(round(time), 10, 10);
  }
  rect(map(time, 0, mySound.duration(), 0, width), height/2, 20, 20);
}

function mousePressed() {
  if (!mySound) return;
  userStartAudio();
  if (!mySound.isPlaying()) {
    mySound.play();
  } else {
    mySound.stop();
  }
}