p5.disableFriendlyErrors = true;
let bDoExportSvg = false;

let gapSize;
let gapNum = 60;

function setup() {
  createCanvas(600, 600);
  noFill();
  gapSize = width / gapNum;
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
  for (let x = 0; x < gapNum; x++) {
    for (let y = 0; y < gapNum; y++) {
      let x_coord = gapSize * x;
      let y_coord = gapSize * y;
      let d = dist(x_coord, y_coord, mouseX, mouseY);
      circle(x_coord, y_coord, map(d, 0, 450, 40, 2, true));
    }
  }
  if (bDoExportSvg) {
    endRecordSvg();
    bDoExportSvg = false;
  }
}