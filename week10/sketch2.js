let mySound;
let fft;
let spec;

// spectrogram tuning
let floorDb = -90;   // quietest level that shows color (lower = more sensitive)
let ceilDb = -13;    // level that hits full color
let tilt = 4;        // dB per octave boost for higher frequencies


async function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound = await loadSound('Everglow.mp3');
  mySound.loop(true);        // only sets the loop flag

  fft = new p5.FFT(1024);
  mySound.connect(fft);

  spec = createGraphics(width, height);
  spec.pixelDensity(1);
  spec.background(0);
  spec.noStroke();
  spec.colorMode(HSB, 360, 100, 100);
}


function draw() {
  let spectrum = fft.analyze();
  let n = spectrum.length;

  // only scroll the spectrogram while music plays, so it freezes when stopped
  if (mySound.isPlaying()) {
    spec.copy(spec, 1, 0, spec.width - 1, spec.height, 0, 0, spec.width - 1, spec.height);

    for (let i = 0; i < n; i++) {
      // log frequency axis, low at the bottom
      let y1 = map(log(i + 1), 0, log(n), spec.height, 0);
      let y2 = map(log(i + 2), 0, log(n), spec.height, 0);

      // decibels + tilt compensation
      let db = 20 * Math.log10(spectrum[i] + 1e-9);
      db += tilt * Math.log2(i + 1);
      let a = constrain(map(db, floorDb, ceilDb, 0, 1), 0, 1);

      // purple → blue → green → yellow → red, loudest peaks stay deep saturated red
      let hue = map(a, 0, 1, 280, 0);
      let sat = 100;
      let bri = pow(a, 1) * 100;

      spec.fill(hue, sat, bri);
      spec.rect(spec.width - 1, y2, 1, y1 - y2 + 1);
    }
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
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Click to play', width / 2, height / 2);
  }

  
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