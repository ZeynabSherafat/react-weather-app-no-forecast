import React, { useState } from "react";
import axios from "axios";
import GetDate from "./GetDate";
import CurrentTemperature from "./CurrentTemperature";
import "./Weather.css";

export default function Weather() {
  const [on, setOn] = useState(false);
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});

  function currentlocation(event1) {
    event1.preventDefault();
    function showCurrentLocation(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiKey = "842b36d55cb28eba74a018029d56b04c";
      let currentLocationForecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      axios.get(currentLocationForecastUrl).then(showTemperature);
    }
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
  }

  function showTemperature(response) {
    setWeather({
      city: response.data.name,
      temp: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });

    setOn(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city !== "") {
      let apiKey = "842b36d55cb28eba74a018029d56b04c";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(url).then(showTemperature);
    } else {
      alert("Please enter a city! 😄");
    }
  }
  function replaceCity(event) {
    setCity(event.target.value);
  }
  if (on === true) {
    return (
      <div className="Weather">
        <div className="box">
          <form id="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a city"
              autoFocus="on"
              id="city"
              onChange={replaceCity}
            />{" "}
            <input type="submit" className="btn btn-primary" value="Search" />
          </form>
          <button
            type="button"
            className="btn btn-warning"
            id="current"
            onClick={currentlocation}
          >
            Current
          </button>
          <br />
          <div className="container text-center">
            <div className="row">
              <div className="col-9 left-heading">
                <h1>{weather.city}</h1>
                <GetDate />
                <div className="current-weather">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="almost cloudy"
                  />
                  <p className="current-weather">{weather.description}</p>
                </div>
              </div>
              <div className="col-3 temperature">
                <CurrentTemperature celsius={weather.temp} />
                <div id="windspeed">
                  Windspeed: {Math.round(weather.wind)} km/h
                </div>
                <div id="humidity">Humidity: {weather.humidity}%</div>
              </div>
            </div>
          </div>{" "}
          <br />
        </div>{" "}
      </div>
    );
  } else {
    let mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=karaj&appid=842b36d55cb28eba74a018029d56b04c&units=metric`;
    axios.get(mainUrl).then(showTemperature);

    return "Loading...";
  }
}
