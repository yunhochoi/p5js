
//slidebar
var rx = 50;
var ry = 50;
var rw = 7;
var rh = 30;

var rx1 = 50;
var ry1 = 100;
var rw1 = 7;
var rh1 = 30;

var rx2 = 50;
var ry2 = 150;
var rw2 = 7;
var rh2 = 30;

var xArr = [rx, rx1, rx2];
var yArr = [ry, ry1, ry2];
var wArr = [rw, rw1, rw2];
var hArr = [rh, rh1, rh2];


var sliderStart = 50;
var sliderEnd = 200;
var dragging1 = false; // Is the slider being dragged?
var dragging2 = false;
var dragging3 = false;
var dragArr = [dragging1, dragging2, dragging3];
var rollover = false; // Is the mouse over the slider?

// Offset for dragging slider
var offsetX = 0;
var offsetX2 = 0;
var offsetY = 0;

var x = 0;
var y = 1;
var x1, y1, x2, y2, x3, y3, x4, y4;
var thickness = 6;

var ranTrans ;
var ranWidth = 1500;
var song;

function preload() {
  //song = loadSound('piano.mp3');
}


function setup() {
  createCanvas(600, 600);
 // song.loop();
  //song.play();
}

function draw() {
  
  if (dragging1) {
    dragging2 = dragging3 = false;
    xArr[0] = mouseX + offsetX;
  }
  xArr[0] = constrain(xArr[0], sliderStart, 150);

  if (dragging2) {
    xArr[1] = mouseX + offsetX;
    dragging1 = dragging3 = false;
  }
  xArr[1] = constrain(xArr[1], sliderStart, 150);
  if (dragging3) {
    xArr[2] = mouseX + offsetX;
    dragging1 = dragging2 = false;
  }
  xArr[2] = constrain(xArr[2], sliderStart, 150);
   
  push();
    ranTrans = random(50);
    background(0,150); // opacity : UI
    translate(300,300);

    for (var i = 0; i < 15; i = i + 1) { //i : number of stars
        star(40, xArr[2]*2.5-100, 5+xArr[1]*5, 2, 800, 400); //
        rotate(frameCount / 150.0);
        if(x == 3500){
          x = 0; // stop loop
        }              
    }
  pop(); // put UI separately
   //draw UIs
   for (var j = 0; j <= 2; j++) {
     rect(xArr[j], yArr[j], 7, 30);
     stroke(255);
     line(50, 65+50*j, 150, 65+50*j)
   }
}

function star(posX, posY, radiusX, radiusY, transX, transY) {
  //a flower 
  fill(240, 160, 90, xArr[0]-50);
  //fill(255,50);
  noStroke()
  push();
  translate(transX, transY);
  pop();
  
  for (var i = 0; i < thickness; i++) {
    ellipse(posX, posY, radiusX, radiusY);
    rotate(PI / 3);
  }
}

function mousePressed() {
  // Did I click on slider?
  //for (var k = 0; k <= 2; k++){
    if (mouseX > xArr[0] && mouseX < xArr[0] + xArr[0] && mouseY > yArr[0] && mouseY < yArr[0] + hArr[0]) {
      dragging1 = true;
      dragging2 = false;
      dragging3 = false;
      // If so, keep track of relative location of click to corner of rectangle
      offsetX = xArr[0]-mouseX;
    }

    if (mouseX > xArr[1] && mouseX < xArr[1] + xArr[1] && mouseY > yArr[1] && mouseY < yArr[1] + hArr[1]) {
      dragging2 = true;
      dragging1 = false;
      dragging3 = false;
      // If so, keep track of relative location of click to corner of rectangle
      offsetX = xArr[1]-mouseX;
    }

    if (mouseX > xArr[2] && mouseX < xArr[2] + xArr[2] && mouseY > yArr[2] && mouseY < yArr[2] + hArr[2]) {
      dragging2 = false;
      dragging1 = false;
      dragging3 = true;
      // If so, keep track of relative location of click to corner of rectangle
      offsetX = xArr[2]-mouseX;
    }
}

function mouseReleased() {
  // Stop dragging
  dragging1 = false;
  dragging2 = false;
  dragging3 = false;
}