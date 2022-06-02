import React, { useState, useEffect } from "react";

export default function Weather() {
  const [forecastData, setForecastData] = useState({});
  const [gardenData, setGardenData] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    async function fetchData() {
      await fetchLocationOfUser(1);
      await fetchWeatherData();
    }
    fetchData();
  }, []);

  //   async function convertFromPostCodesToCities(city) {
  //     if (parseInt(city).isNaN === true) {
  //       //check if uk postcode or if just city
  //     } else {
  //       if (
  //         parseInt(city).toString().length === 5 &&
  //         parseInt(city) >= 1 &&
  //         parseInt(city) <= 99950
  //       ) {
  //         //convert from US zip code to city
  //         //DOESNT WORK YET AS NEED AN API KEY
  //         const response = await fetch(
  //           `http://maps.googleapis.com/maps/api/geocode/json?address=${city}&sensor=false`
  //         );
  //         const data = await response.json();
  //         setCity(data);
  //       }
  //     }
  //   }

  async function fetchLocationOfUser(id) {
    const response = await fetch(
      `http://garden-project.sigmalabs.co.uk/garden/${id}`
    );
    const data = await response.json();
    await setGardenData(data);
  }

  async function fetchWeatherData() {
    const response = await fetch(
      `https://goweather.herokuapp.com/weather/${city}`
    );
    const data = await response.json();
    setForecastData(data);
    const location = await gardenData[0].location;
    await setCity(location);
  }

  function getTwoDaysLater() {
    const day2 = new Date(Date.now() + 172800000);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(day2);
  }

  function getThreeDaysLater() {
    const day3 = new Date(Date.now() + 259200000);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(day3);
  }

  function displayWeatherData() {
    return (
      <div className="forecast-card-mother">
        <div className="forecast-card" id="day0">
          <h2>Today:</h2>
          <h4>{forecastData.description}</h4>
          <h4>Temperature: {forecastData.temperature}</h4>
          <h4>Wind: {forecastData.wind}</h4>
        </div>
        <div className="forecast-card" id="day1">
          <h2>Tomorrow:</h2>
          <h4>Temperature: {forecastData.forecast[0].temperature}</h4>
          <h4>Wind: {forecastData.forecast[0].wind}</h4>
        </div>
        <div className="forecast-card" id="day2">
          <h2>{getTwoDaysLater()}:</h2>
          <h4>Temperature: {forecastData.forecast[1].temperature}</h4>
          <h4>Wind: {forecastData.forecast[1].wind}</h4>
        </div>
        <div className="forecast-card" id="day3">
          <h2>{getThreeDaysLater()}:</h2>
          <h4>Temperature: {forecastData.forecast[2].temperature}</h4>
          <h4>Wind: {forecastData.forecast[2].wind}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="forecast-slide">
      <h3>The forecast in {city}:</h3>
      {displayWeatherData()}
    </div>
  );
}
