# Get serial data from Arduino and write data to influxdata cloud database.
# This file is just a copy of the one on the Raspberry Pi.

import serial
import paho.mqtt.publish as publish
import os, time
from influxdb_client_3 import InfluxDBClient3, Point
from dotenv import load_dotenv

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # connect to Arduino via serial communication
ser.reset_input_buffer()                              # empty the buffer before start

load_dotenv()                                         # take environment variables from .env
token = os.environ.get("INFLUXDB_TOKEN")              # get token from environment variable (from command line `export INFLUXDB_TOKEN=abcd123...`)
org = "iots"
host = "https://eu-central-1-1.aws.cloud2.influxdata.com"
database="sensors1"

client = InfluxDBClient3(host=host, token=token, org=org) # Initialize an InfluxDB client

def writeToInfluxDB(value):
  point = (                                     # create a data point for a measurement
    Point("my_home")
    .tag("location", "studio")
    .field("light", value)
  )
  client.write(database=database, record=point)         # write measurement to database
  print("Written "+str(value)+" to influx")


while True:
  time.sleep(1)                                 # upload a measurment every 1 seconds
  ser.flushInput()                              # flush all last serial data not usefull
  line = ser.readline().decode('utf-8').rstrip()    # read first complete line from serial communication
  print(line)

  if not line and not line.isnumeric():         # continue if value not valid because not a number
    print("Serial value is not numeric")
    # writeToInfluxDB(0)
    continue

  lineNumber = int(line)
  if 0 > lineNumber > 1023:                     # continue if value not valid beacause out of range (analog to digital)
    print("Serial value is out of range")
    # writeToInfluxDB(0)
    continue

  writeToInfluxDB(lineNumber)