int sensorPin = A0;   // select the input pin for the potentiometer or the photoresistor
int sensorValue = 0;  // variable to store the value coming from the sensor

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps 
}

void loop() {
  // put your main code here, to run repeatedly:
  sensorValue = analogRead(sensorPin);  // read the value from the sensor

  // send read data via serial communication
  Serial.print("Analog to digital value: ");
  Serial.println(sensorValue); 
  delay(100);
}
