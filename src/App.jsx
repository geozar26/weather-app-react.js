import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : ["Πάτρα"];
  });

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    return new Date(timestamp * 1000).toLocaleTimeString('el-GR', {
      hour: '2-digit', minute: '2-digit'
    });
  };

  useEffect(() => {
    if (weather) {
      const id = weather.weather[0].id;
      const isNight = weather.weather[0].icon.includes('n');
      let bgColor = isNight 
        ? "linear-gradient(to bottom, #0f172a, #1e293b)" 
        : (id === 800 ? "linear-gradient(to bottom, #4facfe, #00f2fe)" : "linear-gradient(to bottom, #2c3e50, #4ca1af)");
      document.body.style.background = bgColor;
    }
  }, [weather]);

  useEffect(() => {
    getWeather(history[0] || "Πάτρα");
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  }, []);

  const getWeather = async (cityName = city) => {
    if (!cityName) return;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      if (!response.ok) { setError("Η πόλη δεν βρέθηκε!"); return; }
      const fResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      const data = await response.json();
      const fData = await fResponse.json();

      setWeather(data);
      setForecast(fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5));
      setError(""); setCity(""); setShowDropdown(false);
      
      setHistory(prev => {
        const newHistory = [data.name, ...prev.filter(c => c !== data.name)].slice(0, 5);
        localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (err) { setError("Σφάλμα σύνδεσης."); }
  };

  const removeCity = (cityToRemove) => {
    const newHistory = history.filter(c => c !== cityToRemove);
    setHistory(newHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
  };

  const filteredHistory = history.filter(h => 
    h.toLowerCase().startsWith(city.toLowerCase()) && city.length > 0
  );

  return (
    <div style={{
      height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', color: 'white', padding: '10px', boxSizing: 'border-box'
    }}>
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(15px);
            border-radius: 22px;
            padding: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .history-chip {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            transition: 0.2s;
            cursor: pointer;
          }
          .history-chip:hover { background: rgba(255, 255, 255, 0.3); }
          .x-btn {
            background: none;
            border: none;
            color: rgba(255,255,255,0.7);
            margin-left: 8px;
            cursor: pointer;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            padding: 0;
          }
          .x-btn:hover { color: white; }
          .dropdown-item {
            padding: 12px 20px;
            cursor: pointer;
            transition: 0.2s;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .dropdown-item:hover { background: rgba(255,255,255,0.2); }
        `}
      </style>

      {weather && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* ΚΕΝΤΡΙΚΟ */}
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: '0', fontWeight: 'bold' }}>{weather.name}</h1>
            <div style={{ fontSize: '6.5rem', fontWeight: '200', margin: '-10px 0' }}>{Math.round(weather.main.temp)}°</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" style={{ width: '50px' }} />
              <div style={{ fontSize: '1.4rem', textTransform: 'capitalize' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          {/* SEARCH & HISTORY CHIPS */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <input
                style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 20px', borderRadius: '50px', fontSize: '1rem', color: '#333' }}
                type="text" placeholder="Αναζήτηση..."
                value={city} 
                onChange={(e) => { setCity(e.target.value); setShowDropdown(true); }}
                onKeyDown={(e) => e.key === "Enter" && getWeather()}
              />
              {city && (
                <button onClick={() => { setCity(""); setShowDropdown(false); }} style={{ background: 'none', border: 'none', color: '#999', fontSize: '1.4rem', cursor: 'pointer', padding: '0 10px' }}>✕</button>
              )}
              <button style={{ background: 'black', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>
            </div>

            {/* ΙΣΤΟΡΙΚΟ (ΜΑΖΕΜΕΝΑ CHIPS - ΚΕΙΜΕΝΟ ΑΡΙΣΤΕΡΑ) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
              {history.map((h, i) => (
                <div key={i} className="history-chip" onClick={() => getWeather(h)}>
                  <span style={{ flex: 1, textAlign: 'left' }}>{h}</span>
                  <button className="x-btn" onClick={(e) => { e.stopPropagation(); removeCity(h); }}>✕</button>
                </div>
              ))}
            </div>

            {/* DROPDOWN */}
            {showDropdown && filteredHistory.length > 0 && (
              <div style={{ position: 'absolute', top: '115%', left: '10px', right: '10px', background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(20px)', borderRadius: '20px', overflow: 'hidden', zIndex: 100, border: '1px solid rgba(255,255,255,0.2)' }}>
                {filteredHistory.map((h, i) => (
                  <div key={i} className="dropdown-item" onClick={() => getWeather(h)}>📍 {h}</div>
                ))}
              </div>
            )}
          </div>

          {/* ΠΡΟΓΝΩΣΗ */}
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '10px', justifyContent: 'center', overflowX: 'auto' }}>
            {forecast.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '20px', minWidth: '70px' }}>
                <div style={{ fontSize: '0.75rem', marginBottom: '5px' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'})}</div>
                <img src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" width="35" />
                <div style={{ fontWeight: 'bold' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* DETAIL TILES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <DetailTile label="Αίσθηση" icon="🌡️" value={`${Math.round(weather.main.feels_like)}°`} />
            <DetailTile label="Υγρασία" icon="💧" value={`${weather.main.humidity}%`} />
            <DetailTile label="Άνεμος" icon="💨" value={`${weather.wind.speed} m/s`} />
            <DetailTile label="Ανατόλη" icon="🌅" value={formatTime(weather.sys.sunrise)} />
            <DetailTile label="Δύση" icon="🌇" value={formatTime(weather.sys.sunset)} />
            <DetailTile label="Πίεση" icon="⏲️" value={weather.main.pressure} />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, value }) {
  return (
    <div className="glass-tile">
      <div style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{value}</div>
    </div>
  );
}

export default App;
