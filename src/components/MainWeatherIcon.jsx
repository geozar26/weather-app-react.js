import { useState, useEffect } from "react";

function MainWeatherIcon({ iconType }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setIsReady(true));
  }, []);

  const getIconName = (type) => {
    switch (type) {
      case "Clear":
        return "wb_sunny";
      case "Clouds":
        return "cloud";
      case "Rain":
        return "umbrella";
      case "Thunderstorm":
        return "thunderstorm";
      case "Snow":
        return "ac_unit";
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        return "foggy";
      default:
        return "filter_drama";
    }
  };

  return (
    <i
      className={`material-icons tile-icon ${isReady ? "ready" : ""}`}
      style={{
        fontSize: "32px",
        color: iconType === "Clear" ? "#ffd43b" : "#fff",
      }}
    >
      {getIconName(iconType)}
    </i>
  );
}

export default MainWeatherIcon;