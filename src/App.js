import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import {WEATHER_API_URL , WEATHER_API_KEY} from './api'
import { useState } from 'react';
import ForeCast from './components/forecast/ForeCast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForeCast] = useState(null);
  const [searchData, setSearchData] = useState({});

  const handleSearch = async (searchValue) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${WEATHER_API_KEY}`);
      const data = await response.json();
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        const weatherResponse = await fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        const forecastResponse = await fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        setCurrentWeather({ city: searchValue, ...weatherData });
        setForeCast({ city: searchValue, ...forecastData });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Search onSearchChange={handleSearch} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <ForeCast data={forecast} />}
    </div>
  );
}

export default App;