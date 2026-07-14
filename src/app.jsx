import { useState, useEffect, useRef } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [localTime, setLocalTime] = useState("");
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
          [searchName, ...prev.filter((c) => c.toLowerCase() !== searchName.toLowerCase())].slice(0, 10)
        );
      }

      setCity("");
    } catch (err) {
      setError("ΠΡΟΒΛΗΜΑ ΣΥΝΔΕΣΗΣ");
    }
  };

  const filteredHistory = city
    ? history.filter((h) => h.toLowerCase().startsWith(city.toLowerCase()))
    : history;

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
        background: weather ? getBg(weather.weather[0].main) : "#2c3e50",
        transition: "background 0.8s ease",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          padding: 0;
        }

        .glass {
          background: rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(12px);
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .search-container {
          position: relative;
          width: 100%;
          max-width: 380px;
          z-index: 2000;
          margin: 0 auto;
        }

        .search-wrapper {
          background: white;
          border-radius: 50px;
          padding: 4px 4px 4px 12px;
          display: flex;
          align-items: center;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          height: 48px;
          overflow: visible;
          gap: 6px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0 12px;
          color: #333;
          font-weight: 700;
          background: transparent;
          min-width: 0;
          font-size: 0.9rem;
        }

        .search-btn {
          background: black;
          color: white;
          border: none;
          height: 40px;
          padding: 0 18px;
          border-radius: 50px;
          font-weight: 900;
          cursor: pointer;
          font-size: 0.65rem;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .search-btn:hover {
          transform: scale(1.05);
        }

        .close-icon-btn {
          color: #666 !important;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-right: 5px;
          font-size: 20px !important;
          display: flex !important;
          align-items: center;
        }

        .close-icon-btn:hover {
          transform: scale(1.2);
          color: #000 !important;
        }

        .back-btn {
          background: rgba(0,0,0,0.6);
          color: white;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 10px 22px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 900;
          cursor: pointer;
          margin-top: 15px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: white;
          color: black;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .tile-icon {
          visibility: hidden;
        }

        .tile-icon.ready {
          visibility: visible !important;
        }

        .hamburger-btn {
          background: transparent;
          border: none;
          color: #222; /* Σκούρο χρώμα για να κάνει αντίθεση στο λευκό search-bar */
          width: 34px;
          height: 34px;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          margin-left: 2px;
          font-size: 24px; /* Μέγεθος για το σύμβολο ☰ */
          font-weight: bold;
        }

        .hamburger-btn:hover {
          color: #000;
          transform: scale(1.08);
        }

        .history-dropdown {
          position: absolute;
          top: 110%;
          left: 0;
          right: 0;
          background: white;
          border-radius: 20px;
          z-index: 3000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          overflow: hidden;
        }

        .history-item {
          padding: 12px 18px;
          color: #333;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 800;
          border-bottom: 1px solid #eee;
        }

        .history-item:last-child {
          border-bottom: none;
        }

        .history-item:hover {
          background: #f7f7f7;
        }

        @media (max-width: 768px) {
          .search-wrapper {
            padding-left: 8px;
          }

          .search-btn {
            padding: 0 14px;
            font-size: 0.6rem;
          }

          .search-input {
            padding: 0 8px;
          }
        }

        @media (max-width: 400px) {
          .detail-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

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
          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: "0.9rem",
                marginBottom: 5,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              {localTime.date} {localTime.time}
            </div>

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
              <MainWeatherIcon iconType={weather.weather[0].main} />
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

          <div className="search-container" ref={dropdownRef}>
            <div className="search-wrapper">
              <button
                type="button"
                className="hamburger-btn"
                onClick={() => setShowHistory(!showHistory)}
                aria-label="Άνοιγμα ιστορικού"
              >
                <span>☰</span>
              </button>

              <input
                className="search-input"
                placeholder="ΑΝΑΖΗΤΗΣΗ..."
                value={city}
                onFocus={() => setShowHistory(true)}
                onChange={(e) => {
                  const val = e.target.value;
                  setCity(val);
                  if (val === "") setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && getWeather(city)}
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

              <button className="search-btn" onClick={() => getWeather(city)}>
                ΑΝΑΖΗΤΗΣΗ
              </button>
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
                        style={{ fontSize: "18px", marginRight: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setHistory((prev) => prev.filter((c) => c !== h));
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

            {formatText(weather.name) !== formatText(DEFAULT_CITY) && (
              <button
                className="back-btn"
                onClick={() => {
                  setError("");
                  getWeather(DEFAULT_CITY, true);
                }}
              >
                <span style={{ fontWeight: 900 }}>←</span> ΕΠΙΣΤΡΟΦΗ
              </button>
            )}
          </div>

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

          <div
            className="detail-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
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
                (weather.sys.sunrise + weather.timezone - 7200) * 1000
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
                (weather.sys.sunset + weather.timezone - 7200) * 1000
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

function DetailTile({ label, val, icon, col }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setIsReady(true));
  }, []);

  return (
    <div
      className="glass"
      style={{
        padding: "15px 2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <i
        className={`material-icons tile-icon ${isReady ? "ready" : ""}`}
        style={{ color: col, fontSize: "24px", marginBottom: "5px" }}
      >
        {icon}
      </i>
      <div
        style={{
          fontSize: "0.65rem",
          fontWeight: 950,
          color: "white",
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "1.05rem", fontWeight: 950 }}>{val}</div>
    </div>
  );
}

export default App;
