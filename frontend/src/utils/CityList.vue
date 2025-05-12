<template>
  <div class="container">
    <div class="city-table-wrapper">
      <div class="selected-city-info">
        Selected city:
        <span v-if="selectedCity">{{ selectedCity.name }}</span>
        <span v-else>Your location</span>
        <div v-if="selectedCity" class="back-to-location">
          <button @click="resetLocation">Return to my location</button>
        </div>
      </div>

      <table class="city-table">
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country Name</th>
            <th>Country Code</th>
            <th>Coordinates</th>
            <th>Distance (km)</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="city in cities"
            :key="city.name + city.lat + city.lng"
            :class="{ 'selected-city': selectedCity && selectedCity.name === city.name }"
            @click="handleRecalculate(city)"
          >
            <td>{{ city.name }}</td>
            <td>{{ city.country_name }}</td>
            <td>{{ city.country }}</td>
            <td>{{ city.lat }}, {{ city.lng }}</td>
            <td>{{ city.distance ? city.distance.toFixed(2) : '–' }}</td>
            <td>
              <div v-if="city.weather">
                <img :src="getIconUrl(city.weather.icon)" :alt="city.weather.description" width="40" />
                <div>{{ city.weather.temp }}°C</div>
                <div>{{ city.weather.description }}</div>
              </div>
              <div v-else>Loading...</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentLocation } from './geolocation.js'
import { haversineDistance } from './distance.js'
import { getWeather } from './weather.js'
import axios from 'axios'

const cities = ref([])
const selectedCity = ref(null)

const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

const handleRecalculate = (origin) => {
  selectedCity.value = origin
  cities.value = cities.value.map(city => ({
    ...city,
    distance: haversineDistance(origin.lat, origin.lng, city.lat, city.lng)
  }))
}

const resetLocation = () => {
  selectedCity.value = null
  if (currentLocation.value.lat && currentLocation.value.lng) {
    cities.value = cities.value.map(city => ({
      ...city,
      distance: haversineDistance(currentLocation.value.lat, currentLocation.value.lng, city.lat, city.lng)
    }))
  }
}

onMounted(async () => {
  try {
    const { latitude, longitude } = await getCurrentLocation()
    const res = await axios.get('http://localhost:5000/cities/random')

    const citiesWithWeather = await Promise.all(
      res.data.map(async (city) => {
        const weather = await getWeather(city.lat, city.lng)
        return {
          ...city,
          distance: haversineDistance(latitude, longitude, city.lat, city.lng),
          weather
        }
      })
    )

    cities.value = citiesWithWeather
  } catch (err) {
    console.error('Error fetching cities, location, or weather:', err)
  }
})
</script>
