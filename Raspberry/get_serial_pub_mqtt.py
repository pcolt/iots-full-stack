# get serial data from Arduino and publish to MQTT broker

import serial
import time
import paho.mqtt.publish as publish

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # connect to Arduino via serial communication
ser.reset_input_buffer()                              # empty the buffer before start

while True:
  line = ser.readline().decode('utf-8').rstrip()      
  print(line)                                                   # print value to terminal
  publish.single("mio_topic", line, hostname="192.168.1.65")    # pubblish value to MQTT broker
