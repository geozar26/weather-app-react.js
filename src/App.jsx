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

  const filteredHistory = history.filter(item => 
    item.toLowerCase().startsWith(city.toLowerCase())
  );

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
      setHistory(prev => [data.name, ...prev.filter(c => c.toLowerCase() !== data.name.toLowerCase())].slice(0, 10));
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
      alignItems: 'center', justifyContent: 'center', color: 'white', // Κεντράρισμα κατακόρυφα
      padding: '20px 15px', 
      boxSizing: 'border-box',
      background: getBackground(), transition: 'background 1s ease', overflowX: 'hidden'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 22px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .search-wrapper {
            background: white; border-radius: 50px; padding: 4px;
            display: flex; align-items: center; width: 100%; max-width: 380px;
            margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            position: relative; z-index: 100;
          }
          .search-input {
            flex: 1; border: none; outline: none; padding: 10px 18px;
            font-size: 1rem; color: #111; background: transparent;
          }
          .search-btn {
            background: black; color: white; border: none; padding: 10px 20px;
            border-radius: 50px; font-weight: 800; cursor: pointer;
            font-size: 0.7rem; white-space: nowrap; flex-shrink: 0;
            transition: transform 0.2s ease;
          }
          .search-btn:hover { transform: scale(1.08); }
          .search-btn:active { transform: scale(0.95); }

          .history-dropdown {
            position: absolute; top: calc(100% + 8px); left: 0; right: 0;
            background: white; border-radius: 20px; overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3); z-index: 99;
          }
          .history-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 12px 20px; color: #333; cursor: pointer; border-bottom: 1px solid #f0f0f0;
            font-weight: 600;
          }
          .history-item:hover { background: #f8f8f8; }
          
          .close-icon-history { 
            color: #888; cursor: pointer; padding: 5px 10px; font-size: 1.1rem;
            transition: transform 0.2s ease, color 0.2s ease;
          }
          .close-icon-history:hover { transform: scale(1.3); color: #333; }

          .close-icon-input {
            color: #888; cursor: pointer; padding: 0 10px; font-size: 1.1rem;
            transition: transform 0.2s ease;
          }
          .close-icon-input:hover { transform: scale(1.2); }

          .intense-text { text-shadow: 0 3px 12px rgba(0,0,0,0.4); }
        `}
      </style>

      {weather && (
        <div className="intense-text" style={{ 
          textAlign: 'center', width: '100%', maxWidth: '450px', 
          display: 'flex', flexDirection: 'column', gap: '22px' 
        }}>
          
          {/* Main Weather */}
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', opacity: 0.9 }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{ fontSize: '5rem', fontWeight: '900', lineHeight: 1 }}>{Math.round(weather.main.temp)}°</div>
              <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>{weather.name}</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img style={{ width: '80px' }} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              <div style={{ fontSize: '1.3rem', fontWeight: '700', textTransform: 'capitalize' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          {/* Search Section */}
          <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
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
              {city && <span className="close-icon-input" onClick={() => setCity("")}>✕</span>}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>

              {showHistory && filteredHistory.length > 0 && (
                <div className="history-dropdown">
                  {filteredHistory.map((item, index) => (
                    <div key={index} className="history-item" onClick={() => getWeather(item)}>
                      <span>{item}</span>
                      <span className="close-icon-history" onClick={(e) => removeHistoryItem(e, item)}>✕</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && <div style={{ color: '#FFD700', fontWeight: '700', marginTop: '5px' }}>{error}</div>}
          </div>

          {/* 5-Day Forecast */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '12px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: '800' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img style={{ width: '35px' }} src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '900', fontSize: '1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* Details Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '8px', 
            marginTop: '-5px' 
          }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" value={`${Math.round(weather.main.feels_like)}°`} color="#E57373" />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" value={`${weather.main.humidity}%`} color="#64B5F6" />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" value={`${Math.round(weather.wind.speed)}m/s`} color="#81C784" />
            <DetailTile label="ΑΝΑΤΟΛΗ" icon="wb_sunny" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#FFD54F" />
            <DetailTile label="ΔΥΣΗ" icon="wb_twilight" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#F06292" />
            <DetailTile label="ΠΙΕΣΗ" icon="speed" value={weather.main.pressure} color="#AED581" />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, value, color }) {
  return (
    <div className="glass-tile" style={{ padding: '15px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="material-icons-round" style={{ color: color, fontSize: '24px', marginBottom: '4px' }}>{icon}</span>
      <div style={{ fontSize: '0.55rem', fontWeight: '800', marginBottom: '2px', opacity: 0.85 }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: '800' }}>{value}</div>
    </div>
  );
}

export default App;
