# simple IoTs data full-stack project

A simple project to experiment with IoTs, data handling and visualistion on the web.  
This project gets inspiration from [Fybra - Indoor air quality](https://fybra.co/).  

- ✅ step 1: an Arduino with analog photoresistor converts data to digital, which is sent serially through usb to a Raspberry which (optionally sends the data via MQTT pub/sub protocoll to an other Raspberry who acts as broker who then) sends the data to Influxdata cloud database
- step 2: add a backend Node.js that queries the data from db, the data can be served as REST api or as single-page web application (experiment with Google Cloud Functions)
- step 3: add React Native mobile app

# Working notes

## Network

- Ip local address raspberry pi: 192.168.1.180
- Ip local address laptop: 192.168.1.65

Connect via ssh `ssh pi@[ip-address]`

## Python

### Virtualenv

install packages via virtual env [source](https://www.baeldung.com/linux/pip-fix-externally-managed-environment-error)
- install venv `sudo apt install python3-venv`
- create virtual envoirment `python3 -m venv ~/mypythonvirtualenv`
- activate `source mypythonvirtualenv/bin/activate`  
`(mypythonvirtualenv) $`
- install needed packages `pip install influxdb3-python`

In VSCode activate the environment with `Ctrl+Shift+P` and search for `Python: Select Interpreter`

## MQTT

### Mosquitto

[source](https://logicaprogrammabile.it/mqtt-installare-mosquitto-raspberry-pi-progetti-iot/)
- Install broker (on laptop)  
`sudo apt-get install mosquitto`  
`sudo service mosquitto status`  
`sudo service mosquitto restart`  

- to allow access from other address on port 1883 with no authentication add to file `/etc/mosquitto/mosquitto.conf`: 
```
listener 1883
allow_anonymous true
```

- Install client 
`sudo apt-get install mosquitto-clients`
- subscribe to a topic (from laptop)
`mosquitto_sub -h localhost -t "my_topic"`
- pubblish to a topic (from Raspberry)
`mosquitto_pub -h 192.168.1.65 -t "my_topic" -m "hello world"`

### Paho - Python

- Publish a single message to a broker, then disconnect cleanly. 
[Source](https://github.com/eclipse/paho.mqtt.python?tab=readme-ov-file#single)

Example:
```python
import paho.mqtt.publish as publish

publish.single("paho/test/topic", "payload", hostname="mqtt.eclipseprojects.io")
```

## INFLUXDB

### InfluxDB Cloud Serverless

#### Influx CLI

- Install influx CLI [source](https://docs.influxdata.com/influxdb/cloud/tools/influx-cli/)
- Configure connection `influx config create --host-url CLUSTER_URL --org pcolt --token INFLUX_DATA_TOKEN --active --config-name sensors1`
- Write data [source](https://docs.influxdata.com/influxdb/cloud-serverless/get-started/write/)
`influx write --bucket sensors1 -p s "home2,location=studio light=600 1708502477"`

#### UI

- query all data from one table [source](https://docs.influxdata.com/influxdb/cloud-serverless/get-started/query/) `SELECT * from home2;`
- query all tables in bucket `SHOW TABLES;`
