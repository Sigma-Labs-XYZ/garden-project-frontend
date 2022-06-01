import React, { useState, useEffect } from "react";

export default function Weather() {
  const [forecastData, setForecastData] = useState({});
  const [city, setCity] = useState("Amsterdam");

  useEffect(() => {
    fetchWeatherData();
  }, []);

  async function fetchWeatherData() {
    const response = await fetch(
      `https://goweather.herokuapp.com/weather/${city}`
    );
    const data = await response.json();
    setForecastData(data);
  }

  console.log(forecastData);

  function displayWeatherData() {
    return (
      <div className="forecastCardMother">
        <div className="forecastCard" id="day0">
          <h2>Today:</h2>
          <h4>{forecastData.description}</h4>
          <h4>Temperature: {forecastData.temperature}</h4>
          <h4>Wind: {forecastData.wind}</h4>
        </div>
        <div className="forecastCard" id="day1">
          <h2>Tomorrow:</h2>
          <h4>Temperature: {forecastData.forecast[0].temperature}</h4>
          <h4>Wind: {forecastData.forecast[0].wind}</h4>
        </div>
        <div className="forecastCard" id="day2">
          <h2>The day after:</h2>
          <h4>Temperature: {forecastData.forecast[1].temperature}</h4>
          <h4>Wind: {forecastData.forecast[1].wind}</h4>
        </div>
        <div className="forecastCard" id="day3">
          <h2>The day after that:</h2>
          <h4>Temperature: {forecastData.forecast[2].temperature}</h4>
          <h4>Wind: {forecastData.forecast[2].wind}</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>The forecast in {city}:</h3>
      {displayWeatherData()}
    </div>
  );
}
