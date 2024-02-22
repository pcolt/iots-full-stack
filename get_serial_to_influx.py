# get serial data from Arduino and write data to influxdata cloud database

import serial
import paho.mqtt.publish as publish
import os, time
from influxdb_client_3 import InfluxDBClient3, Point

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # connect to Arduino via serial communication
ser.reset_input_buffer()                              # empty the buffer before start


token = os.environ.get("INFLUXDB_TOKEN")              # get token from environment variable (from command line `export INFLUXDB_TOKEN=abcd123...`)
org = "iots"
host = "https://eu-central-1-1.aws.cloud2.influxdata.com"

client = InfluxDBClient3(host=host, token=token, org=org) # Initialize an InfluxDB client.

database="sensors1"

while True:
  line = ser.readline().decode('utf-8').rstrip()                # read value from serial communication
  print(line)                                                   # print value to terminal

  if not line:                                                  # skip to next line if string is empty
    print("String is empty, skip")
    continue

  point = (                                              # create a data point for a measurement
    Point("home3")
    .tag("location", "sudio")
    .field("light", line)
  )
  client.write(database=database, record=point)         # write measurement to database
  print("Written data to influx")
