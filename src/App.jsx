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

  const filteredHistory = history.filter(h => 
    h.toLowerCase().startsWith(city.toLowerCase()) && city.length > 0
  );

  return (
    <div style={{ 
      height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', color: 'white', padding: '10px', boxSizing: 'border-box',
      background: getBackground(), transition: '1s ease', justifyContent: 'center',
      overflow: 'hidden', position: 'fixed'
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
            transition: transform 0.2s ease;
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

          .mi-icon { font-family: 'Material Icons Round'; font-size: 24px; margin-bottom: 4px; color: rgba(255,255,255,0.9); }

          .weather-icon { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7)); }

          @media (max-width: 399px) {
            .search-btn { padding: 10px 15px; font-size: 0.75rem; }
            .main-temp { font-size: 4.2rem !important; }
            .city-name { font-size: 2.4rem !important; }
          }
        `}
      </style>

      {weather && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Header */}
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', opacity: 0.9 }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
              <div className="main-temp" style={{ fontSize: '5.5rem', fontWeight: '900', lineHeight: 1 }}>{Math.round(weather.main.temp)}°</div>
              <h1 className="city-name" style={{ fontSize: '3rem', margin: 0, fontWeight: '900', lineHeight: 1 }}>{weather.name}</h1>
            </div>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', width: '100%', zIndex: 100 }}>
            <div className="search-wrapper">
              <input className="search-input" type="text" placeholder="Αναζήτηση πόλης..." value={city} 
                onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}} 
                onKeyDown={(e) => e.key === "Enter" && getWeather()} />
              {city && <span style={{ color: '#888', cursor: 'pointer', padding: '0 10px' }} onClick={() => setCity("")}>✕</span>}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>
            </div>
            {showDropdown && filteredHistory.length > 0 && (
              <div style={{ position: 'absolute', top: '110%', left: 0, right: 0 }}>
                {filteredHistory.map((h, i) => (
                  <div key={i} style={{ background: 'white', color: '#333', padding: '12px 20px', marginTop: '5px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', cursor: 'pointer' }} onClick={() => getWeather(h)}>
                    <span>{h}</span>
                    <span style={{ color: '#ff4d4d' }} onClick={(e) => { e.stopPropagation(); setHistory(prev => prev.filter(item => item !== h)); }}>✕</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weekly Forecast - Μεγαλύτερα Tiles */}
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '15px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '5px' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img className="weather-icon" src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" width="42" />
                <div style={{ fontWeight: '900', fontSize: '1.3rem', marginTop: '5px' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* Details Grid - Με εικονίδια */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%' }}>
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
    <div className="glass-tile" style={{ padding: '18px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="mi-icon">{icon}</span>
      <div style={{ fontSize: '0.75rem', fontWeight: '900', marginBottom: '2px', opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

export default App;
