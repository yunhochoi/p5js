// GLOBAL------------------------------
var randomA, randomB, randomC, randomD, randomE, randomF;
var ranA, ranB, ranC, ranD, ranE, ranF;
var easing = 0.05;
var targetX;
var targetY;
var targetX2;
var targetY2;
var dot = [];
var r = 16;
var innerR = 8;
var randomValueX = [];
var randomValueY = [];
var bgColor = 0;
var stColor = 130;
var opacity = 3;
var day = false;

// SOUND
var s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
var songs = [];
var randomSound;

// DOM
var canvas;
var canvasX = 0;
var canvasY = 0;
var inputArray = [];
var button;

// DATA
var div;
var divArray = [];
var randomNounURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
  "&includePartOfSpeech=noun" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

// A random Adjective
var randomVerbURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&includePartOfSpeech=verb" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

// A random word
var randomAdvURL = "https://api.wordnik.com/v4/words.json/randomWord?" +
  "&includePartOfSpeech=adverb" +
  "&minLength=5&maxLength=-1" +
  "&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";

function preload() {
  s1 = loadSound('/assets/0.mp3');
  s2 = loadSound('/assets/1.mp3');
  s3 = loadSound('/assets/2.mp3');
  s4 = loadSound('/assets/3.mp3');
  s5 = loadSound('/assets/4.mp3');
  s6 = loadSound('/assets/5.mp3');
  s7 = loadSound('/assets/6.mp3');
  s8 = loadSound('/assets/7.mp3');
  s9 = loadSound('/assets/8.mp3');
  s10 = loadSound('/assets/9.mp3');
  s11 = loadSound('/assets/10.mp3');
}

function setup() {
  songs.push(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(canvasX, canvasY);
  ellipseMode(CENTER);
  stroke(255);

  //color setting
  randomA = 155 + random(100);
  randomB = 155 + random(100);
  randomC = 155 + random(100);
  ranA = color(randomA, randomB, randomC, opacity);

  //DOM
  var button1 = createButton('noun');
  button1.mousePressed(randomNoun);
  button1.position(0, window.innerHeight - 30);

  var button2 = createButton('verb');
  button2.mousePressed(randomVerb);
  button2.position(57, window.innerHeight - 30);

  var button3 = createButton('adverb');
  button3.mousePressed(randomAdv);
  button3.position(109, window.innerHeight - 30);

  var button4 = createButton('change');
  button4.mousePressed(changed);
  button4.position(179, window.innerHeight - 30);

  //1st object creation
  dot.push(new Dot(width / 10 + random(width) * 8 / 10, height / 10 - 10 + random(height) * 8 / 10 - 10));
  inputArray.push(createInput('Put any nouns'));
  inputArray[0].changed(inputAdded);
  inputArray[0].size(100);
}

function draw() {
  //noprotect
  background(bgColor, 50);
  drawMessage();
  targetX = random(windowWidth / 10 - 50, windowWidth * 9 / 10);
  targetY = random(windowHeight / 10 - 50, windowHeight * 9 / 10);
  targetX2 = random(windowWidth / 10 - 50, windowWidth * 9 / 10);
  targetY2 = random(windowHeight / 10 - 50, windowHeight * 9 / 10);
}

function inputAdded() {
  inputArray.push(createP(inputArray[0].value()));
  inputArray[0].value(' ');
  dot.push(new Dot((windowWidth / 10 + random(windowWidth) * 9 / 10) - 70, 0));
  console.log(inputArray.length + ',', dot.length);

  //random sound play
  
 

  //give random words
  randomVerb();
  myRan = int(random(0, 11));
  randomNoun();
   songs[myRan].play();
  randomAdv();
}

// TEXT DRAWING FUNCTION ---------------------------------
function textAdded() {

  //create text
  inputArray.push(div);
  dot.push(new Dot((windowWidth / 10 + random(windowWidth) * 9 / 10) - 70, 0));

  //random sound play
  myRan = int(random(0, 11));
  songs[myRan].play();
  //r = 2 * myRan;
}

function drawMessage() {
  stroke(stColor);
  strokeWeight(0.1);
  noFill();
  for (var i = 0; i < dot.length; i++) { //must be length
    dot[i].show();
    dot[i].move(random(-1, 1), random(-1, 1));

    //easing
    var dx = randomValueX[i] - dot[i].x;
    dot[i].x += dx * easing;
    var dy = randomValueY[i] - dot[i].y;
    dot[i].y += dy * easing;

    //draw dots and texts
    inputArray[i].position(dot[i].x + 10, dot[i].y + 10);
    //div.position(dot[i].x, dot[i].y + 20);

    if (day === true) {
      randomValueX.push(targetX);
      randomValueY.push(targetY);
    } else {
      randomValueX.push(targetX2);
      randomValueY.push(targetY2);
    }

    //draw triangle
    if (i < dot.length - 2) { //blocks overdefined
      fill(ranA);
      //triangle(dot[i].x, dot[i].y, dot[i + 1].x, dot[i + 1].y, dot[i + 2].x, dot[i + 2].y);
      line(dot[i].x, dot[i].y, dot[i + 1].x, dot[i + 1].y);
      line(dot[i + 1].x, dot[i + 1].y, dot[i + 2].x, dot[i + 2].y);

      fill(200);
      ellipse(dot[i + 2].x, dot[i + 2].y, innerR, innerR);
    }
  }
}

function changed() {
  if (day === false) {
    for (var i = 0; i < dot.length; i++) {
      dot[i].x = windowWidth / 2;
      dot[i].y = windowHeight / 2;
    }
    // if (dot.length > 1) {
    //   inputArray.pop();
    //   dot.pop();
    // }
    ranA = color(200 + random(55), 200 + random(55), 200 + random(55), 4);
    stroke(200 + random(55), 200 + random(55), 200 + random(55), 4);
    fill(200 + random(55), 200 + random(55), 200 + random(55), 4);
    bgColor = 255;
    stColor = 0;
    day = true;
  } else {
    for (var j = 0; j < dot.length; j++) {
      dot[j].x = windowWidth / 2;
      dot[j].y = windowHeight / 2;
    }
    // if (dot.length > 1) {
    //   inputArray.pop();
    //   dot.pop();
    // }

    ranA = color(200 + random(55), 200 + random(55), 200 + random(55), 4);
    stroke(0);
    strokeWeight(0.02);
    fill(200 + random(55), 200 + random(55), 200 + random(55), 4);

    bgColor = 0;
    stColor = 130;
    day = false;
  }
}

// DATA FUNCTION ---------------------------
function randomNoun() {
  wordnik('nouns', randomNounURL);
}

function randomVerb() {
  wordnik('verbs', randomVerbURL);
}

function randomAdv() {
  wordnik('adv', randomAdvURL);
}

function wordnik(where, url) {
  loadJSON(url, wordLoaded);

  function wordLoaded(data) {
    div = createP(data.word);
    // div.html('');
    textAdded();

  }
}