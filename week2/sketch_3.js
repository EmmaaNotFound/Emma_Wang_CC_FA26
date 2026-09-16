const colors = [

];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);

}

function draw() {
    background(0);

    fill(225);
    textSize(windowWidth/30)
    text('What Time Is It?', windowWidth/2, windowHeight/13);
    
    noStroke();

    let clockRadius = windowHeight/4;
    let angle = 0;
    let currentSecond = second();
    let currentMinute = minute();
    let currentHour = hour();

    // second hand
    let secondAngle = currentSecond * 6 - 90;
    let secondLength = clockRadius*1.15;
    let secondX = secondLength * cos(secondAngle);
    let secondY = secondLength * sin(secondAngle);

    // minute hand
    let minuteAngle = (currentMinute + (currentSecond/60)) * 6 - 90;
    let minuteLength = clockRadius;
    let minuteX = minuteLength * cos(minuteAngle);
    let minuteY = minuteLength * sin(minuteAngle);

    // hour
    // minute hand
    let hourAngle = (currentHour % 12 + (currentMinute/60)) * 30 - 90;
    let hourLength = clockRadius * 0.65;
    let hourX = hourLength * cos(hourAngle);
    let hourY = hourLength * sin(hourAngle);

    translate(windowWidth/2, windowHeight/2);

    fill(100);
    circle(0, 0, clockRadius*2.8);
    fill(150);
    circle(0, 0, clockRadius*2.5);


    for(let i = 0; i <= 11; i++) {
        let x = clockRadius * cos(angle);
        let y = clockRadius * sin((angle));

        fill(225);
        textSize(windowWidth/45);
        text('NOW', x, y);

        angle += 30;
    }

     // draw clock second hand
    stroke(0);
    strokeWeight(3);
    triangle(-5, 0, secondX, secondY, 5, 0);
    // minute hand
    stroke(0);
    strokeWeight(7);
    line(0, 0, minuteX,minuteY);
    // hour hand
    stroke(0);
    strokeWeight(7);
    line(0, 0, hourX, hourY);

    noStroke();
    fill(0);
    circle(0, 0, 20);
}

