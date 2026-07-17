import React from "react";

function MainWeatherIcon({ iconType, isNight }) {
  // Αν είναι νύχτα, αλλάζουμε τα εικονίδια του ήλιου σε φεγγάρι
  if (isNight) {
    if (iconType === "Clear") {
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#f1c40f" }}>
          dark_mode
        </span>
      );
    }
    if (iconType === "Clouds") {
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#ecf0f1" }}>
          nightlight_round
        </span>
      );
    }
  }

  // Για την ημέρα (ή για καιρικά φαινόμενα όπως βροχή/χιόνι που είναι ίδια μέρα-νύχτα)
  switch (iconType) {
    case "Clear":
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#f39c12" }}>
          wb_sunny
        </span>
      );
    case "Clouds":
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#ecf0f1" }}>
          cloud
        </span>
      );
    case "Rain":
    case "Drizzle":
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#3498db" }}>
          umbrella
        </span>
      );
    case "Thunderstorm":
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#9b59b6" }}>
          thunderstorm
        </span>
      );
    case "Snow":
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#a1c4fd" }}>
          ac_unit
        </span>
      );
    default:
      return (
        <span className="material-icons" style={{ fontSize: "2.5rem", color: "#fff" }}>
          thermostat
        </span>
      );
  }
}

export default MainWeatherIcon;