# Raspberry

<img src="/raspberry/raspberrypi_arduino_uno_serial_usb.png" alt="Circuit diagram" title="Circuit diagram" width="900"/>

# 📚 Working notes

## Network

- Ip local address raspberry pi: 192.168.1.180
- Ip local address laptop: 192.168.1.65

Connect via ssh `ssh pi@[ip-address]`

[Tutorial](https://roboticsbackend.com/raspberry-pi-arduino-serial-communication/): how to connect Raspberry to Arduino with serial communication 

## Python

### Virtualenv

Install packages via virtual env. [docs](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#install-packages-in-a-virtual-environment-using-pip-and-venv)
- install venv `sudo apt install python3-venv`
- create virtual envoirment `python3 -m venv .venv`
- activate `source .venv/bin/activate`  
`(.venv) $`
- install needed packages `pip install influxdb3-python`

In VSCode activate the environment with `Ctrl+Shift+P` and search for `Python: Select Interpreter`

If you want to install the packages in another computer:
```bash
$ virtualenv <env_name>
$ source <env_name>/bin/activate
(<env_name>)$ pip install -r path/to/requirements.txt
```
In order to create the requirements.txt from terminal with activated virtualenv `python3 -m pip freeze > requirements.txt` 

### Dot.env

a file .env in the root of the project is required with the following keys:
```
INFLUXDB_TOKEN=influxdatabase_cloud_apitoken
```

## MQTT

### Paho - Python

- Publish a single message to a broker, then disconnect cleanly. 
[docs](https://github.com/eclipse/paho.mqtt.python?tab=readme-ov-file#single)

Example:
```python
import paho.mqtt.publish as publish

publish.single("paho/test/topic", "payload", hostname="mqtt.eclipseprojects.io")
```

## InfluxDB