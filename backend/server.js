import express from 'express'
import cors from 'cors'
import citiesRoute from './routes/citiesRoute.js'

const app = express()
const port = 5000

app.use(cors())

app.use('/cities', citiesRoute)

app.get('/', (req, res) => {
  res.send('Backend is running')
})

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`)
})
