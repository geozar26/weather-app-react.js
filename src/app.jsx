import { useState, useEffect, useRef } from "react";
import MainWeatherIcon from "./components/MainWeatherIcon";
import DetailTile from "./components/DetailTile";
import WeatherForecast from "./components/WeatherForecast";
import "./app.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [localTime, setLocalTime] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";
  const DEFAULT_CITY = "Πάτρα";

  const formatText = (text) => {
    if (!text) return "";
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  };

  const getLocalTime = (offset) => {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 1000 * offset);

    return {
      date: formatText(
        nd.toLocaleDateString("el-GR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      ),
      time: nd.toLocaleTimeString("el-GR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  useEffect(() => {
    const saved = localStorage.getItem("weatherHistory");
    setHistory(saved ? JSON.parse(saved) : []);

    getWeather(DEFAULT_CITY, true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!weather) return;

    const timer = setInterval(() => {
      setLocalTime(getLocalTime(weather.timezone));
    }, 1000);

    return () => clearInterval(timer);
  }, [weather]);

  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  const getWeather = async (cityName, isInitial = false) => {
    if (!cityName) return;

    setError("");
    setShowHistory(false);

    const searchName = cityName.trim();

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          searchName
        )}&appid=${API_KEY}&units=metric&lang=el`
      );

      const fRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          searchName
        )}&appid=${API_KEY}&units=metric&lang=el`
      );

      if (!res.ok || !fRes.ok) {
        setError("Η ΠΕΡΙΟΧΗ ΔΕΝ ΒΡΕΘΗΚΕ");
        return;
      }

      const data = await res.json();
      const fData = await fRes.json();

      setWeather(data);
      setLocalTime(getLocalTime(data.timezone));

      setForecast(
        fData.list
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(0, 5)
      );

      if (!isInitial) {
        setHistory((prev) =>
          [
            searchName,
            ...prev.filter(
              (c) => c.toLowerCase() !== searchName.toLowerCase()
            ),
          ].slice(0, 10)
        );
      }

      setCity("");
    } catch (err) {
      setError("ΠΡΟΒΛΗΜΑ ΣΥΝΔΕΣΗΣ");
    }
  };

  const filteredHistory = city
    ? history.filter((h) =>
        h.toLowerCase().startsWith(city.toLowerCase())
      )
    : history;

  const getLocalTimestamp = () => {
    if (!weather) return 0;

    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;

    return Math.floor(
      (utc + weather.timezone * 1000) / 1000
    );
  };

  const currentLocalTime = getLocalTimestamp();

  const isNight = weather
    ? currentLocalTime < weather.sys.sunrise ||
      currentLocalTime > weather.sys.sunset
    : false;

  const getBg = (main) => {
    switch (main) {
      case "Clear":
        return "linear-gradient(to bottom, #f39c12, #d35400)";
      case "Clouds":
        return "linear-gradient(to bottom, #757f9a, #2c3e50)";
      case "Rain":
      case "Drizzle":
        return "linear-gradient(to bottom, #4b6cb7, #182848)";
      case "Thunderstorm":
        return "linear-gradient(to bottom, #4834d4, #130f40)";
      case "Snow":
        return "linear-gradient(to bottom, #a1c4fd, #c2e9fb)";
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        return "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
      default:
        return "linear-gradient(to bottom, #4c5c74, #2c3e50)";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        background: weather
          ? getBg(weather.weather[0].main)
          : "#2c3e50",
        transition: "background 0.8s ease",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      {/* MOBILE WEATHER MENU */}
      {showMenu && (
        <>
          <div
            className="mobile-menu-backdrop"
            onClick={() => setShowMenu(false)}
          ></div>

          <aside className="mobile-weather-menu">
            <div className="mobile-menu-header">
              <div>
                <span className="mobile-menu-kicker">WEATHER</span>
                <h2>MENU</h2>
              </div>

              <button
                className="mobile-menu-close"
                onClick={() => setShowMenu(false)}
                aria-label="Κλείσιμο menu"
              >
                ×
              </button>
            </div>

            <nav className="mobile-weather-nav">
              <button
                className="mobile-weather-nav-item active"
                onClick={() => setShowMenu(false)}
              >
                <span className="nav-number">01</span>
                <span className="nav-label">ΤΡΕΧΩΝ ΚΑΙΡΟΣ</span>
                <span className="nav-arrow">→</span>
              </button>

              <button
                className="mobile-weather-nav-item"
                onClick={() => setShowMenu(false)}
              >
                <span className="nav-number">02</span>
                <span className="nav-label">ΠΡΟΓΝΩΣΗ</span>
                <span className="nav-arrow">→</span>
              </button>

              <button
                className="mobile-weather-nav-item"
                onClick={() => setShowMenu(false)}
              >
                <span className="nav-number">03</span>
                <span className="nav-label">WEATHER MAP</span>
                <span className="nav-arrow">→</span>
              </button>

              <button
                className="mobile-weather-nav-item"
                onClick={() => {
                  setShowMenu(false);
                  setShowHistory(true);
                }}
              >
                <span className="nav-number">04</span>
                <span className="nav-label">ΙΣΤΟΡΙΚΟ</span>
                <span className="nav-arrow">→</span>
              </button>

              <button
                className="mobile-weather-nav-item"
                onClick={() => setShowMenu(false)}
              >
                <span className="nav-number">05</span>
                <span className="nav-label">ΑΓΑΠΗΜΕΝΑ</span>
                <span className="nav-arrow">→</span>
              </button>
            </nav>

            <div className="mobile-menu-footer">
              <span>LIVE WEATHER</span>

              <div className="mobile-menu-status">
                <span className="status-dot"></span>
                <span>ONLINE</span>
              </div>
            </div>
          </aside>
        </>
      )}

      {weather && (
        <div
          style={{
            textAlign: "center",
            width: "100%",
            maxWidth: "450px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
          }}
        >
          {/* HEADER CONTAINER */}
          <div className="top-header-container">
            <button
              type="button"
              className="hamburger-btn-outside"
              onClick={() => setShowMenu(true)}
              aria-label="Άνοιγμα weather menu"
            >
              ☰
            </button>

            <div
              style={{
                fontWeight: 900,
                fontSize: "0.9rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              {localTime.date} {localTime.time}
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 15,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "4.5rem",
                  fontWeight: 900,
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                {Math.round(weather.main.temp)}°
              </span>

              <span
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 950,
                  textShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                {formatText(weather.name)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <MainWeatherIcon
                iconType={weather.weather[0].main}
                isNight={isNight}
              />

              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {formatText(weather.weather[0].description)}
              </div>
            </div>
          </div>

          {/* SEARCH CONTAINER */}
          <div
            className="search-container"
            ref={dropdownRef}
          >
            <div className="search-row">
              <div className="search-wrapper">
                <input
                  className="search-input"
                  placeholder="ΑΝΑΖΗΤΗΣΗ..."
                  value={city}
                  onFocus={() => setShowHistory(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCity(val);

                    if (val === "") {
                      setError("");
                    }
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && getWeather(city)
                  }
                />

                {city && (
                  <span
                    className="material-icons close-icon-btn"
                    onClick={() => {
                      setCity("");
                      setError("");
                    }}
                  >
                    close
                  </span>
                )}

                <button
                  className="search-btn"
                  onClick={() => getWeather(city)}
                >
                  ΑΝΑΖΗΤΗΣΗ
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  color: "#FF8C00",
                  fontWeight: "900",
                  fontSize: "0.85rem",
                  marginTop: "10px",
                  textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                {error}
              </div>
            )}

            {showHistory && (
              <div className="history-dropdown">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((h, i) => (
                    <div
                      key={i}
                      className="history-item"
                      onClick={() => getWeather(h)}
                    >
                      <span>{h}</span>

                      <span
                        className="material-icons close-icon-btn"
                        style={{
                          fontSize: "18px",
                          marginRight: 0,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();

                          setHistory((prev) =>
                            prev.filter((c) => c !== h)
                          );
                        }}
                      >
                        close
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "15px 18px",
                      color: "#999",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    ΑΔΕΙΟ ΙΣΤΟΡΙΚΟ
                  </div>
                )}
              </div>
            )}

            {formatText(weather.name) !==
              formatText(DEFAULT_CITY) && (
              <button
                className="back-btn"
                onClick={() => {
                  setError("");
                  getWeather(DEFAULT_CITY, true);
                }}
              >
                <span>←</span> ΕΠΙΣΤΡΟΦΗ
              </button>
            )}
          </div>

          {/* FORECAST SECTION */}
          <WeatherForecast
            forecast={forecast}
            formatText={formatText}
          />

          {/* DETAIL GRID */}
          <div className="detail-grid">
            <DetailTile
              label="ΑΙΣΘΗΤΗ"
              val={`${Math.round(weather.main.feels_like)}°`}
              icon="thermostat"
              col="#FFD700"
            />

            <DetailTile
              label="ΥΓΡΑΣΙΑ"
              val={`${weather.main.humidity}%`}
              icon="water_drop"
              col="#4dabf7"
            />

            <DetailTile
              label="ΑΝΕΜΟΣ"
              val={`${Math.round(weather.wind.speed)}m/s`}
              icon="air"
              col="#69db7c"
            />

            <DetailTile
              label="ΑΝΑΤΟΛΗ"
              val={new Date(
                (weather.sys.sunrise +
                  weather.timezone -
                  7200) *
                  1000
              ).toLocaleTimeString("el-GR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              icon="wb_sunny"
              col="#ffd43b"
            />

            <DetailTile
              label="ΔΥΣΗ"
              val={new Date(
                (weather.sys.sunset +
                  weather.timezone -
                  7200) *
                  1000
              ).toLocaleTimeString("el-GR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              icon="wb_twilight"
              col="#FF3D00"
            />

            <DetailTile
              label="ΑΤΜ ΠΙΕΣΗ"
              val={`${weather.main.pressure} hPa`}
              icon="speed"
              col="#00D4FF"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;