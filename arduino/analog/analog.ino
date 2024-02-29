// use Arduino IDE to modify, compile and upload this file to the Arduino board

int sensorPin = A0;   // select the input pin for the potentiometer or the photoresistor
int sensorValue = 0;  // variable to store the value coming from the sensor

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps 
  Serial.println();   // reset serial print
}

void loop() {
  // put your main code here, to run repeatedly:
  int sensorValue = analogRead(sensorPin);  // read the value from the sensor

  if (0 < sensorValue < 1023) {         // if value has proper format send it via serial communication
    // Serial.print("Analog to digital value: ");
    Serial.println(sensorValue);
  } else {                              // otherwise send 'invalid'        
    Serial.println('invalid');
  }
   
  delay(100);       // take 10 measurements per second
}
