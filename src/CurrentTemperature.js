import React, { useState } from "react";
import "./CurrentTemperature.css";

export default function CurrentTemperature(props) {
  let [unit, setUnit] = useState(`celsius`);
  function displayFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }
  function displaycelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }
  if (unit === "celsius") {
    return (
      <div className="currentTemperature">
        <div className="current-temperature">
          <span>{Math.round(props.celsius)}</span>
          <span className="units">
            °C |{" "}
            <a href="/" onClick={displayFahrenheit}>
              °F
            </a>
          </span>
        </div>
      </div>
    );
  } else {
    let fahrenheitConversion = (props.celsius * 9) / 5 + 32;
    return (
      <div className="currentTemperature">
        <div className="current-temperature">
          <span>{Math.round(fahrenheitConversion)}</span>
          <span className="units">
            <a href="/" onClick={displaycelsius}>
              °C
            </a>{" "}
            | °F
          </span>
        </div>
      </div>
    );
  }
}
