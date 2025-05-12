import axios from 'axios'

const apiKey = '10cf685c0dbc1f6441221e32d2b5eb2a'

export const getWeather = async (req, res) => {
  const { lat, lon } = req.query
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' })
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    res.json({
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon
    })
  } catch (error) {
    console.error('Error fetching weather:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to fetch weather' })
  }
}
