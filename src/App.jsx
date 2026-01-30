
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : ["Πάτρα", "Παρίσι", "Χανιά"];
  });

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  const getBackground = () => {
    if (!weather) return 'linear-gradient(to bottom, #2c3e50, #4ca1af)';
    const condition = weather.weather[0].main;
    switch (condition) {
      case 'Clear': return 'linear-gradient(to bottom, #f39c12, #d35400)';
      case 'Clouds': return 'linear-gradient(to bottom, #757f9a, #2c3e50)';
      case 'Rain': case 'Drizzle': return 'linear-gradient(to bottom, #1e3c72, #2a5298)';
      case 'Thunderstorm': return 'linear-gradient(to bottom, #0f2027, #2c5364)';
      case 'Snow': return 'linear-gradient(to bottom, #83a4d4, #b6fbff)';
      default: return 'linear-gradient(to bottom, #2c3e50, #4ca1af)';
    }
  };

  const getWeather = async (cityName = city) => {
    if (!cityName) return;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      if (!response.ok) return;
      const fResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      const data = await response.json();
      const fData = await fResponse.json();

      setWeather(data);
      setForecast(fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5));
      setCity(""); 
      setShowDropdown(false);
      setHistory(prev => [data.name, ...prev.filter(c => c !== data.name)].slice(0, 10));
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    getWeather(history[0] || "Πάτρα");
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  return (
    <div style={{ 
      minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', color: 'white', padding: '40px 15px', boxSizing: 'border-box',
      background: getBackground(), transition: '1s ease', justifyContent: 'flex-start',
      overflowY: 'auto'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
          
          .glass-tile {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 22px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .search-wrapper {
            background: white; border-radius: 50px; padding: 4px;
            display: flex; align-items: center; width: 100%; max-width: 400px;
            margin: 0 auto; box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          }

          .search-input {
            flex: 1; border: none; outline: none; padding: 12px 15px;
            font-size: 1rem; color: #111; background: transparent; min-width: 0;
          }

          .search-btn {
            background: black; color: white; border: none; padding: 10px 22px;
            border-radius: 50px; font-weight: 800; cursor: pointer;
            font-size: 0.8rem; white-space: nowrap; flex-shrink: 0;
          }

          .mi-icon { font-family: 'Material Icons Round'; font-size: 26px; margin-bottom: 4px; color: rgba(255,255,255,0.95); }
          .weather-icon-main { filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.6)); width: 100px; }
          .weather-icon-small { filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.5)); width: 45px; }

          @media (max-width: 399px) {
            .search-btn { padding: 10px 15px; font-size: 0.75rem; }
            .main-temp { font-size: 4.5rem !important; }
            .city-name { font-size: 2.5rem !important; }
          }
        `}
      </style>

      {weather && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Info - Με περιθώριο πάνω */}
          <div style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', opacity: 0.9 }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
              <div className="main-temp" style={{ fontSize: '6rem', fontWeight: '900', lineHeight: 1.1 }}>{Math.round(weather.main.temp)}°</div>
              <h1 className="city-name" style={{ fontSize: '3.2rem', margin: 0, fontWeight: '900', lineHeight: 1.1 }}>{weather.name}</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-5px' }}>
              <img className="weather-icon-main" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%', zIndex: 100 }}>
            <div className="search-wrapper">
              <input className="search-input" type="text" placeholder="Αναζήτηση..." value={city} 
                onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}} 
                onKeyDown={(e) => e.key === "Enter" && getWeather()} />
              {city && <span style={{ color: '#888', cursor: 'pointer', padding: '0 10px' }} onClick={() => setCity("")}>✕</span>}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>
            </div>
          </div>

          {/* Forecast Cards */}
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '15px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '900' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img className="weather-icon-small" src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '900', fontSize: '1.3rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* Detail Grid - Με περιθώριο κάτω */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%', marginBottom: '30px' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" value={`${Math.round(weather.main.feels_like)}°`} />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" value={`${weather.main.humidity}%`} />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" value={`${weather.wind.speed}m/s`} />
            <DetailTile label="ΑΝΑΤΟΛΗ" icon="wb_sunny" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} />
            <DetailTile label="ΔΥΣΗ" icon="wb_twilight" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} />
            <DetailTile label="ΠΙΕΣΗ" icon="speed" value={weather.main.pressure} />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, value }) {
  return (
    <div className="glass-tile" style={{ padding: '20px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="mi-icon">{icon}</span>
      <div style={{ fontSize: '0.75rem', fontWeight: '900', marginBottom: '4px', opacity: 0.85 }}>{label}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

export default App;
