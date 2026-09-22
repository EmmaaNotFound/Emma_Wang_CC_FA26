let headX, headY;
let tailX, tailY;
let warmLength;

function setup() {
    createCanvas(windowWidth, windowHeight);
    warmLength = width/15;
    tailX = width/2;
    headX = tailX + warmLength;
    tailY = height/2;
    headY = height/2;

    noCursor();
    
}

function draw() {
    background(149, 225, 145);
        
    textSize(50);
    textAlign(CENTER, CENTER);
    text('🥬', mouseX, mouseY);

    fill(70, 180, 70);
    noStroke();

    // distance between head and tail
    let d = dist(tailX, tailY, headX, headY);
    let squishedLength = warmLength - d;
    
    let midPointX = (tailX+headX)/2;
    let midPointY = (tailY+headY)/2 - squishedLength;

    // line(tailX, tailY, midPointX, midPointY);
    // line(midPointX, midPointY, headX, headY);

    let phase = frameCount % 60 // phase of warm moving across the 60 frames
    // tail move first 30 frame and head move next 30 and repeat
    if(phase < 30) { // tail move
        let phaseT = phase/30;   //phase of tail moving across the 30 frames
        let amountT = sin(phaseT*PI)*0.1;

        tailX = lerp(tailX, headX, amountT);
        tailY = lerp(tailY, headY, amountT);
    }
    else if (d < warmLength) { // head move
        let phaseH = (phase -30) / 30 // phase of head moving across the 30 frames
        let amountH = sin(phaseH*PI)*0.1;

        // solving jolting problem when mouse is further away
        // let bug move towards a target coord that's constantly a body length away instead of currnet mouse positioin
        let targetX, targetY;
        let angle = atan2(mouseY - tailY, mouseX - tailX); // angle from tail to mouse
        targetX = tailX + cos(angle) * min(warmLength, dist(tailX, tailY, mouseX, mouseY)); // if the warm gets closer to the mouse than the warm length, just reach the mouse instead of crossing over and wiggle around the mouse back and forth
        targetY = tailY + sin(angle) * min(warmLength, dist(tailX, tailY, mouseX, mouseY));

        headX = lerp(headX, targetX, amountH);
        headY = lerp(headY, targetY, amountH);
    }

    // draw circles on the the line to make it look like caterpillar
    let segment = 5;
    for(let i = 0; i < segment; i++) {
        let delta = i / segment;
        let x = lerp(tailX, midPointX, delta); // each time moves delta distance towards the middle point (and draw a circle)
        let y = lerp(tailY, midPointY, delta);

        push();
        translate(x, y);
        circle(0, 0, width/100);
        pop();
    }
    for(let i = 0; i < segment; i++) {
        let delta = i / segment;
        let x = lerp(midPointX, headX, delta); // each time moves delta distance towards the head (and draw a circle)
        let y = lerp(midPointY, headY, delta);

        push();
        translate(x, y);
        circle(0, 0, width/100);
        pop();
        
    }
    // head
    push();
    translate(headX, headY);
    fill(255, 140, 0);
    circle(0, 0, width/80);
    pop();



}