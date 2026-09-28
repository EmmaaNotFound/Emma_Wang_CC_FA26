let rectNum = 20;
let w, h
let r = 0;

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 

function setup() {
    createCanvas(400, 400);

    rectMode(CENTER);
    angleMode(DEGREES);

    background(0);
    noFill();
    strokeWeight(1);
    stroke(0);
    w = windowWidth/rectNum;
    h = windowHeight/rectNum;

    if (bDoExportSvg){
    // Begin exporting, if requested
    beginRecordSvg(this, "plotSvg_hello_animating.svg");
  }
}

function keyPressed(){
  if (key == 's'){
    // Initiate SVG exporting
    bDoExportSvg = true; 
  }
}
// should download if hit 's'
function draw() {
    background(245)

    translate(w/2, h/2)
        
   
     for(let x = 0; x < rectNum; x++){
        
        for (let y = 0; y < rectNum; y++) {

            let d = dist(mouseX, mouseY, w*x, h*y);
            d = map(d, 0, 200, 1, 0)
            d = constrain(d, 0, 1)
            push();
            translate(w*x,h*y);
            rotate(r*0.1*d)
            rect(0, 0, w*d, h*d); 
            pop();
        

        }
        r++
    }

    if (bDoExportSvg){
        // End exporting, if doing so
        endRecordSvg();
        bDoExportSvg = false;
    }

}