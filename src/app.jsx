import { useState, useEffect, useRef } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [localTime, setLocalTime] = useState({ date: "", time: "" });

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

      // 5-day forecast: κρατάμε entries γύρω στις 12:00
      const daily = fData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5);

      setForecast(daily);

      // Hourly forecast: επόμενα 8 τρίωρα
      const hourly = fData.list.slice(0, 8);
      setHourlyForecast(hourly);

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
        return "linear-gradient(180deg, #f9a826 0%, #ef6c00 100%)";
      case "Clouds":
        return "linear-gradient(180deg, #7f8fa6 0%, #34495e 100%)";
      case "Rain":
      case "Drizzle":
        return "linear-gradient(180deg, #4b6cb7 0%, #182848 100%)";
      case "Thunderstorm":
        return "linear-gradient(180deg, #4b3f72 0%, #1f1c2c 100%)";
      case "Snow":
        return "linear-gradient(180deg, #c9d6ff 0%, #e2e2e2 100%)";
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        return "linear-gradient(180deg, #95a5a6 0%, #2c3e50 100%)";
      default:
        return "linear-gradient(180deg, #4c5c74 0%, #2c3e50 100%)";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        color: "white",
        background: weather ? getBg(weather.weather[0].main) : "#2c3e50",
        transition: "background 0.8s ease",
        padding: "28px 18px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
        }

        body {
          overflow-x: hidden;
        }

        .glass {
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 30px rgba(0,0,0,0.18);
        }

        .app-shell {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .top-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 22px;
          align-items: stretch;
        }

        .main-panel {
          border-radius: 30px;
          padding: 26px;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: visible;
        }

        .main-top-row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .date-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .date-text {
          font-size: 0.95rem;
          font-weight: 900;
          letter-spacing: 0.4px;
          text-shadow: 0 2px 5px rgba(0,0,0,0.18);
        }

        .weather-center {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .city-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .temp-big {
          font-size: clamp(4.5rem, 9vw, 7rem);
          font-weight: 900;
          line-height: 0.95;
          text-shadow: 0 6px 18px rgba(0,0,0,0.18);
        }

        .city-name-big {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 950;
          line-height: 1.1;
          text-shadow: 0 3px 10px rgba(0,0,0,0.16);
          word-break: break-word;
        }

        .desc-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .desc-text {
          font-size: 1.2rem;
          font-weight: 900;
          text-shadow: 0 2px 5px rgba(0,0,0,0.16);
        }

        .search-area {
          width: 100%;
          max-width: 470px;
          position: relative;
          z-index: 2000;
        }

        .search-wrapper {
          background: white;
          border-radius: 999px;
          padding: 5px;
          display: flex;
          align-items: center;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.24);
          min-height: 54px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          color: #333;
          font-weight: 800;
          padding: 0 14px;
          min-width: 0;
          font-size: 0.95rem;
        }

        .search-btn {
          background: black;
          color: white;
          border: none;
          min-height: 44px;
          padding: 0 20px;
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
          font-size: 0.72rem;
          transition: transform 0.2s ease, background 0.2s ease;
          flex-shrink: 0;
        }

        .search-btn:hover {
          transform: scale(1.04);
          background: #111;
        }

        .close-icon-btn {
          color: #666 !important;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-right: 6px;
          font-size: 20px !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }

        .close-icon-btn:hover {
          transform: scale(1.18);
          color: #000 !important;
        }

        .history-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          right: 0;
          background: white;
          border-radius: 22px;
          z-index: 3000;
          box-shadow: 0 14px 35px rgba(0,0,0,0.25);
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
          transition: background 0.18s ease;
        }

        .history-item:last-child {
          border-bottom: none;
        }

        .history-item:hover {
          background: #f6f6f6;
        }

        .error-text {
          color: #ffd166;
          font-weight: 900;
          font-size: 0.9rem;
          margin-top: 12px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }

        .back-btn {
          background: rgba(0,0,0,0.45);
          color: white;
          border: 1px solid rgba(255,255,255,0.35);
          padding: 11px 22px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 900;
          cursor: pointer;
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
          width: fit-content;
        }

        .back-btn:hover {
          background: white;
          color: black;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
        }

        .summary-strip {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 18px;
        }

        .summary-mini-card {
          border-radius: 22px;
          padding: 16px 14px;
          min-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
        }

        .summary-mini-label {
          font-size: 0.75rem;
          font-weight: 900;
          opacity: 0.95;
          letter-spacing: 0.3px;
        }

        .summary-mini-value {
          font-size: 1.35rem;
          font-weight: 950;
        }

        .side-panel {
          border-radius: 30px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-height: 420px;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 950;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .forecast-card {
          border-radius: 22px;
          padding: 14px 8px;
          text-align: center;
          min-height: 128px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }

        .forecast-day {
          font-size: 0.8rem;
          font-weight: 950;
        }

        .forecast-temp {
          font-size: 1rem;
          font-weight: 950;
        }

        .hourly-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .hour-card {
          border-radius: 20px;
          padding: 12px 8px;
          text-align: center;
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          align-items: center;
        }

        .hour-time {
          font-size: 0.78rem;
          font-weight: 900;
        }

        .hour-temp {
          font-size: 0.95rem;
          font-weight: 950;
        }

        .bottom-panel {
          border-radius: 30px;
          padding: 22px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }

        .detail-tile {
          border-radius: 24px;
          padding: 18px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 132px;
          text-align: center;
        }

        .tile-icon {
          visibility: hidden;
        }

        .tile-icon.ready {
          visibility: visible !important;
        }

        .detail-label {
          font-size: 0.72rem;
          font-weight: 950;
          color: white;
          margin-bottom: 4px;
          margin-top: 4px;
          letter-spacing: 0.2px;
        }

        .detail-value {
          font-size: 1.05rem;
          font-weight: 950;
          line-height: 1.2;
        }

        @media (max-width: 1180px) {
          .top-grid {
            grid-template-columns: 1fr;
          }

          .side-panel {
            min-height: auto;
          }

          .detail-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 860px) {
          .forecast-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .hourly-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .summary-strip {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .main-panel,
          .side-panel,
          .bottom-panel {
            padding: 18px;
            border-radius: 24px;
          }

          .city-row {
            gap: 12px;
          }

          .search-wrapper {
            min-height: 50px;
          }

          .search-btn {
            min-height: 40px;
            padding: 0 16px;
            font-size: 0.68rem;
          }

          .forecast-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .detail-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 420px) {
          .detail-grid {
            grid-template-columns: 1fr 1fr;
          }

          .hourly-row {
            grid-template-columns: 1fr 1fr;
          }

          .forecast-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      {weather && (
        <div className="app-shell">
          <div className="top-grid">
            {/* LEFT / MAIN PANEL */}
            <div className="main-panel glass">
              <div className="main-top-row">
                <div className="date-block">
                  <div className="date-text">
                    {localTime.date} {localTime.time}
                  </div>
                </div>
              </div>

              <div className="weather-center">
                <div className="city-row">
                  <span className="temp-big">{Math.round(weather.main.temp)}°</span>
                  <span className="city-name-big">{formatText(weather.name)}</span>
                </div>

                <div className="desc-row">
                  <MainWeatherIcon iconType={weather.weather[0].main} />
                  <div className="desc-text">
                    {formatText(weather.weather[0].description)}
                  </div>
                </div>

                <div style={{ marginTop: "20px" }} className="search-area" ref={dropdownRef}>
                  <div className="search-wrapper">
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

                  {error && <div className="error-text">{error}</div>}

                  {showHistory && filteredHistory.length > 0 && (
                    <div className="history-dropdown">
                      {filteredHistory.map((h, i) => (
                        <div
                          key={i}
                          className="history-item"
                          onClick={() => getWeather(h)}
                        >
                          <span>{h}</span>
                          <span
                            className="material-icons close-icon-btn"
                            style={{ fontSize: "18px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setHistory((prev) => prev.filter((c) => c !== h));
                            }}
                          >
                            close
                          </span>
                        </div>
                      ))}
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

                <div className="summary-strip">
                  <div className="summary-mini-card glass">
                    <div className="summary-mini-label">ΑΙΣΘΗΤΗ ΘΕΡΜΟΚΡΑΣΙΑ</div>
                    <div className="summary-mini-value">
                      {Math.round(weather.main.feels_like)}°
                    </div>
                  </div>

                  <div className="summary-mini-card glass">
                    <div className="summary-mini-label">ΥΓΡΑΣΙΑ</div>
                    <div className="summary-mini-value">{weather.main.humidity}%</div>
                  </div>

                  <div className="summary-mini-card glass">
                    <div className="summary-mini-label">ΑΝΕΜΟΣ</div>
                    <div className="summary-mini-value">
                      {Math.round(weather.wind.speed)} m/s
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="side-panel glass">
              <div>
                <div className="section-title">ΠΡΟΓΝΩΣΗ 5 ΗΜΕΡΩΝ</div>
                <div className="forecast-grid" style={{ marginTop: "12px" }}>
                  {forecast.map((f, i) => (
                    <div key={i} className="forecast-card glass">
                      <div className="forecast-day">
                        {formatText(
                          new Date(f.dt_txt).toLocaleDateString("el-GR", {
                            weekday: "short",
                          })
                        )}
                      </div>
                      <img
                        src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`}
                        alt={f.weather[0].description}
                        width="42"
                        height="42"
                      />
                      <div className="forecast-temp">{Math.round(f.main.temp)}°</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="section-title">ΩΡΙΑΙΑ ΠΡΟΓΝΩΣΗ</div>
                <div className="hourly-row" style={{ marginTop: "12px" }}>
                  {hourlyForecast.map((item, i) => (
                    <div key={i} className="hour-card glass">
                      <div className="hour-time">
                        {new Date(item.dt_txt).toLocaleTimeString("el-GR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                        width="38"
                        height="38"
                      />
                      <div className="hour-temp">{Math.round(item.main.temp)}°</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM DETAILS PANEL */}
          <div className="bottom-panel glass">
            <div className="section-title" style={{ marginBottom: "14px" }}>
              ΛΕΠΤΟΜΕΡΕΙΕΣ ΚΑΙΡΟΥ
            </div>

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
      case "Drizzle":
        return "umbrella";
      case "Thunderstorm":
        return "flash_on";
      case "Snow":
        return "ac_unit";
      case "Mist":
      case "Fog":
      case "Haze":
      case "Smoke":
        return "blur_on";
      default:
        return "filter_drama";
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "Clear":
        return "#ffd43b";
      case "Rain":
      case "Drizzle":
        return "#7cc7ff";
      case "Thunderstorm":
        return "#ffe066";
      case "Snow":
        return "#f1f3f5";
      default:
        return "#ffffff";
    }
  };

  return (
    <i
      className={`material-icons tile-icon ${isReady ? "ready" : ""}`}
      style={{
        fontSize: "34px",
        color: getIconColor(iconType),
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
    <div className="detail-tile glass">
      <i
        className={`material-icons tile-icon ${isReady ? "ready" : ""}`}
        style={{
          color: col,
          fontSize: "24px",
          marginBottom: "5px",
        }}
      >
        {icon}
      </i>
      <div className="detail-label">{label}</div>
      <div className="detail-value">{val}</div>
    </div>
  );
}

export default App;
