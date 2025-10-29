import { useState } from "react";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  const cityMap = {
    'πάτρα': 'Patra',
    'πατρα': 'Patra',
    'αθήνα': 'Athens',
    'θεσσαλονίκη': 'Thessaloniki',
    'ηράκλειο': 'Heraklion',
    'βερολίνο': 'Berlin',
    'παρίσι': 'Paris',
    'μακεδονία':'makedonia'
    // πρόσθεσε όποιες πόλεις θέλεις
  };

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    const cityName = cityMap[city.toLowerCase()] || city;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`
      );
      if (!response.ok) throw new Error("Δεν βρέθηκε η πόλη!");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Διαλέγει το σωστό emoji ανάλογα με τον καιρό και την ώρα
  const getWeatherEmoji = (weatherData) => {
    if (!weatherData) return "🌤️";

    const main = weatherData.weather[0].main;
    const now = Date.now() / 1000; // τρέχουσα ώρα σε Unix timestamp (sec)
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;
    const isDay = now >= sunrise && now <= sunset;

    switch(main) {
      case "Clear": return isDay ? "☀️" : "🌙";
      case "Clouds": return isDay ? "☁️" : "☁️🌙";
      case "Rain": return isDay ? "🌧️" : "🌧️🌙";
      case "Thunderstorm": return "⛈️";
      case "Snow": return "❄️";
      case "Drizzle": return "🌦️";
      case "Mist":
      case "Fog":
        return "🌫️";
      default: return isDay ? "🌤️" : "🌙";
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Πληκτρολόγησε πόλη..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />
        <button onClick={getWeather}>Αναζήτηση</button>
      </div>

      {loading && <p>Φόρτωση...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name} {getWeatherEmoji(weather)}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;