import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Current Position:', position);
    },
    (error) => {
      console.error('Error getting geolocation', error);
    }
)

createApp(App).mount('#app')
