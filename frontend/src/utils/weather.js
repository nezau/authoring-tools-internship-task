import axios from 'axios'

export async function getWeather(lat, lon) {
  try {
    const res = await axios.get(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`)
    return res.data
  } catch (error) {
    console.error('Error getting weather:', error)
    return null
  }
}