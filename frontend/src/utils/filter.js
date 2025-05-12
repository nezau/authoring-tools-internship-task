export function sortByTemperatureAsc(cities) {
    return [...cities].sort((a, b) => a.weather?.temp - b.weather?.temp)
}

export function sortByTemperatureDesc(cities) {
    return [...cities].sort((a, b) => b.weather?.temp - a.weather?.temp)
}

export function filterAbove20(cities) {
    return cities.filter(city => city.weather?.temp >= 20)
}

export function filterBelow20(cities) {
    return cities.filter(city => city.weather?.temp < 20)
}