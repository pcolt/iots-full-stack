import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import measurementsRouter from './controllers/measures_controller'

const port = process.env.PORT

// await main()

const app = express()
app.use(express.static('../frontend/dist'))     // when http GET request to main root or index.html it returns the static files in /dist build with vite
app.use(cors())                     // allow cors
// app.use(express.json())

// erry

app.use('/measures', measurementsRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})