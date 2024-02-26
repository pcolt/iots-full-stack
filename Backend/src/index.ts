import 'dotenv/config'
import express from 'express'
import measurementsRouter from './controllers/measurements_controller'

const port = process.env.PORT

// await main()

const app = express()
// app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/measurements', measurementsRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})