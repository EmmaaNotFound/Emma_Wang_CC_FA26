let x = 0;
let lerpedMouseXS1 = 0;
let lerpedMouseYS1 = 0;
let lerpedMouseXS2 = 0;
let lerpedMouseYS2 = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    rectMode(CENTER);
    angleMode(DEGREES);

}

function draw() {
    background(0);

    stroke(255);
    strokeWeight(2);
    noFill();

    // simple demo of what lerp is

    // push()
    // translate(0, height/2)
    // rect(0, 0, 50)
    // pop()

    // push()
    // translate(width, height/2)
    // rect(0, 0, 50)
    // pop()

    // x = lerp(0, width, 1/2); // linear interpolation, thier number is the ratio

    // push()
    // translate(x, height/2)
    // rect(0, 0, 50)
    // pop()

    lerpedMouseXS1 = lerp(lerpedMouseXS1, mouseX, 0.05);
    lerpedMouseYS1 = lerp(lerpedMouseYS1, mouseY, 0.05);

    lerpedMouseXS2 = lerp(lerpedMouseXS2, mouseX, 0.3);
    lerpedMouseYS2 = lerp(lerpedMouseYS2, mouseY, 0.3);

    push()
    translate(lerpedMouseXS1, lerpedMouseYS1)
    rect(0, 0, 50)
    pop()

    push()
    translate(lerpedMouseXS2, lerpedMouseYS2)
    rect(0, 0, 70)
    pop()

    

    
    



}