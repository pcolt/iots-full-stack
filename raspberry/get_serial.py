# Get serial data from Arduino and print it to conosole
# This file is just a copy of the one on the Raspberry Pi.

import serial
import time

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # connect to Arduino via serial communication
ser.reset_input_buffer()                              # empty the buffer before start

while True:
  time.sleep(1)                                       # upload a measurment every 10 seconds
  ser.flushInput()                                    # flush all last serial data not usefull
  line = ser.readline().decode('utf-8').rstrip()      # read first complete line from serial communication
  print(line)