#include "Adafruit_Thermal.h"
#include "SoftwareSerial.h"

// GLOBAL-------------------------------------------------------------------

// BUTTON PINS
int recordPin = 13;
int deletePin = 12;
int printPin = 11;

// LED PINS
int recordLED = 3;
int printLED = 2;

// BUTTON READINGS
int printReading;

// BUTTON STATES
int recordState = LOW;
int deleteState = LOW;
int printState = LOW;

// TIME
long time = 0;
long debounce = 100;

// OVERALL STATESw
int previousState[3] = {LOW, LOW, LOW};
int currentState[3] = {LOW, LOW, LOW};

// PRINTER
String myPrint;

// PRINTER SERIAL

#define TX_PIN 6 // Arduino transmit  YELLOW WIRE  labeled RX on printer
#define RX_PIN 5 // Arduino receive   GREEN WIRE   labeled TX on printer

SoftwareSerial mySerial(RX_PIN, TX_PIN); // Declare SoftwareSerial obj first
Adafruit_Thermal printer(&mySerial);     // Pass addr to printer constructor

// ARDUINO FUNCTIONS--------------------------------------------------------

void setup() {

  // BUTTON PIN MODE
  pinMode(recordPin, INPUT);
  pinMode(deletePin, INPUT);
  pinMode(printPin, INPUT);

  // LED PIN MODE
  pinMode(recordLED, OUTPUT);
  pinMode(printLED, OUTPUT);

  // P5 SERIAL
  Serial.begin(9600);

  // PRINTER SERIAL
  mySerial.begin(19200);  // Initialize SoftwareSerial
  printer.begin();        // Init printer (same regardless of serial type)

} // end setup

void loop() {

  // DIGITAL READ
  recordState = digitalRead(recordPin);
  deleteState = digitalRead(deletePin);
  printState = digitalRead(printPin);

  // DEFINE CURRENT STATE
  currentState[0] = recordState;
  currentState[1] = deleteState;
  currentState[2] = printState;

  // IF 0, IGNORE
  if (currentState[0] == 0 && currentState[1] == 0 && currentState[2] == 0) {
  } // end 0

  // IF NOT 0, USE INPUT
  else {

    // SEND STATE CHANGES TO P5
    Serial.print(currentState[0]);
    Serial.print(currentState[1]);
    Serial.println(currentState[2]);

    // CURRENT STATE BECOMES PREVIOUS STATE
    previousState[0] = currentState[0];
    previousState[1] = currentState[1];
    previousState[2] = currentState[2];

  } // end if

  // RECORD LED STATE
  if (recordState == HIGH) {
    digitalWrite(recordLED, HIGH);
  } // end if
  else {
    digitalWrite(recordLED, LOW);
  } // end else

   // LED
    if (printState == HIGH) {
      digitalWrite(printLED, HIGH);
    } // end if
    else {
      digitalWrite(printLED, LOW);
    } // end else

  // IF P5 SAYS, PRINT
  if (Serial.available() > 0) {

    // READ
    myPrint = Serial.readStringUntil('/');

    // PRINT
    printer.inverseOn(); // INVERSE ON

    printer.setSize('M'); // CUSTOMIZE TEXT
    printer.justify('L'); // CUSTOMIZE TEXT
    printer.println(F(" BOX ANONYMOUS")); // PRINT TEXT

    printer.println(); // SPACE

    printer.setSize('M'); // CUSTOMIZE TEXT
    printer.justify('C'); // CUSTOMIZE TEXT
    printer.println(myPrint); // PRINT TEXT

    printer.println(); // SPACE

    printer.setSize('M'); // CUSTOMIZE TEXT
    printer.justify('R'); // CUSTOMIZE TEXT
    printer.println(F("YAMI-ICHI 2016")); // PRINT TEXT

    printer.println(); // SPACE
    printer.println(); // SPACE
    printer.println(); // SPACE
    printer.println(); // SPACE
    printer.println(); // SPACE

  } // end if

} // end loop

// CALLBACK FUNCTIONS-------------------------------------------------------

