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
      alignItems: 'center', justifyContent: 'center', color: 'white', 
      padding: '40px 10px 100px 10px', boxSizing: 'border-box',
      background: getBackground(), transition: 'background 1s ease', overflowX: 'hidden'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .glass-tile:hover { transform: translateY(-5px); background: rgba(255, 255, 255, 0.3); }
          .search-wrapper {
            background: white; border-radius: 100px; padding: 4px;
            display: flex; align-items: center; width: 100%; max-width: 380px;
            margin: 0 auto; box-shadow: 0 15px 35px rgba(0,0,0,0.25);
            position: relative; z-index: 100;
          }
          .search-input {
            flex: 1; border: none; outline: none; padding: 12px 18px;
            font-size: 1rem; color: #111; background: transparent;
          }
          .search-btn {
            background: #000; color: #fff; border: none; padding: 10px 22px;
            border-radius: 100px; font-weight: 800; cursor: pointer;
            font-size: 0.75rem; transition: 0.3s;
          }
          .history-dropdown {
            position: absolute; top: calc(100% + 12px); left: 0; right: 0;
            background: rgba(255, 255, 255, 0.98); border-radius: 24px; overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 99;
            backdrop-filter: blur(10px);
          }
          .history-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 14px 22px; color: #222; cursor: pointer; transition: 0.2s;
            border-bottom: 1px solid #eee; font-weight: 700;
          }
          .history-item:hover { background: #f0f0f0; }
          .delete-btn { color: #bbb; padding: 5px; font-size: 1.1rem; }
          .delete-btn:hover { color: #ff3b30; }

          /* Premium Icon Effects */
          .icon-glow {
            animation: pulse 3s infinite ease-in-out;
            filter: drop-shadow(0 0 8px currentColor);
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.9; filter: drop-shadow(0 0 5px currentColor); }
            50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 12px currentColor); }
            100% { transform: scale(1); opacity: 0.9; filter: drop-shadow(0 0 5px currentColor); }
          }
          
          .intense-text { text-shadow: 0 4px 15px rgba(0,0,0,0.4); }
        `}
      </style>

      {weather && (
        <div className="intense-text" style={{ textAlign: 'center', width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Header Section */}
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '5px' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{ fontSize: '6rem', fontWeight: '900', lineHeight: 1 }}>{Math.round(weather.main.temp)}°</div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: 0, lineHeight: 1 }}>{weather.name}</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}>
              <img style={{ width: '90px' }} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              <div style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'capitalize' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          {/* Search Area */}
          <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
            <div className="search-wrapper">
              <input 
                className="search-input" 
                type="text" 
                placeholder="Αναζήτηση πόλης..." 
                value={city} 
                onFocus={() => setShowHistory(true)}
                onChange={(e) => { setCity(e.target.value); setError(""); setShowHistory(true); }} 
                onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }} 
              />
              {city && <span style={{ color: '#999', cursor: 'pointer', padding: '0 10px', fontWeight: 'bold' }} onClick={() => setCity("")}>✕</span>}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>

              {showHistory && history.length > 0 && (
                <div className="history-dropdown">
                  {history.map((item, index) => (
                    <div key={index} className="history-item" onClick={() => getWeather(item)}>
                      <span>{item}</span>
                      <span className="delete-btn" onClick={(e) => removeHistoryItem(e, item)}>✕</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && <div style={{ color: '#FFD700', fontWeight: '800', marginTop: '12px', fontSize: '0.9rem' }}>{error}</div>}
          </div>

          {/* 5-Day Forecast */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '15px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '900', opacity: 0.8 }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img style={{ width: '42px' }} src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* Premium Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" value={`${Math.round(weather.main.feels_like)}°`} color="#FF5252" />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" value={`${weather.main.humidity}%`} color="#40C4FF" />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" value={`${Math.round(weather.wind.speed)}m/s`} color="#69F0AE" />
            <DetailTile label="ΑΝΑΤΟΛΗ" icon="wb_sunny" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#FFD740" />
            <DetailTile label="ΔΥΣΗ" icon="wb_twilight" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#FF4081" />
            <DetailTile label="ΠΙΕΣΗ" icon="speed" value={weather.main.pressure} color="#B2FF59" />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, value, color }) {
  return (
    <div className="glass-tile" style={{ padding: '18px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background radial glow */}
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100%', height: '100%', background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        pointerEvents: 'none'
      }}></div>
      
      <span className="material-icons-round icon-glow" style={{ 
        color: color, fontSize: '28px', marginBottom: '6px'
      }}>{icon}</span>
      
      <div style={{ fontSize: '0.6rem', fontWeight: '900', marginBottom: '2px', opacity: 0.8, letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

export default App;
