import React, { useState, useEffect } from 'react';
import axios from "axios"

const Weather = ({ city }) => {
    
    const api_key = process.env.REACT_APP_API_KEY
    const url_literal = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
    const url = url_literal.replace(/\s/g, '')
  
    const [weather, setWeather] = useState([])
  
    const getWeather = () => {
      axios
        .get(url)
        .then(res => {
          setWeather(res.data.current)
        })
    }
    useEffect(getWeather, [])
  
    return (
      <div>
        <h3>Weather in {city}</h3>
        <p>Temperature: {weather.temperature} Celsius</p>
        <p>Wind: {weather.wind_speed} mph, direction {weather.wind_dir}</p>
      </div>
    )
  }

  export default Weather