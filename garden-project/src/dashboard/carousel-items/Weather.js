import React, { useState, useEffect } from "react";
import { Card, Stack } from "react-bootstrap";
import CreateGardenForm from "../../garden/CreateNewGardenForm.js";
import backupWeather from "./backupWeather.js";

export default function Weather() {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      await getUUID();
    }
    fetchData();
  }, []);

  async function getUUID() {
    const cookies = await document.cookie;

    const sessionID = cookies
      .split("; ")
      .find((row) => row.startsWith("session="))
      .split("=")[1];

    await fetchUserID(sessionID);
  }

  async function fetchUserID(sessionID) {
    const response = await fetch(
      `https://garden-project.sigmalabs.co.uk/allGardens`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionID: sessionID }),
      }
    );
    const data = await response.json();

    const capitalisedFirstName =
      data[0].first_name.slice(0, 1).toUpperCase() +
      data[0].first_name.slice(1);

    if (data.length) {
      await fetchLocationOfUser(data[0].user_id);
      await setUserName(capitalisedFirstName);
    }
  }

  async function fetchLocationOfUser(id) {
    const response = await fetch(
      `https://garden-project.sigmalabs.co.uk/allGardens/${id}`
    );

    const data = await response.json();
    await fetchWeatherData(data);
    setLoading(false);
  }

  async function fetchWeatherData(gardenData) {
    const forecastForEachGarden = [];

    for (let garden of gardenData) {
      const response = await fetch(
        `https://goweather.herokuapp.com/weather/${garden.location}`
      );
      const data = await response.json();
      const forecastObject = { city: garden.location, forecast: data };

      forecastForEachGarden.push(forecastObject);
    }
    checkingForMultipleLocations(forecastForEachGarden);
  }

  function returnRandomBackupWeather() {
    const randomNumber = Math.floor(Math.random() * 4);
    return backupWeather.backupWeather[randomNumber];
  }

  async function checkingForMultipleLocations(gardenData) {
    const forecastForEachGarden = [];
    const cityOfEachGarden = [];
    let forecastObject;

    for (let garden of gardenData) {
      cityOfEachGarden.push(garden.city);
    }

    const uniq = [...new Set(cityOfEachGarden)];

    for (let city of uniq) {
      const response = await fetch(
        `https://goweather.herokuapp.com/weather/${city}`
      );

      if (response.ok === true) {
        const data = await response.json();
        forecastObject = { city: city, forecast: data };
        forecastForEachGarden.push(forecastObject);
      } else {
        forecastObject = {
          city: city,
          forecast: returnRandomBackupWeather(),
        };
        forecastForEachGarden.push(forecastObject);
      }
    }
    await setForecastData(forecastForEachGarden);
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
    if (forecastData.length) {
      return forecastData.map((garden) => {
        return (
          <Stack direction="vertical" gap={2}>
            <h3 id="weather-h3">The weather in {garden.city} is...</h3>
            <div className="forecast-card-mother">
              <div className="forecast-card day0">
                <Card style={{ width: "13rem" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>Today:</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Temperature: {garden.forecast.temperature}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Wind: {garden.forecast.wind}
                    </Card.Subtitle>
                    <Card.Text>{garden.forecast.description}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="forecast-card day1">
                <Card style={{ width: "13rem" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>Tomorrow:</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Temperature: {garden.forecast.forecast[0].temperature}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Wind: {garden.forecast.forecast[0].wind}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
              <div className="forecast-card day2">
                <Card style={{ width: "13rem" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>{getTwoDaysLater()}:</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Temperature: {garden.forecast.forecast[1].temperature}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Wind: {garden.forecast.forecast[1].wind}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>

              <div className="forecast-card day3">
                <Card style={{ width: "13rem" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>{getThreeDaysLater()}:</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Temperature: {garden.forecast.forecast[2].temperature}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      Wind: {garden.forecast.forecast[2].wind}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Stack>
        );
      });
    } else {
    }
  }

  return (
    <div className="forecast-slide">
      {loading ? (
        <div className="loading-spinner-wrapper">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p> Loading weather...</p>
        </div>
      ) : (
        <div className="forecast-slide overflow-auto">
          <Stack id="weather-title" direction="horizontal" gap={2}>
            <h1> Hi {userName}! </h1>
            <CreateGardenForm />
          </Stack>

          {displayWeatherData()}
        </div>
      )}
    </div>
  );
}
