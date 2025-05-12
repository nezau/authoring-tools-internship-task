# Welcome to City Calculator App!

City Distance Calculator is a web application that allows users to calculate distances between user's current location and 25 random cities and check the current weather for each city.
Users can click on a city to recalculate distances from that city to all other cities.

---

## Features

- Calculate distance between your current location (or selected city) and other cities

- Click on a city to make it the new origin

- See current weather (temperature, icon, description) for each city

- Responsive UI (adjusts for very small screens)

- Smooth scroll from the landing page to the table

---

## Tech Stack

Frontend: Vue 3 + Vite

Backend: Node.js + Express

Geolocation: Browser Geolocation API

Distance Calculation: Haversine formula

Weather Data: OpenWeatherMap API

---

## How to run the project

Go to frontend and backend folder separately:
```
cd frontend
```
```
cd backend
```

Install dependencies:
```
npm install
```

Run the app:
```
npm run dev
```

## How distances are calculated

Distances between cities are calculated using the Haversine formula.
This formula calculates the great-circle distance between two points on a sphere given their longitudes and latitudes.

```
function haversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(degree) {
        return degree * Math.PI / 180;
    }
    
    const R = 6371;
    const diffLat = toRad(lat2 - lat1);
    const diffLon = toRad(lon2 - lon1);
      
    const { sin, cos, sqrt, atan2 } = Math;

    const a =
      sin(diffLat / 2) ** 2 +
      cos(toRad(lat1)) * cos(toRad(lat2)) *
      sin(diffLon / 2) ** 2;
  
    const c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return R * c;
  }
```

AI generated:
```
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
```
---
## Use of AI
- UI styling
- Troubleshooting and debugging
- Generate basic code, like route templates

---

## How to improve the app
- Add info for current location
- Improve UI/UX when switching the selected city
- Cache weather data to avoid multiple API calls when clicking cities
- Add error handling for unreachable APIs (both city and weather)
- Deploy both backend and frontend to a hosting provider
- Remove hardcoded weather api key
- Better code organisation
- State management (eg. Pinia)
