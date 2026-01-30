
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

  // Συνάρτηση για δυναμικό Background
  const getBackground = () => {
    if (!weather) return 'linear-gradient(135deg, #1e3799 0%, #0984e3 100%)';
    const condition = weather.weather[0].main;

    switch (condition) {
      case 'Clear':
        return 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)'; // Ηλιοφάνεια
      case 'Clouds':
        return 'linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)'; // Συννεφιά
      case 'Rain':
      case 'Drizzle':
        return 'linear-gradient(135deg, #203a43 0%, #2c5364 100%)'; // Βροχή
      case 'Thunderstorm':
        return 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)'; // Καταιγίδα
      case 'Snow':
        return 'linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)'; // Χιόνι
      default:
        return 'linear-gradient(135deg, #1e3799 0%, #0984e3 100%)'; // Προεπιλογή
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
      alignItems: 'center', color: '#ffffff', padding: '15px', boxSizing: 'border-box',
      background: getBackground(), // Δυναμικό background
      transition: 'background 0.8s ease-in-out', // Ομαλή αλλαγή χρώματος
      overflow: 'hidden', position: 'fixed', justifyContent: 'center',
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      
      <style>
        {`
          * { -ms-overflow-style: none; scrollbar-width: none; box-sizing: border-box; }
          *::-webkit-scrollbar { display: none; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.25);
          }
          .dropdown-tile {
            background: white;
            color: #2d3436; 
            padding: 12px 18px;
            border-radius: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer; 
            font-weight: 600;
            margin-bottom: 6px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          .mi-icon { font-family: 'Material Icons Round'; }
          
          @media (max-width: 391px) {
            .main-temp { font-size: 4rem !important; }
            .city-name { font-size: 2.2rem !important; }
          }
        `}
      </style>

      {weather && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
              <div className="main-temp" style={{ fontSize: '5.5rem', fontWeight: '200' }}>
                {Math.round(weather.main.temp)}°
              </div>
              <h1 className="city-name" style={{ fontSize: '3rem', margin: '0', fontWeight: '800', letterSpacing: '-1.5px' }}>
                {weather.name}
              </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" width="70" />
                <div style={{ fontSize: '1.4rem', fontWeight: '500' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ background: '#fff', borderRadius: '100px', padding: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}>
              <input 
                style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 20px', fontSize: '1.1rem', color: '#111', background: 'transparent' }} 
                type="text" placeholder="Πόλη..." value={city} 
                onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}} 
                onKeyDown={(e) => e.key === "Enter" && getWeather()} 
              />
              <button 
                style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: '100px', fontWeight: '900', cursor: 'pointer', fontSize: '0.8rem' }} 
                onClick={() => getWeather()}
              >ΑΝΑΖΗΤΗΣΗ</button>
            </div>

            {showDropdown && filteredHistory.length > 0 && (
              <div style={{ position: 'absolute', top: '120%', left: '0', right: '0', zIndex: 100 }}>
                {filteredHistory.map((h, i) => (
                  <div key={i} className="dropdown-tile" onClick={() => getWeather(h)}>
                    <span>{h}</span>
                    <span onClick={(e) => deleteHistoryItem(e, h)} style={{ color: '#ff7675' }}>✕</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '15px 5px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '900', marginBottom: '5px' }}>
                  {new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}
                </div>
                <img src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" width="35" />
                <div style={{ fontWeight: '800', fontSize: '1.2rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
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
    <div className="glass-tile" style={{ padding: '18px 5px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span className="mi-icon" style={{ fontSize: '24px' }}>{icon}</span>
        <div style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', opacity: 0.9 }}>{label}</div>
        <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{value}</div>
      </div>
    </div>
  );
}

export default App;
