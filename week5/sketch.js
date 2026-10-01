let students = ['apple', 'banana', 'cherry', 'durian', 'watermelon'];
let font;
let student = ''; // know theres a string but wont print out anything
let color = 0;


// something in async function will wait before some file is loaded int the function
async function setup() {
    createCanvas(windowWidth, windowHeight);
    font = await // wait till next function done till load font
    loadFont('LoveDays-2v7Oe.ttf');
    textFont(font);
    textSize(36);
    textAlign(CENTER);

}

function draw() {
    background(255);
    //fill(255);
    fill(color);
    // text("text", width/2, height/2);
    text(student, width/2, height/2);

    color *= 0.99;
}

function mousePressed() {
    let length = students.length // spit out however long the array is
    let i = floor(random(length-1));

    if(students.length > 0) {
        student = students[i];
        students.splice(i, 1);
    }

    color = 255;
    
}