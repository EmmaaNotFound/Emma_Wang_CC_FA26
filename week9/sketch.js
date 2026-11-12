// visual
let video;
let lerpBrightness = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // smoothing the brightness values of each cell so the sound doesn't jitter
let level = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // volume of each cell

// hand recognition
let handPose;
let hands = [];

// audio
let frequency = [174, 285, 396, 417, 528, 639, 741, 852, 963]; // the nine solfeggio frequencies

let audioCtx; // hold web audio API context
let gain = []; // volume control for each frequency
let masterGain; // master volume
let audioStarted = false;

// switch to iimported video
let clip;
let useClip = false;



async function setup() {
    createCanvas(windowWidth, windowHeight);

    handPose = await ml5.handPose({flipped: true}); // flip to mirror view
    
    video = createCapture(VIDEO);
    video.size(640, 480);
    
    video.hide() // hide the raw video pixels

    // import video, press v to switch
    clip = await createVideo('jellyfish.mp4');
    clip.elt.muted = true; // mute video
    clip.hide();
    clip.loop();

    // start hand detection
    handPose.detectStart(video, gotHands);

}

function draw() {
    background(0);

    let src = useClip ? clip : video; // find out if the pixel come from the cam or the clip
    
    // scale the video to fit the canvas
    let scaleX = width/src.width;
    let scaleY = height/src.height;
    let scaleFactor = max(scaleX, scaleY); // scale factor

    let w = src.width * scaleFactor;
    let h = src.height * scaleFactor;
    

    // read pixels from the video
    src.loadPixels();

    if (src.pixels.length === 0) { // check if the video has pixels
        return;
    }
    // split the whole canvas into nine cells
    // calculate the average brightness of each cell
    // Define array to add and hold average brighrtness
    let brightnessSum = [];
    let count = []; // count how many pixels brightness are added in each cell

    // 9 cells in total
    for(let i = 0;  i < 9; i ++){
        brightnessSum[i] = 0;
        count[i] = 0;
    }

    // set up the mosaic effect
    rectMode(CENTER);
    noStroke();
    colorMode(HSB, 360, 100, 100);

    for(let y = 0; y < src.height;y += 8) {
        for (let x = 0; x < src.width; x +=8) {
            let index = (x+y*src.width)*4; // index of the pixel in the array
            
            let r = src.pixels[index];
            let g = src.pixels[index + 1];
            let b = src.pixels[index + 2];

            // calculate the pixel brightness and add to total brightness
            let brightness = (r + g + b)/3;


            // draw the pixel on the canvas correctly by identifying where the pixel is on screen first
            // need to consider the mirror effect, scale factor, and the centering of the video on canvas
            let screenX = (width+w)/2 - x*scaleFactor; // enlarged video shifted to the right
            let screenY = (height-h)/2 + y*scaleFactor; // enlarged video shifted to the top

            // check the edge of canvas. skip if pixel is outside the canvas
            if (screenX < 0 || screenX >= width || screenY < 0 || screenY >= height) {
                continue;
            }

            // check which cell the pixel is in
            let cellCol = floor(screenX/width * 3); // round down to which column the pixel is in
            let cellRow = floor(screenY/height * 3); // which row
            let cellNum = cellRow * 3 + cellCol; // number the nine cells from 0 to 8, left to right, top to bottom

            // draw square pixel
            let mosaicSize = 8*scaleFactor * (brightness/255); // make pixel size change with brightness
            let cellColor = map(screenY, 0, height, 0, 270); // map rainbow color to screen height
            fill(cellColor, 80, brightness / 255 * 100);
            rect(screenX, screenY, mosaicSize, mosaicSize); 

            brightnessSum[cellNum] += brightness; // add the pixel brightness to the total brightness of the cell
            count[cellNum]++;

        }
    }
        

    // finger tip detection 
    let cellBoost = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // which cell the finger tip is in will light it up more
    let fingerTipPos = [];

    // check if clip is playing, if so disable hand detection
    if(!useClip){
        // go through each detected hand, one or two or more
        for(let i = 0; i < hands.length; i++) {
            let hand = hands[i];
            let fingerTips = [hand.keypoints[4], hand.keypoints[8]]; // select thumb and index finger tip
            // what happens to both finger tips is to check which cell they are in and increase the brightness of the cell
            for(let j = 0; j < fingerTips.length; j++) {
                let fingerTipX = (width-w)/2 + fingerTips[j].x * scaleFactor; // samething as above, scale and center the finger tip position on canvas
                let fingerTipY = (height-h)/2 + fingerTips[j].y * scaleFactor;

                // create vector to hold the finger tip position
                fingerTipPos.push(createVector(fingerTipX, fingerTipY));

                // same check if finger tip is off screen, if it is then skip
                if (fingerTipX < 0 || fingerTipX >= width || fingerTipY < 0 || fingerTipY >= height) {
                continue;
                }
                // identify which cell the finger tip is in
                let cellCol = floor(fingerTipX/width * 3);
                let cellRow = floor(fingerTipY/height * 3);
                let cellNum = cellRow * 3 + cellCol;
                cellBoost[cellNum] += 50; // increase brightness of the cell
            }

        }
    }
    


    // ease in the brightness values of each cell
    for(let i = 0; i < 9; i ++) {
        let avgBrightness = brightnessSum[i]/count[i];
        avgBrightness = avgBrightness + cellBoost[i]; // brightness increase from finger tips
        lerpBrightness[i] = lerp(lerpBrightness[i], avgBrightness, 0.1);
    }
    
    // make the volume lower for darekr cells and higher for brighter cells
    for(let i = 0; i < 9; i++) {
        let targetVol; // for volume fade
        if (max(lerpBrightness)-min(lerpBrightness) > 10) { // only change the volume if the brightness difference is big
            targetVol = map(lerpBrightness[i], min(lerpBrightness), max(lerpBrightness), 0, 1); 
        }
        else {
            // if the brightness values are too close, set the volume to be equal
            targetVol = 0.5;
        }
        
        targetVol = pow(targetVol, map(frequency[i], 174, 963, 1.5, 3)); // curve the volume change to not be linear across all frequencies
        targetVol *= map(frequency[i], 174, 963, 1.5, 1); // boost lower freq

        if (cellBoost[i] > 0) {
            targetVol = 1; // if finger tip is in the cell, rise the cell to full volume
        }
        level[i] = lerp(level[i], targetVol, 0.05);
        // fade in audio
        if(audioStarted) {
            gain[i].gain.setTargetAtTime(level[i], audioCtx.currentTime, 1.5); 
        }
    }

    rectMode(CORNER);// reset rectmode to draw grid
    colorMode(RGB);// reset color mode

    // draw the grid to divide the canvas into nine cells
    let cellWidth = width/3;
    let cellHeight = height/3;
    

    for (let row = 0; row < 3; row ++){
        for(let col = 0; col < 3; col ++){
            let cellNum = row*3 + col;

            let x = col*cellWidth;
            let y = row*cellHeight;

            // grid glow (transparency)
            fill(255, 255, 255, level[cellNum] * 30);
            stroke(255, 60);
            rect(x, y, cellWidth, cellHeight);

            // display frequency
            noStroke();
            fill(255);
            textSize(24);
            text(frequency[cellNum] + " Hz", x + 20, y + 43);

            // level bar
            fill(255, 60);
            rect(x + 20, y + 60, 150, 6);// empty bar background layer
            fill(255);
            rect(x + 20, y + 60, 150 * level[cellNum], 6); // real time level displaty
        }
        
    }

    // draw finger tips
    fill(255);
    noStroke();
    for(let i = 0; i < fingerTipPos.length; i++) {
        ellipse(fingerTipPos[i].x, fingerTipPos[i].y, 20, 20);
    }
    
    // prompt to start sound
    if(!audioStarted) {
        fill(0, 180);
        rect(0, 0, width, height);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Click to start sound", width/2, height/2); 
        textAlign(LEFT, BASELINE); // reset cell text alignment to not affect the positioning of the text in the cells
    }
}

