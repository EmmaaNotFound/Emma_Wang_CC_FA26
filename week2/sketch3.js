// declare variable
let x, y;
let diameter = 50;
let y_velocity = 5;
let x_velocity = 3;


function setup() {
    createCanvas(windowWidth, windowHeight);
    y = diameter / 2;
    x = width / 2;
}


function draw() {
    background(100);
    ellipse(x, y, diameter);

    x += x_velocity;
    y += y_velocity;

    if (y > height - diameter / 2) {
        y_velocity = -y_velocity
    }

    if (y < diameter / 2) {
        y_velocity = -y_velocity
    }
    
    if (x > width - diameter / 2) {
        x_velocity = -x_velocity
    }

    if (x < diameter / 2) {
        x_velocity = -x_velocity
    }
    print(y);

}
