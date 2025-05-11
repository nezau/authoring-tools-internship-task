<template>
  <div class="container">
    <div class="city-table-wrapper">
      <table class="city-table">
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country Name</th>
            <th>Country Code</th>
            <th>Coordinates</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="city in cities"
            :key="city.name + city.lat + city.lng"
          >
            <td>{{ city.name }}</td>
            <td>{{ city.country_name }}</td>
            <td>{{ city.country }}</td>
            <td>{{ city.lat }}, {{ city.lng }}</td>
            <td>{{ city.distance !== null ? city.distance.toFixed(2) : '–' }}</td>
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
import axios from 'axios'

const cities = ref([])

onMounted(async () => {
  try {
    const { latitude, longitude } = await getCurrentLocation()
    const res = await axios.get('http://localhost:5000/cities/random')
    cities.value = res.data.map(city => ({
      ...city,
      distance: haversineDistance(latitude, longitude, city.lat, city.lng),
    }))
  } catch (err) {
    console.error('Error fetching cities or location:', err)
  }
})
</script>
  