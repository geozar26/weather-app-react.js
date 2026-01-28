
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
      setCity(""); setShowDropdown(false);
      
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
      background: 'linear-gradient(to bottom, #2c3e50, #4ca1af)', 
      overflow: 'hidden', position: 'fixed', justifyContent: 'center'
    }}>
      
      <style>
        {`
          * { -ms-overflow-style: none; scrollbar-width: none; }
          *::-webkit-scrollbar { display: none; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .dropdown-tile {
            background: rgba(255, 255, 255, 0.95);
            color: #333; 
            padding: 8px 15px;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer; 
            font-weight: 600;
            width: 100%; 
            box-sizing: border-box;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            font-size: 0.95rem;
            transition: background 0.2s;
          }
          .dropdown-tile:hover {
            background: #f0f0f0;
          }
          .delete-btn {
            color: #999;
            padding: 4px 8px;
            border-radius: 50%;
            font-size: 0.8rem;
            transition: color 0.2s;
          }
          .delete-btn:hover {
            color: #ff5252;
            background: rgba(0,0,0,0.05);
          }
          .mi-icon { font-family: 'Material Icons Round'; font-size: 24px; }
        `}
      </style>

      {weather && (
        <div style={{ 
          textAlign: 'center', width: '100%', maxWidth: '460px', 
          display: 'flex', flexDirection: 'column', gap: '8px' 
        }}>
          
          {/* 1. ΠΛΗΡΟΦΟΡΙΕΣ ΚΑΙΡΟΥ */}
          <div style={{ marginBottom: '10px' }}>
            {/* Ημερομηνία */}
            <div style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.9, marginBottom: '5px' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            {/* Θερμοκρασία και Πόλη - ΜΕΤΑΚΙΝΗΘΗΚΕ ΛΙΓΟ ΠΙΟ ΚΑΤΩ (marginTop: 15px) */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '20px',
              marginTop: '15px'  // <-- Η ΑΛΛΑΓΗ ΓΙΑ ΝΑ ΠΑΕΙ ΠΙΟ ΚΑΤΩ
            }}>
              <div style={{ fontSize: '4rem', fontWeight: '200', lineHeight: '1' }}>
                {Math.round(weather.main.temp)}°
              </div>
              <h1 style={{ fontSize: '2.2rem', margin: '0', fontWeight: '700', lineHeight: '1' }}>
                {weather.name}
              </h1>
            </div>
            
            {/* Εικονίδιο */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '5px' }}>
               <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" width="50" />
               <div style={{ fontSize: '1.1rem', fontWeight: '400', opacity: 0.9 }}>{weather.weather[0].description}</div>
            </div>
          </div>

          {/* 2. SEARCH BAR & HISTORY */}
          <div style={{ position: 'relative', width: '100%', marginBottom: '8px' }}>
            <div style={{ background: 'white', borderRadius: '50px', padding: '4px', display: 'flex', alignItems: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
              <input 
                style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 20px', fontSize: '1rem', color: '#333', background: 'transparent' }} 
                type="text" placeholder="Αναζήτηση..." value={city} 
                onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}} 
                onKeyDown={(e) => e.key === "Enter" && getWeather()} 
              />
              {city && (
                <button 
                  onClick={() => {setCity(""); setShowDropdown(false);}} 
                  style={{ background: 'none', border: 'none', color: '#ccc', fontSize: '1.3rem', cursor: 'pointer', padding: '0 12px' }}
                >✕</button>
              )}
              <button 
                style={{ background: 'black', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', fontSize: '0.8rem' }} 
                onClick={() => getWeather()}
              >ΑΝΑΖΗΤΗΣΗ</button>
            </div>

            {/* DROPDOWN MENU */}
            {showDropdown && filteredHistory.length > 0 && (
              <div style={{ 
                position: 'absolute', top: '115%', left: '0', right: '0', 
                zIndex: 100, display: 'flex', flexDirection: 'column', gap: '6px' 
              }}>
                {filteredHistory.map((h, i) => (
                  <div key={i} className="dropdown-tile" onClick={() => getWeather(h)}>
                    <span>{h}</span>
                    <span 
                      className="delete-btn"
                      onClick={(e) => deleteHistoryItem(e, h)}
                    >✕</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. FORECAST TILES */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ minWidth: '65px', padding: '10px' }}>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'})}</div>
                <img src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" width="30" />
                <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* 4. DETAIL TILES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" color="#ff5252" value={`${Math.round(weather.main.feels_like)}°`} />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" color="#40c4ff" value={`${weather.main.humidity}%`} />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" color="#b0bec5" value={`${weather.wind.speed}m/s`} />
            <DetailTile label="ΑΝΑΤΟΛΗ" icon="wb_sunny" color="#ffd740" value={formatTime(weather.sys.sunrise)} />
            <DetailTile label="ΔΥΣΗ" icon="wb_twilight" color="#ffab40" value={formatTime(weather.sys.sunset)} />
            <DetailTile label="ΠΙΕΣΗ" icon="speed" color="#69f0ae" value={weather.main.pressure} />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, color, value }) {
  return (
    <div className="glass-tile" style={{ padding: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
        <span className="mi-icon" style={{ color: color }}>{icon}</span>
        <div style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '0.5px', opacity: 0.8 }}>{label}</div>
        <div style={{ fontSize: '1.05rem', fontWeight: '800' }}>{value}</div>
      </div>
    </div>
  );
}

export default App;
