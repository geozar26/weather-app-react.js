import React from "react";

function WeatherForecast({ forecast, formatText }) {
  return (
    <div className="forecast-container" style={{ display: "flex", gap: 6 }}>
      {forecast.map((f, i) => (
        <div key={i} className="glass" style={{ flex: 1, padding: "12px 2px" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 950 }}>
            {formatText(
              new Date(f.dt_txt).toLocaleDateString("el-GR", {
                weekday: "short",
              })
            )}
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`}
            alt=""
            width="38"
          />
          <div style={{ fontWeight: 950, fontSize: "1rem" }}>
            {Math.round(f.main.temp)}°
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherForecast;