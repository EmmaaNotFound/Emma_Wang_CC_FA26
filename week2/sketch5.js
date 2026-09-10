// declare variable
let x, y;
let diameter = 200;
let y_velocity = 5;
let x_velocity = 3;


function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    y = diameter / 2;
    x = width / 2;
}


function draw() {
    // background(100);

    x = random(width);
    y = random(height);

    let r = map(y, diameter/2, height - diameter/2, 0, 255);
    let b = map(x, diameter/2, width - diameter/2, 0, 255);
    let g = map(x, diameter/2, width - diameter/2, 255, 0);

    fill(r + random(-8, 10), g + random(-8, 10), b + random(-8, 10));
    // fill(r, g, b)
    ellipse(x, y, diameter);

    

    // x += x_velocity;
    // y += y_velocity;

    // if (y > height - diameter / 2) {
    //     y_velocity = -y_velocity
    // }

    // if (y < diameter / 2) {
    //     y_velocity = -y_velocity
    // }
    
    // if (x > width - diameter / 2) {
    //     x_velocity = -x_velocity
    // }

    // if (x < diameter / 2) {
    //     x_velocity = -x_velocity
    // }
    // print(y);



}
