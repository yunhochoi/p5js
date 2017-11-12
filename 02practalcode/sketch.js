/*

[Unexpected Fractal Code] by Yun Ho Choi (YUN)
“Follow the shapes with your mouse with clicking!” 

*/

var r = 57;
var centerX = 255; // Q2. why width does not work?
var centerY = 255;
var x1, y1, x2, y2, x3, y3, x4, y4;
var randomSpeed = 5;
var grey, red, green, blue;

function setup() {
  createCanvas(500, 500);
  r = r + random(57);
  x1 = centerX;
  y1 = centerY - r;
  x2 = centerX + r;
  y2 = centerY;
  x3 = centerX;
  y3 = centerY + r;
  x4 = centerX - r;
  y4 = centerY;
  
  grey = color(130);
  red = color(255, 180, 180);
  green = color(130, 255, 200);
  blue = color(200, 200, 255); // Q4. question
}

function draw() {
  var posXarr = [x1, x2, x3, x4];
  var posYarr = [y1, y2, y3, y4];
  var colorArr = [grey, red, green, blue];

  background(0, randomSpeed);
  strokeWeight(2);

  //triangle
  push();
  noFill();
  translate(random(posXarr), random(posYarr));
  rotate(frameCount / 150.0 * random(1, -1));
  stroke(green);
  triangle(0, -23, -20, 15, 20, 15);
  pop();

  //rectangle
  push();
  translate(random(posXarr), random(posYarr));
  noFill();
  rotate(frameCount / -150.0);
  stroke(blue);
  rect(-17, -17, 33, 33);
  pop(); //to the original
  
  //lines
  stroke(255, 15);
  line(0, mouseX, 500, mouseY);
  line(mouseY, 500, mouseX, 0);

}

//drawing control
function mousePressed() {
  randomSpeed = 10 * random(4);
}