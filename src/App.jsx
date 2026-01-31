import { useState, useEffect, useRef } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const dropdownRef = useRef(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : ["Πάτρα"];
  });

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setError("");
    setShowHistory(false);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      if (!response.ok) {
        setError("Η περιοχή δεν βρέθηκε.");
        return;
      }
      const fResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      const data = await response.json();
      const fData = await fResponse.json();

      setWeather(data);
      setForecast(fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5));
      setCity(""); 
      setHistory(prev => [data.name, ...prev.filter(c => c.toLowerCase() !== data.name.toLowerCase())].slice(0, 5));
    } catch (err) { 
      setError("Πρόβλημα σύνδεσης.");
    }
  };

  const removeHistoryItem = (e, itemToRemove) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item !== itemToRemove));
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    getWeather("Πάτρα");
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'flex-start', color: 'white', 
      padding: '40px 10px 100px 10px', boxSizing: 'border-box',
      background: getBackground(), transition: 'background 1s ease', overflowX: 'hidden'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.2s ease, background 0.2s ease;
          }
          .glass-tile:hover { transform: translateY(-3px); background: rgba(255, 255, 255, 0.25); }
          
          .search-wrapper {
            background: rgba(255, 255, 255, 0.95); border-radius: 12px; padding: 4px;
            display: flex; align-items: center; width: 100%; max-width: 400px;
            margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            position: relative; z-index: 100;
          }
          .search-input {
            flex: 1; border: none; outline: none; padding: 12px 15px;
            font-size: 1rem; color: #333; background: transparent;
          }
          .search-btn {
            background: #222; color: #fff; border: none; padding: 10px 20px;
            border-radius: 8px; font-weight: 600; cursor: pointer;
            font-size: 0.75rem; transition: 0.2s;
          }
          .close-btn-minimal {
            color: #777; cursor: pointer; padding: 0 12px; font-size: 1.1rem;
          }
          .close-btn-minimal:hover { color: #222; }

          .history-dropdown {
            position: absolute; top: calc(100% + 8px); left: 0; right: 0;
            background: white; border-radius: 12px; overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2); z-index: 99;
          }
          .history-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 12px 18px; color: #444; cursor: pointer; 
            border-bottom: 1px solid #eee; font-weight: 500;
          }
          .history-item:hover { background: #f5f5f5; }
          
          .intense-text { text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
        `}
      </style>

      {weather && (
        <div className="intense-text" style={{ textAlign: 'center', width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Header */}
          <div style={{ padding: '0 10px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', opacity: 0.85, marginBottom: '5px' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{ fontSize: '5.5rem', fontWeight: '800', lineHeight: 1 }}>{Math.round(weather.main.temp)}°</div>
              <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: 0, lineHeight: 1 }}>{weather.name}</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
              <img style={{ width: '80px' }} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              <div style={{ fontSize: '1.4rem', fontWeight: '600', textTransform: 'capitalize' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          {/* Search Area */}
          <div style={{ position: 'relative', width: '100%', padding: '0 10px' }} ref={dropdownRef}>
            <div className="search-wrapper">
              <input 
                className="search-input" 
                type="text" 
                placeholder="Αναζήτηση..." 
                value={city} 
                onFocus={() => setShowHistory(true)}
                onChange={(e) => { setCity(e.target.value); setError(""); setShowHistory(true); }} 
                onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }} 
              />
              {city && <span className="close-btn-minimal" onClick={() => setCity("")}>✕</span>}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>

              {showHistory && history.length > 0 && (
                <div className="history-dropdown">
                  {history.map((item, index) => (
                    <div key={index} className="history-item" onClick={() => getWeather(item)}>
                      <span>{item}</span>
                      <span className="close-btn-minimal" style={{fontSize: '0.9rem'}} onClick={(e) => removeHistoryItem(e, item)}>✕</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && <div style={{ color: '#ffeb3b', fontWeight: '700', marginTop: '10px' }}>{error}</div>}
          </div>

          {/* 5-Day Forecast */}
          <div style={{ display: 'flex', gap: '10px', padding: '0 10px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '15px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '700', opacity: 0.9 }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img style={{ width: '40px' }} src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '0 10px' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" value={`${Math.round(weather.main.feels_like)}°`} color="#E57373" />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" value={`${weather.main.humidity}%`} color="#64B5F6" />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" value={`${Math.round(weather.wind.speed)}m/s`} color="#81C784" />
            <DetailTile label="ΑΝΑΤΟΛΗ" icon="wb_sunny" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#FFD54F" />
            <DetailTile label="ΔΥΣΗ" icon="wb_twilight" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#F06292" />
            <DetailTile label="ΠΙΕΣΗ" icon="speed" value={weather.main.pressure} color="#AED581" />
          </div>

          {/* Spacer to prevent clipping */}
          <div style={{ height: '40px' }}></div>
        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, value, color }) {
  return (
    <div className="glass-tile" style={{ padding: '20px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="material-icons-round" style={{ 
        color: color, fontSize: '24px', marginBottom: '8px'
      }}>{icon}</span>
      <div style={{ fontSize: '0.65rem', fontWeight: '700', marginBottom: '3px', opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{value}</div>
    </div>
  );
}

export default App;
