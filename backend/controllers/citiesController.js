import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getRandomElements(arr, n) {
  const result = []
  const usedIndices = new Set()

  while (result.length < n && usedIndices.size < arr.length) {
    const index = Math.floor(Math.random() * arr.length)
    if (!usedIndices.has(index)) {
      usedIndices.add(index)
      result.push(arr[index])
    }
  }

  return result
}

export async function getAllCities() {
  const data = await fs.readFile(path.join(__dirname, '../assets/cities.json'), 'utf-8')
  return JSON.parse(data)
}

export async function getRandomCities() {
  const allCities = await getAllCities()

  const citiesByCountry = allCities.reduce((acc, city) => {
    if (!acc[city.country]) acc[city.country] = []
    acc[city.country].push(city)
    return acc
  }, {})

  const countries = Object.keys(citiesByCountry)
  const selectedCountries = getRandomElements(countries, 25)

  return selectedCountries.map(country => {
    const cities = citiesByCountry[country]
    return cities[Math.floor(Math.random() * cities.length)]
  })
}
