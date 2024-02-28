import 'dotenv/config'
import {InfluxDBClient} from '@influxdata/influxdb3-client'

const token = process.env.INFLUXDB_TOKEN

const newClient = () => {
  const client = new InfluxDBClient({host: 'https://eu-central-1-1.aws.cloud2.influxdata.com', token: token})
  return client
}

export default newClient