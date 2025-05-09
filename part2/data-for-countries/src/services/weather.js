import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_WEATHER

const getWeather = (capital) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
    return request.then(response => response.data)
}

export default {getWeather}