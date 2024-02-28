# 🧮 simple IoTs data full-stack project

A project to experiment with IoTs, data handling and web apps.  
This project gets inspiration from [Fybra - Indoor air quality](https://fybra.co/).  

- ✅ step 1: an [Arduino](/Arduino/) with analog photoresistor converts data to digital, which is sent serially through usb to a [Raspberry](/Raspberry/) which (optionally sends the data via MQTT pub/sub protocoll to an other Raspberry who acts as broker who then) sends the data to Influxdata cloud database
- 🏗️ step 2: [backend](/Backend/) in Node.js that queries the data from InfluxDb, the data is served as REST api or as single-page web application (experiment with Google Cloud Functions)
- step 3: add React Native mobile app
- step 4: change/add sensor to CO2 
- step 5: experiment with AI

# 📚 Working notes

## Network

- Ip local address raspberry pi: 192.168.1.180
- Ip local address laptop: 192.168.1.65

Connect via ssh `ssh pi@[ip-address]`

## Arduino part

README in [Arduino](/Arduino/) folder.

## Raspberry part

README in [Raspberry](/Raspberry/) folder.

## Backend part

README in [Backend](/Backend/) folder.

## General

### MQTT

#### Mosquitto


[Tutorial](https://logicaprogrammabile.it/mqtt-installare-mosquitto-raspberry-pi-progetti-iot/)
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


### INFLUXDB

#### InfluxDB Cloud Serverless

##### Influx CLI

- Install influx CLI [Docs](https://docs.influxdata.com/influxdb/cloud/tools/influx-cli/)
- Configure connection `influx config create --host-url CLUSTER_URL --org pcolt --token INFLUX_DATA_TOKEN --active --config-name sensors1`
- Write data [Docs](https://docs.influxdata.com/influxdb/cloud-serverless/get-started/write/)
`influx write --bucket sensors1 -p s "home2,location=studio light=600 1708502477"`

##### UI

- query all data from one table [Docs](https://docs.influxdata.com/influxdb/cloud-serverless/get-started/query/) `SELECT * from home2;`
- query all tables in bucket `SHOW TABLES;`
