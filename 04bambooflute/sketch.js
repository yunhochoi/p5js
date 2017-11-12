/* feel the oriental music! by Yun Ho Choi
Danso, the oriental bamboo flute only uses Do, Re, Mi, Sol, Ra, Do for its music.
I created an impromptu musical performance with KNN algorithm.
*/

var points = [];
var noises = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var noises1 = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var ran = [];
var ran1 = [];
var spd = 0.002;


var cmajor = {
  'C': 60,
  'D': 62,
  'E': 64,
  'G': 67,
  'A': 69,
}

var training = [{
  note: 'C',
  x: Math.random() * 100,
  y: 100
}, {
  note: 'D',
  x: 400,
  y: 100
}, {
  note: 'E',
  x: 500,
  y: 200
}, {
  note: 'G',
  x: 100,
  y: 400
}, {
  note: 'A',
  x: 200,
  y: 400
}]




// What is k
// This example will work by definition with a k of 1
var k = 1;

// All the training data
var data;
var osc;
var radio;

function setup() {
  createCanvas(600, 600);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.start();
  osc.amp(0);

  radio = createRadio();
  //radio.option('classification');
  //radio.option('regression');
  //radio.value('classification');

  var playpause = createButton('play');
  playpause.mousePressed(function() {
    var amp = osc.amp();
    if (amp.value == 0.5) {
      osc.amp(0, 0.1); //off
      playpause.html('play');
    } else {
      osc.amp(0.5, 0.1); //on
      playpause.html('stop');
    }
  });
}


function draw() {
  background(0);

  var x = mouseX;
  var y = mouseY;


  // Nearest Neighbor Classification!
  /*if (radio.value() == 'classification')*/ {

    // Simple KNN algorithm with K = 1 for classification
    var note = null;
    var recordD = Infinity;
    for (var i = 0; i < training.length; i++) {
      var point = training[i];
      // Euclidean distance to this neighbor
      var d = dist(width/2, height/2, point.x, point.y);
      if (d < recordD) {
        note = point.note;
        recordD = d;
      }
    }

    var midi = cmajor[note];
    var freq = translateMIDI(midi);
    osc.freq(freq);

  } /*else if (radio.value() == 'regression') {

    // KNN regression! K is just everything weighted according to distance
    var sumWeights = 0;
    for (var i = 0; i < training.length; i++) {
      var point = training[i];
      var d = dist(x, y, point.x, point.y);
      point.weight = 1 / (d * d);
      sumWeights += point.weight;
    }

    var sum = 0;
    for (var i = 0; i < training.length; i++) {
      var point = training[i];
      var note = cmajor[point.note];
      var freq = translateMIDI(note);
      sum += freq * point.weight;
    }

    var freq = sum / sumWeights;
    osc.freq(freq);
  }
*/
  
  // Now draw all the training data to see how it looks
  for (var i = 0; i < training.length; i++) {
    var rans1 = random(3)*spd;
    var rans2 = random(3)*spd;
    var rans3 = random(3)*spd;
    var rans4 = random(3)*spd;
    var rans5 = random(3)*spd;
    var rans6 = random(3)*spd;
    var rans7 = random(3)*spd;
    var rans8 = random(3)*spd;
    var rans9 = random(3)*spd;
    var rans10 = random(3)*spd;
    var rans11 = random(3)*spd;
    var rans12 = random(3)*spd;
    
    ran.push(rans1, rans2,rans3,rans4,rans5,rans6)
    ran1.push(rans7, rans8,rans9,rans10,rans11,rans12)
    noises[i] = noises[i] + ran[i];
    noises1[i] = noises1[i] + ran1[i];
    var n = noise(noises[i]) * width;
    var n2 = noise(noises1[i]) * width;
    var point = training[i];
    //xoff = xoff + .01;
    points.push(training[i]);
    //noises.push(xoff);
    //console.log(rans1 + "," +  rans2);

    stroke(0);
    fill(255);
    ellipse(points[i].x, points[i].y, 24, 24);
    
    points[i].x = n + rans1;
    points[i].y =n2 + rans2;
    
    stroke(255);
    strokeWeight(0.5);
    line(width/2, height/2, points[i].x, points[i].y);
    ellipse(width/2, height/2, 20, 20);

    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(point.note, point.x, point.y + 6);
  }
  //console.log(training.length);

}

function translateMIDI(note) { // why?
  return pow(2, ((note - 69) / 12.0)) * 440;
}