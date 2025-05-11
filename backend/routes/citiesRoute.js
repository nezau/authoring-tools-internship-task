import express from 'express'
import { getAllCities, getRandomCities } from '../controllers/citiesController.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cities = await getAllCities()
    res.json(cities)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cities' })
  }
})


router.get('/random', async (req, res) => {
  try {
    const cities = await getRandomCities()
    res.json(cities)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cities' })
  }
})

export default router