// web audio
async function startAudio() {
    audioCtx = new AudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.07;

    // low pass filter to soften the highe nd
    let lpf = audioCtx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 1500;

    masterGain.connect(lpf);
    lpf.connect(audioCtx.destination);

    // wiring reverb
    let reverb = await loadReverb('hall.wav'); // load impulse response
    let wet = audioCtx.createGain(); // wet mix
    wet.gain.value = 0.6; // reverb amount

    lpf.connect(reverb);
    reverb.connect(wet);
    wet.connect(audioCtx.destination);

    // using additive synthesis to make the sound more complex, fundamental plus 2nd, 3rd harmonics with different amplitube for  each
    let imag = new Float32Array([0, 1, 0.5, 0.3]);
    let real = new Float32Array(imag.length); // 4 zeros, dont need cosine part because phase difference is inaudible for a steady tone anyways
    let organWave = audioCtx.createPeriodicWave(real, imag);

    // create oscillators for each frequency
    for (let i = 0; i < 9; i++) {
        let osc = audioCtx.createOscillator();
        // setup custom wave created
        osc.setPeriodicWave(organWave);
        osc.frequency.value = frequency[i];

        // build a LFO to modulate the gain of oscillators to bring more dynamics
        let midGain = audioCtx.createGain();
        let lfo = audioCtx.createOscillator();
        let lfoGain = audioCtx.createGain();

        midGain.gain.value = 0.7; // equilibrium of vol range
        lfo.frequency.value = 0.05 + i*0.013; // varying modulating speed for different frequency
        lfoGain.gain.value = 0.3; // modulation depth

        // wiring lfo to oscillator gain
        lfo.connect(lfoGain);
        lfoGain.connect(midGain.gain);
        
        lfo.start();

        let cellGain = audioCtx.createGain();
        cellGain.gain.value = 0;

        // wire oscillator to gain and gain to master gain
        osc.connect(midGain);
        midGain.connect(cellGain);
       
        // create stereo width through stero panning
        let panner = audioCtx.createStereoPanner();
        panner.pan.value = (i%3 - 1)*0.7; // column one to three span pan vlaue of -0.7 to 0.7
        cellGain.connect(panner);
        panner.connect(masterGain);

        osc.start();
    

        gain.push(cellGain);

    }

    audioStarted = true;
}

// only allow sound to start after click the mouse
function mousePressed() {
    if (!audioCtx) {
        startAudio();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function gotHands(results) {
    hands = results;
}

// press v to switch between webcam and imported clip
function keyPressed() {
    if (key === 'v') {
        useClip = !useClip;
    }
}

// load an impulse response file to tturn it into reverb
async function loadReverb(file) {
    let IR = await fetch(file); // download file
    let data = await IR.arrayBuffer(); // read raw bytes
    let reverb = audioCtx.createConvolver(); // for applying reverb
    reverb.buffer = await audioCtx.decodeAudioData(data); // decode bytes to audio
    return reverb;
}