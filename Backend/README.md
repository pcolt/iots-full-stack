# Backend 🏗️ (work in progress)

 Backend in Node.js that queries the data from InfluxDb, the data is served as REST api or as single-page web application (experiment with Google Cloud Functions)

## Install

Install dependencies: `npm install`

Create `.env` file with:
```
PORT = 3000
INFLUXDB_TOKEN = 'token_from_influxdata_cloud'
```

## Usage

Start in dev with auto-reload: `npm run dev`    
Lint: `npm run lint`  
Compile Typescript files: `npm run tsc`  
Run compilet files: `npm start`  

## Dependencies

### InfluxDB

[Documentation](https://github.com/InfluxCommunity/influxdb3-js/tree/main) of Javascript library to interact with InfluxDB 3
