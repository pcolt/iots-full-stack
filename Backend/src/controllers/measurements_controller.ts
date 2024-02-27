import express from 'express'
const measurementsRouter = express.Router()
import influxClient from '../utils/influxdb'
import { Measurement } from '../types'


async function getMeasurements() {

  const query = 'SELECT * FROM \'home3\'' 
  // WHERE time >= now() - interval '24 hours' AND 
  // ('bees' IS NOT NULL OR 'ants' IS NOT NULL) order by time asc`

  // eslint-disable-next-line @typescript-eslint/await-thenable
  const rows = await influxClient.query(query, 'sensors1')
  const measurements: Measurement[] = []

  for await (const row of rows) {
    if ('time' in row && typeof row.time === 'number' && 'location' in row && typeof row.location === 'string' && 'light' in row && typeof row.light === 'string') {
      measurements.push(row as Measurement)
    } else {
      throw new Error('Invalid data from InfluxDB!')
    }
    
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  influxClient.close()

  return measurements
}

measurementsRouter.get('/', (_req, res) => {
  getMeasurements()
    .then(data => {
      console.log('Measurements retrieved')
      res.json(data)
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({error: 'Measurements incorret or not found'})
    })
})

export default measurementsRouter