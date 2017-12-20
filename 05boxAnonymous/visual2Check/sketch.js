// GLOBAL-------------------------------------------------------------------------------

// SERIAL
var serial; // holds instance of serialPort library
var portName = '/dev/cu.usbmodem1411'; // serial port
var inData; // incoming data

// SPEECH
var myRec; // new P5.SpeechRec object

// ARRAY
var secrets = ["I am voting for Doland Trump","when I was a little kid I went into grocery stores with an empty backpack and filled it with food and walked out", "sometimes I smell really sweaty when I bike here and I'm afraid people think I stink"];

// P5 VARIBLES
var mySecret;
var myPrint;

// STATE
var goRecord;

// P5 VISUALS | DRAW 
var randomA, randomB, randomC;
var easing = 0.05;
var targetX;
var targetY;
var dot = [];
var r = 10;
var randomValueX = [];
var randomValueY = [];
var bgColor = 0;
var stColor = 130;
var innerR = 8;
var myP;

// P5 VISUALS | DOM
var canvas;
var canvasX = 0;
var canvasY = 50;
var inputArray = [];

// P5 VISUALS | AUDIO
var s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
var songs = [];
var randomSound;

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

// P5 FUNCTIONS--------------------------------------------------------------------------------

function setup() {
  //P5 AUDIO
  songs.push(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11);

  // CANVAS
  createCanvas(windowWidth, windowHeight);
  background(0);

  // P5 VISUALIZATION 
  ellipseMode(CENTER);
  noStroke();
  fill(0);
  textSize(60);
  textAlign(CENTER);
  text("Tell me a secret and I will tell you one back", width/2, height/2);

  // TRIANGLE COLOR SETTING
  randomA = 200 + random(55);
  randomB = 200 + random(55);
  randomC = 200 + random(55);

  // 1ST OBJECT CREATION
  dot.push(new Dot(width / 10 + random(width) * 8 / 10, height / 10 - 10 + random(height) * 8 / 10 - 10));
  inputArray.push(createInput('Your message'));
  inputArray[0].changed(addText);
  inputArray[0].position(0, 0);
  inputArray[0].hide();

  // SERIAL
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  console.log(serial);
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  // CALLBACK SERIAL
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  // STATE
  goRecord = true;

} // end setup

function draw() {

  // P5 VISUALS
  background(bgColor, 50);
  targetX = random(windowWidth / 10 - 50, windowWidth * 9 / 10);
  targetY = random(windowHeight / 10 - 50, windowHeight * 9 / 10);
  drawMessage();
  fill(stColor);
  textSize(60);
  text("Tell me a secret and I will tell you one back", windowWidth / 2, windowHeight - 20);

  // MANAGE INDATA

  if (inData === 100 && goRecord === true) { // RECORD BUTTON

    // CHECK
    console.log("record");

    // SPEECH
    myRec = new p5.SpeechRec(); // create new speech object 
    myRec.start(); // start recording
    myRec.onResult = showResult; // call showResult

    // STATE
    goRecord = false;

  } // end 1

  if (inData === 10 && goRecord === false) { // DELETE BUTTON

    // CHECK
    console.log("delete");

    // DELETE
    secrets.pop(secrets); // delete input from array
    myP.remove();

    console.log(inputArray[inputArray.length + 1]);
    console.log(secrets);

    // STATE 
    goRecord = true;

  } // end 10

  if (inData === 1 && goRecord === false) { // PRINT BUTTON

    // CHECK
    console.log("print");

    // PRINT
    myPrint = random(secrets); // get random variable

    while (myPrint === mySecret) { // myPrint != mySecret
      myPrint = random(secrets);
    } // end while

    serial.write(myPrint + "/"); // send to Arduino
    console.log(myPrint); // feeback

    // STATE
    goRecord = true;

  } // end 100

  // IF 11
  // IF 110
  // IF 101
  // IF 111

  // IF MULTIPLE - do what? 
  // HOW TO HOLD DOWN AND RECORD 

} // end draw

// SPEECH CALLBACK FUNCTIONS-----------------------------------------------------------------------

// function that takes audio input from user, transcribes it, and displays it visually in p5
function showResult() {
  if (myRec.resultValue === true) { // if person spoke

    // SPEECH
    mySecret = myRec.resultString; // store audio input as text 
    secrets.push(mySecret); // add input to array
    console.log(secrets);

    // P5 VISUALS
    addText();

  } // end if 
} // end showResult


// P5 VISUALIZATION FUNCTIONS-----------------------------------------------------------------------

function addText() {

  // CREATE TEXT
  fill(100);
  myP = createP(mySecret);
  inputArray.push(myP);

  // MAKE INPUT BOX EMPTY
  inputArray[0].value(' ');
  dot.push(new Dot((windowWidth / 10 + random(windowWidth) * 9 / 10) - 70, (windowHeight / 10 + random(windowHeight) * 9 / 10) - 50));

  myRan = int(random(0, 11));
  songs[myRan].play();
} // end addText


function drawMessage() {
  stroke(stColor);
  strokeWeight(0.02);
  fill(stColor);
  for (var i = 0; i < dot.length; i++) { //must be length
    dot[i].show();
    dot[i].move(random(-1, 1), random(-1, 1));

    // EASING
    var dx = randomValueX[i] - dot[i].x;
    dot[i].x += dx * easing;
    var dy = randomValueY[i] - dot[i].y;
    dot[i].y += dy * easing;

    // DOTS AND TEXTS
    inputArray[i].position(dot[i].x, dot[i].y + 20);
    randomValueX.push(targetX);
    randomValueY.push(targetY);

    // TRIANGLES
    if (i < dot.length - 2) { //blocks overdefined
      fill(randomA, randomB, randomC, 10);
      triangle(dot[i].x, dot[i].y, dot[i + 1].x, dot[i + 1].y, dot[i + 2].x, dot[i + 2].y);
      fill(200);
      ellipse(dot[i + 2].x, dot[i + 2].y, innerR, innerR);
    } // end if 
  } // end for 
} // end drawMessage

// SERIAL CALLBACK FUNCTIONS----------------------------------------------------------------

function printList(portList) { // print list of ports
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  } // end for 
} // end printList

function serverConnected() { // are we connected to the server?
  println('connected to server.');
} // end serverConnected

function portOpen() { // is the serial port open?
  println('the serial port opened...')
} // end portOpen

function serialEvent() { // read in the inData
  inData = Number(serial.readStringUntil("\n"));
} // end serialEvent

function serialError(err) { // error notiication
  println('Something went wrong with the serial port. ' + err);
} // end serialeError

function portClose() { // is the port closed?
  println('The serial port closed.');
} // end portClose