import express from 'express'
const measurementsRouter = express.Router()
import newInfluxClient from '../utils/influxdb'
import { Measurement } from '../types'


async function getLastMeasure() {

  // eslint-disable-next-line @stylistic/ts/quotes
  const query = `SELECT "light", "location", "time" FROM "my_home" order by "time" desc limit 1`

  const influxClient = newInfluxClient()
  const rows = influxClient.query(query, 'sensors1')
  const measures: Measurement[] = []

  for await (const row of rows) {
    if ('time' in row && typeof row.time === 'number' && 'location' in row && typeof row.location === 'string' && 'light' in row && typeof row.light === 'bigint') {
      const measure = {
        time: row.time,
        location: row.location,
        light: Number(row.light)      // convert bigint to number
      }
      measures.push(measure)
    } else {
      await influxClient.close()
      throw new Error('Invalid data from InfluxDB!')
    }

  }

  await influxClient.close()

  return measures
}

measurementsRouter.get('/', (_req, res) => {
  getLastMeasure()
    .then(data => {
      console.log('Measurements retrieved')
      console.log(data)
      res.json(data)
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({error: 'Measurements incorret or not found'})
    })
})

export default measurementsRouter