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
      case 'Clouds': return 'linear-gradient(to bottom, #606c88, #3f4c6b)';
      case 'Rain': case 'Drizzle': return 'linear-gradient(to bottom, #203a43, #2c5364)';
      case 'Thunderstorm': return 'linear-gradient(to bottom, #0f2027, #203a43)';
      case 'Snow': return 'linear-gradient(to bottom, #83a4d4, #b6fbff)';
      default: return 'linear-gradient(to bottom, #2c3e50, #4ca1af)';
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    return new Date(timestamp * 1000).toLocaleTimeString('el-GR', {
      hour: '2-digit', minute: '2-digit'
    });
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    getWeather(history[0] || "Πάτρα");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

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
      
      setHistory(prev => {
        const newHist = [data.name, ...prev.filter(c => c !== data.name)].slice(0, 10);
        return newHist;
      });
    } catch (err) { console.error(err); }
  };

  const deleteHistoryItem = (e, itemToDelete) => {
    e.stopPropagation(); 
    setHistory(prev => prev.filter(item => item !== itemToDelete));
  };

  const filteredHistory = history.filter(h => 
    h.toLowerCase().startsWith(city.toLowerCase()) && city.length > 0
  );

  return (
    <div style={{ 
      height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', color: 'white', padding: '10px', boxSizing: 'border-box',
      background: getBackground(), 
      transition: 'background 1s ease',
      overflow: 'hidden', position: 'fixed', justifyContent: 'center'
    }}>
      
      <style>
        {`
          * { -ms-overflow-style: none; scrollbar-width: none; box-sizing: border-box; font-family: sans-serif; }
          *::-webkit-scrollbar { display: none; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
          .dropdown-tile {
            background: rgba(255, 255, 255, 0.95);
            color: #333; 
            padding: 10px 15px;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer; 
            font-weight: 700;
            width: 100%; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            font-size: 1rem;
            margin-bottom: 4px;
          }
          .mi-icon { font-family: 'Material Icons Round'; font-size: 24px; }

          @media (max-width: 391px) {
            .search-input { padding: 10px 12px !important; font-size: 0.9rem !important; }
            .search-btn { padding: 10px 12px !important; font-size: 0.75rem !important; min-width: fit-content; }
            .main-temp { font-size: 3.5rem !important; }
            .city-name { font-size: 2rem !important; }
          }
        `}
      </style>

      {weather && (
        <div style={{ 
          textAlign: 'center', width: '100%', maxWidth: '460px', 
          display: 'flex', flexDirection: 'column', gap: '8px' 
        }}>
          
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '15px',
              marginTop: '15px'
            }}>
              <div className="main-temp" style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1' }}>
                {Math.round(weather.main.temp)}°
              </div>
              <h1 className="city-name" style={{ fontSize: '2.5rem', margin: '0', fontWeight: '900', lineHeight: '1' }}>
                {weather.name}
              </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '5px' }}>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" width="60" />
                <div style={{ fontSize: '1.3rem', fontWeight: '700' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', marginBottom: '10px' }}>
            <div style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}>
              <input 
                className="search-input"
                style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 20px', fontSize: '1.1rem', color: '#111', background: 'transparent', minWidth: '0' }} 
                type="text" placeholder="Αναζήτηση..." value={city} 
                onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}} 
                onKeyDown={(e) => e.key === "Enter" && getWeather()} 
              />
              <button 
                className="search-btn"
                style={{ background: 'black', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap' }} 
                onClick={() => getWeather()}
              >ΑΝΑΖΗΤΗΣΗ</button>
            </div>

            {showDropdown && filteredHistory.length > 0 && (
              <div style={{ position: 'absolute', top: '115%', left: '0', right: '0', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
                {filteredHistory.map((h, i) => (
                  <div key={i} className="dropdown-tile" onClick={() => { getWeather(h); setCity(""); setShowDropdown(false); }}>
                    <span>{h}</span>
                    <span onClick={(e) => deleteHistoryItem(e, h)} style={{ padding: '5px', color: '#ff5252' }}>✕</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '10px', width: '100%' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, maxWidth: '80px', padding: '10px 5px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '900' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" width="30" />
                <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" value={`${Math.round(weather.main.feels_like)}°`} />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" value={`${weather.main.humidity}%`} />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" value={`${weather.wind.speed}m/s`} />
            <DetailTile label="ΑΝΑΤΟΛΗ" icon="wb_sunny" value={formatTime(weather.sys.sunrise)} />
            <DetailTile label="ΔΥΣΗ" icon="wb_twilight" value={formatTime(weather.sys.sunset)} />
            <DetailTile label="ΠΙΕΣΗ" icon="speed" value={weather.main.pressure} />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, value }) {
  return (
    <div className="glass-tile" style={{ padding: '12px 5px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <span className="mi-icon" style={{ color: 'white', fontSize: '22px' }}>{icon}</span>
        <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '0.5px' }}>{label}</div>
        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>{value}</div>
      </div>
    </div>
  );
}

export default App;
