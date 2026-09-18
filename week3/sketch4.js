let rectNum = 20;
let w, h
let r = 0;

function setup() {
    createCanvas(800, 800);

    rectMode(CENTER);
    angleMode(DEGREES);

    background(0);
    noFill();
    strokeWeight(2);
    stroke(255);

    w = windowWidth/rectNum;
    h = windowHeight/rectNum;
}

function draw() {
    background(0)

    translate(w/2, h/2)
        
    // for(let x = 0; x < rectNum; x++){
        
    //     for (let y = 0; y < rectNum; y++) {

    //         for (let i = 0; i<5; i++) {
    //             push();
    //             translate(w*x,h*y);
    //             rotate(r*0.02);
    //             rect(0, 0, w-10*i, h-10*i); 
    //             pop();
    //         }
        

    //     }
    //     r++
    // }

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


}