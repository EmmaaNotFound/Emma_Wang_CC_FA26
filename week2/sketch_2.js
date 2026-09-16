// create button
let button;
let buttonWidth;
let buttonHeight;
// to constantly generate affirmations
let isHovering = false;
let spawnTime = 0.0;

const affirmations = [
    "I am worthy of love",
    "I am exactly where I'm meant to be",
    "Life is beautiful as it is",
    "My feelings are valid",
    "I flow through life like water flows through trenches",
    "I am allowed to slow down",
    "I trust myself",
    "I love myself",
    "I stay grounded and present in the moment",
    "I am my higher self",
    "I am capable of doing hard things",
    "Every day is a new day full of opportunities",
    "I am an observer of my emotions",
    "I seek peace from within",
    "I take pleasure in my own solitude",
    "I don't need to seek validation",
    "I don't have to constantly monitor progress",
    "I am enough",
    "The universe is constantly conspiring in my favor",
    "I deserve to be happy and healthy",
    "I bring happiness to others around me by being myself"
];
// text color
const colors = [ 
    [197, 132, 245], 
    [141, 141, 227], 
    [148, 188, 249], 
    [179, 247, 148],
    [252, 253, 154], 
    [245, 193, 117], 
    [239, 151, 131]
];

let textOnScreen = []; // current displayed affirmation

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    buttonWidth = windowWidth/10;
    buttonHeight = windowHeight/10;

    button = createButton('❤️');
    button.style('border', 'none');
    button.style('background', 'transparent');
    button.style('font-size', windowHeight/10);
    
    button.size(buttonWidth, buttonHeight);
    button.position(windowWidth/2 - buttonWidth/2, windowHeight/2 - buttonHeight/2);

    textAlign(CENTER, CENTER);

    button.mouseOver(isHoveringTrue);
    button.mouseOut(isHoveringFalse);

}

function showNewAffirmation() {

    // affirmation object
    let affirmation = {
        text: random(affirmations),
        colour: random(colors),
        size: random(windowHeight/25, windowHeight/20),
        x: random(windowWidth),
        y: random(windowHeight)

    };
    // add current affirmation into array
    textOnScreen.push(affirmation);

}


function draw() {
    background(0);
    
    for (let i = textOnScreen.length - 1; i >= 0; i--) {

        textFont('Courier New');
        fill(textOnScreen[i].colour);
        textSize(textOnScreen[i].size);
        text(textOnScreen[i].text, textOnScreen[i].x, textOnScreen[i].y);

        // shrink text size each time draw runs
        textOnScreen[i].size*=0.99;

        // check if remove text
        if (textOnScreen[i].size <= 3) {
        textOnScreen.splice(i, 1);
    }
    }
    
    // check if mouse is hovering and if there has been enough time since the last affirmation spawned
    if (isHovering == true && millis() - spawnTime >= 50) {
        showNewAffirmation();
        spawnTime = millis();
    }

}

function isHoveringTrue() {
    isHovering = true;
}
function isHoveringFalse() {
    isHovering = false;
}
