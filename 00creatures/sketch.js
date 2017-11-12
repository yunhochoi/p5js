var mover;
var waver;
var attractor;
var linewave;

var theta = 1;
var amplitude = []; // Height of wave
var dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
var yvalues; // Using an array to store height values for the wave (not entirely necessary)
var lineNum =10;
var linewave = [];

var radious;
var ranL, ranX;
var earthQuake = 300;

function preload() {
  song = loadSound('sound.mp3');
}

function setup() {

  createCanvas(window.innerWidth, window.innerHeight);
  song.play();

  for (var i = 0; i <= lineNum; i++) {
    linewave[i] = new Linewave(10 + random(100),  // amp
      random(0.05),                               // vel
      50+random(width / 2 - 200),                    // length
      -50 + random(150) * i,                       // xpos        
      random(1, -1) * 40 * i + (height / 2),// ypos 
      random(10),                                 // radius
      random(10),                                 // noiseX
      0,                
      185 + random(70),                       // R
      185 + random(70),                       // G
      185 + random(70));                      // B

    linewave[i].init();
  }
}

function draw() {

  background(50,30,30);

  /*-------------------------
 |       LIVE CONTROL        |
 -------------------------*/
 if (keyCode == 50) {
  blendMode(ADD);
} if (keyCode == 51) {
  blendMode(EXCLUSION);
} if (keyCode == 52) {
  blendMode(MULTIPLY);
} if (keyCode == 53) {
  blendMode(SCREEN);
} if (keyCode == 54) {
  blendMode(REPLACE);
} if (keyCode == 89) {
  blendMode(OVERLAY);
} if (keyCode == 85) {
  blendMode(BURN);
} if (keyCode == 73) {
  blendMode(HARD_LIGHT);
} if (keyCode == 79) {
  blendMode(SOFT_LIGHT);
} if (keyCode == 80) {
  blendMode(DODGE);
} 

if (keyCode == 38) {
  earthQuake += 1;
  for (var k = 0; k <= lineNum; k++) {
    linewave[k].theta +=0.1;
  }
}
if (keyCode == 57) {
  earthQuake += 1;
  for (var k = 0; k <= lineNum; k++) {
    linewave[k].theta +=0.5;
    linewave[k].waveLength +=5;
  }
}
  // FINAL
  if (keyCode == 56) {
    earthQuake += 2;
    for (var k = 0; k <= lineNum; k++) {
      linewave[k].theta +=0.2;
      linewave[k].waveLength +=5;
    }
    blendMode(SCREEN);
  }

  if (keyCode == 57) {
    earthQuake += 2;
    for (var k = 0; k <= lineNum; k++) {
      linewave[k].theta +=0.5;
      linewave[k].waveLength +=5;
    }
    blendMode(OVERLAY);
  }

  if (keyCode == 48) {
    earthQuake += 2;
    for (var k = 0; k <= lineNum; k++) {
      linewave[k].theta +=1;
      linewave[k].waveLength +=5;
    }
    blendMode(DIFFERENCE);
  }

  // TERMINATE
  if (keyCode == 189) {
    background(255);
    blendMode(ADD);
  }
  
  // wave
  for (var j = 0; j <= lineNum; j++) {
    linewave[j].calcWave();
    linewave[j].renderWave();
    // ocean
    fill(255,255 * noise(j / 1.0),255 * noise(j / 1.0));
    beginShape();
    var f1 = noise(j / 10.0) + 0.5;
    var f2 = noise(j / 10.0);
    var f3 = noise(j / 1.3) + .5;
    var f4 = noise(j / 1.2, frameCount / 1000.0);

    for (var i = window.innerWidth + 100; i > -100; i -= 5) {
      vertex(i, height * 6/7 + (earthQuake * f4) * cos(f1 * TWO_PI * i / 600 + 100 * f2 - frameCount / (100.0 * f3)));
    }
    endShape();

    while (linewave[j].w <= linewave[j].waveLength) {
      linewave[j].w += 1;
    }
  }
}