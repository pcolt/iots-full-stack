# iots-full-stack

- Ip local address raspberry pi: 192.168.1.180
- Ip local address laptop: 192.168.1.65

Connect via ssh `ssh pi@[ip-address]`

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
