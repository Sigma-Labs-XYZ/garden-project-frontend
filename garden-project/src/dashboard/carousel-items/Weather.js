import React, { useState, useEffect } from "react";
import { Card, Stack } from "react-bootstrap";
import CreateGardenForm from "../../garden/CreateNewGardenForm.js";

export default function Weather() {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await fetchLocationOfUser(1); // hardcoded at the moment
    }
    fetchData();
  }, []);

  async function fetchLocationOfUser(id) {
    const response = await fetch(
      `http://garden-project.sigmalabs.co.uk/gardens/${id}`
    ); //need to change once backend is pushed to heroku
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
    return forecastData.map((garden) => {
      return (
        <Stack direction="vertical" gap={2}>
          <h3>The weather in {garden.city} is...</h3>
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
          <h1> Hi *username* </h1>
          <CreateGardenForm />
          {displayWeatherData()}{" "}
        </div>
      )}
    </div>
  );
}
