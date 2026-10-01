let xLoc = [];
let yLoc = [];
let numSegments = 100;


let rows = 12
let cols = 12
let boxes = [];

let layer1;
let layer2;


function setup() {
    createCanvas(windowWidth, windowHeight);

    for(let i = 0; i < numSegments; i++) {
        xLoc[i] = width/2;
        yLoc[i] = height/2;
    }
    print(xLoc, yLoc);

     let index = 0

    for(let x = 0; x < cols; x++){
        for(let y = 0; y < rows; y++){
            // create an array, 0 corresponding to every box on the grid
            boxes[index] = 0;
            index++; 
        }
    }
    layer1 = createGraphics(width, height);
    layer2 = createGraphics(width, height);

}

let counter = 0;
function draw() {

    // warm
    // layer1.background(0);
    layer1.clear;
    layer1.stroke(255);
    layer1.fill(0);

    xLoc[numSegments - 1] = width*noise(counter);
    yLoc[numSegments - 1] = height*noise(counter+10); // offset one counter from the other

     for(let i = 0; i < (numSegments-1); i++) {
        xLoc[i] = xLoc[i + 1];
        yLoc[i] = yLoc[i + 1];

        let diameter = 200*sin(map(i, 0, numSegments-1, 0, PI));

        let r = diameter;
        let g = 200 - diameter;
        let b = 200*cos(map(i, 0, numSegments-1, 0, PI));

        layer1.stroke(r, g, b);

        layer1.ellipse(xLoc[i], yLoc[i], diameter);
        
        
    }
    
    counter += 0.01;

    // grid

   let index = 0;

    for(let x = 0; x < cols; x++) {
        for(let y = 0; y < rows; y++) {
            stroke(255);
            layer2.fill(0);

            if(mouseX > x*(width/cols) && mouseX < (x+1)*(width/cols) && mouseY > y*(height/rows) && mouseY < (y+1)*(height/rows)) { // check if mouse if in between two vertival cols
                // change the color if posses particular box
                boxes[index] = 255;

            }
            layer2.fill(boxes[index], 0, 0);
            layer2.rect(x*(width/cols), y*(height/rows), width/cols, height/rows);
            boxes[index] *= 0.99;
            index++;
        }

    }

    // uncomment below with above layer1.background(0);
    // if(onOff == 0){
    //     image(layer1, 0, 0, width, height);
    // }
    // else{
    //     image(layer2, 0, 0, width, height);
    // }
    image(layer2, 0, 0, width, height);
    image(layer1, 0, 0, width, height);
    
}

let onOff = 0;
let num = 0;
function mousePressed() {
    onOff = num%2;
    num++

}