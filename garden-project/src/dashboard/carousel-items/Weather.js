import React, { useState, useEffect } from "react";

export default function Weather() {
  const [forecastData, setForecastData] = useState([]);
  const [gardenData, setGardenData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetchLocationOfUser(1); // hardcoded at the moment
      await fetchWeatherData();
    }
    fetchData();
  }, []);

  async function fetchLocationOfUser(id) {
    const response = await fetch(`http://localhost:8080/gardens/${id}`); //need to change once backend is pushed to heroku
    const data = await response.json();
    await setGardenData(data);
  }

  async function fetchWeatherData() {
    const forecastForEachGarden = [];
    gardenData.forEach(async (garden) => {
      const response = await fetch(
        `https://goweather.herokuapp.com/weather/${garden.location}`
      );
      const data = await response.json();
      const forecastObject = { city: garden.location, forecast: data };
      forecastForEachGarden.push(forecastObject);
    });
    await setForecastData(forecastForEachGarden);
    console.log(forecastData);
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
    return forecastData.map((garden) => {
      return (
        <div>
          <h3>The forecast in {garden.city}:</h3>
          <div className="forecast-card-mother">
            <div className="forecast-card day0">
              <h2>Today:</h2>
              <h4>{garden.forecast.description}</h4>
              <h4>Temperature: {garden.forecast.temperature}</h4>
              <h4>Wind: {garden.forecast.wind}</h4>
            </div>
            <div className="forecast-card day1">
              <h2>Tomorrow:</h2>
              <h4>Temperature: {garden.forecast.forecast[0].temperature}</h4>
              <h4>Wind: {garden.forecast.forecast[0].wind}</h4>
            </div>
            <div className="forecast-card day2">
              <h2>{getTwoDaysLater()}:</h2>
              <h4>Temperature: {garden.forecast.forecast[1].temperature}</h4>
              <h4>Wind: {garden.forecast.forecast[1].wind}</h4>
            </div>
            <div className="forecast-card day3">
              <h2>{getThreeDaysLater()}:</h2>
              <h4>Temperature: {garden.forecast.forecast[2].temperature}</h4>
              <h4>Wind: {garden.forecast.forecast[2].wind}</h4>
            </div>
          </div>
        </div>
      );
    });
  }

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

  return <div className="forecast-slide">{displayWeatherData()}</div>;
}
