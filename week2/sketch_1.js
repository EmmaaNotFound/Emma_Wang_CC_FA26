// Define RGB variables (default to sky blue)
let r = 135;
let g = 206;
let b = 235;
// Define sun and moon coordinate
let x, y;

// orbit system
let angle;
let orb_radius;
let centerX;
let centerY;

function setup () {
    // set up canvas
    createCanvas(windowWidth, windowHeight);
    noStroke();
    // initialize orbit center
    centerX = windowWidth/2;
    centerY = windowHeight/1.8;
    orb_radius = windowWidth/3.2;
}

function draw () {
    // define variables
    let diameter = windowHeight/4;
    let morning_mountain_fill = [242, 161, 168]; 
    let morning_mountain_shade = [69, 77, 152];
    let morning_mountain_shade2 = [184, 91, 78];
    let sun_fill = [255, 241, 203];

    angle = map(mouseX, 0, windowWidth, PI, 0);

    // calculate current coordinate
    x = centerX + orb_radius * cos(angle);
    y = centerY - orb_radius * sin(angle);

    // fill background color
    if (angle <= PI / 4) {
        // Midnight to Dawn
        r = map(angle, 0, PI / 4, 11, 236);
        g = map(angle, 0, PI / 4, 19, 160);
        b = map(angle, 0, PI / 4, 43, 143);
    } 
    else if (angle > PI / 4 && angle <= PI / 2) {
        // Dawn to Mid Day 
        r = map(angle, PI / 4, PI / 2, 236, 135);
        g = map(angle, PI / 4, PI / 2, 160, 206);
        b = map(angle, PI / 4, PI / 2, 143, 235);
    } 
    else if (angle > PI / 2 && angle <= 3 * PI / 4) {
        // Mid Day to Sunset 
        r = map(angle, PI / 2, 3 * PI / 4, 135, 242);
        g = map(angle, PI / 2, 3 * PI / 4, 206, 115);
        b = map(angle, PI / 2, 3 * PI / 4, 235, 115);
    } 
    else {
        // Sunset to Midnight
        r = map(angle, 3 * PI / 4, PI, 242, 11);
        g = map(angle, 3 * PI / 4, PI, 115, 19);
        b = map(angle, 3 * PI / 4, PI, 115, 43);
    }

    

    background(r, g, b);


    // create sun
    fill(sun_fill);
    circle(x, y, diameter);
    // create mountains
    fill(morning_mountain_fill);
    triangle(windowWidth/4, windowHeight, windowWidth/2.3, windowHeight/2.5, windowWidth/1.4, windowHeight);
    fill(morning_mountain_shade);
    triangle(windowWidth/4, windowHeight, windowWidth/2.3, windowHeight/2.5, windowWidth/3, windowHeight);
    fill(morning_mountain_shade2);
    triangle(windowWidth/1.5, windowHeight, windowWidth/2.3, windowHeight/2.5, windowWidth/1.4, windowHeight);

    fill(morning_mountain_fill);
    triangle(-windowWidth/6, windowHeight, windowWidth/6, windowHeight/3, windowWidth/2, windowHeight);
    fill(morning_mountain_shade);
    triangle(-windowWidth/6, windowHeight, windowWidth/6, windowHeight/3, windowWidth/12, windowHeight);
    fill(morning_mountain_shade2);
    triangle(windowWidth/2.2, windowHeight, windowWidth/6, windowHeight/3, windowWidth/2, windowHeight);

    fill(morning_mountain_fill);
    triangle(windowWidth/3.4, windowHeight, windowWidth/1.2, windowHeight/4, 1.15*windowWidth, windowHeight);
    fill(morning_mountain_shade);
    triangle(windowWidth/3.4, windowHeight, windowWidth/1.2, windowHeight/4, windowWidth/2, windowHeight);
    fill(morning_mountain_shade2);
    triangle(windowWidth/0.94, windowHeight, windowWidth/1.2, windowHeight/4, 1.15*windowWidth, windowHeight);

}