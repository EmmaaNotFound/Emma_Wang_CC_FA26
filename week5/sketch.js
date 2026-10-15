p5.disableFriendlyErrors = true;
let bDoExportSvg = false;
 
function setup() {
    createCanvas(800, 800);
    noFill();
}
 
function keyPressed() {
    if (key == 's') {
        bDoExportSvg = true;
    }
}
 
function draw() {
    background(255);
    if (bDoExportSvg) {
    beginRecordSvg(this, "myOutput.svg");
  }

    translate(width/2, height/2);

    doubleCircle(6);
    drawPatternRing(31, 10, 'petals');
    doubleCircle(50);
    drawPatternRing(63, 12, 'eyes');
    doubleCircle(74);
    drawPatternRing(100, 24, 'compass');
    doubleCircle(124);
    drawPatternRing(137, 120, 'lines');
    doubleCircle(149);
    drawPatternRing(163, 36, 'scallops');
    drawPatternRing(163, 72, 'scallops');
    doubleCircle(174);
    drawPatternRing(188, 48, 'beads');
    doubleCircle(201);
    drawPatternRing(222, 72, 'petals');
    doubleCircle(241);
    drawPatternRing(255, 54, 'eyes');
    doubleCircle(266);
    drawPatternRing(279, 180, 'lines');
    doubleCircle(290);
    

    beginShape();
    for (let ang = 0; ang < TWO_PI; ang += 0.01) {
        let r = 350 + 30 * sin(ang*40);
        let x = cos(ang) * r;
        let y = sin(ang) * r;
        vertex(x, y);
    }
    endShape(CLOSE);
    beginShape();
    for (let ang = 0; ang < TWO_PI; ang += 0.01) {
        let r = 330 + 15 * sin(ang*40+PI);
        let x = cos(ang) * r;
        let y = sin(ang) * r;
        vertex(x, y);
    }
    endShape(CLOSE);
    beginShape();
     for (let ang = 0; ang < TWO_PI; ang += 0.01) {
        let r = 330 + 15 * sin(ang*10);
        let x = cos(ang) * r;
        let y = sin(ang) * r;
        vertex(x, y);
    }
    endShape(CLOSE);

    beginShape();
     for (let ang = 0; ang < TWO_PI; ang += 0.01) {
        let r = 330 + 30 * sin(ang*10+PI);
        let x = cos(ang) * r;
        let y = sin(ang) * r;
        vertex(x, y);
    }
    endShape(CLOSE);

    beginShape();
     for (let ang = 0; ang < TWO_PI; ang += 0.01) {
        let r = 330 + 15 * sin(ang*10+0.5*PI);
        let x = cos(ang) * r;
        let y = sin(ang) * r;
        vertex(x, y);
    }
    endShape(CLOSE);


    if (bDoExportSvg) {
    endRecordSvg();
    bDoExportSvg = false;
  }

}

function doubleCircle(r) {
    circle(0, 0, r*2);
    circle(0, 0, r*2+6);
}

function drawPatternRing(radius, count, shape) {
    for (let i = 0; i < count; i++){
        push();
        rotate((TWO_PI/count) * i);
        translate(radius, 0);

        // bead
        if(shape == 'beads') {
            circle(0, 0, 18);
            circle(0, 0, 6);
        }

        // line
        if(shape == 'lines') {
            if (i % 2 == 0) {
                line(-8, 0, 8, 0);
            }
            else {
                line(0, 0, 8, 0);
            }
        }

        // triangle integrated shape
        if(shape == 'compass') {
            ellipse(0, 0, 40, 18);
            line(-10, 0, 10, 0);
            triangle(10, 0, -10, -8, -10, 8);
        }

        // eyes
        if(shape == 'eyes'){
            ellipse(0, 0, 14, 24);
            circle(0, 0, 8);
            circle(0, 0, 2);
        }

        // scallop
        if(shape == 'scallops'){
            arc(-8, 0, 30, TWO_PI*radius/count, -HALF_PI, HALF_PI);
        }

        // petal
        if(shape == 'petals'){
            bezier(-15, 0, -5, -10, 5, -8, 15, 0); 
            bezier(-15, 0, -5, 10, 5, 8, 15, 0);  
        }
        
        pop();


    }


}