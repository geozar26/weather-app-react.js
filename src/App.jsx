import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : ["Πάτρα"];
  });

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  const getBackground = () => {
    if (!weather) return 'linear-gradient(135deg, #1e3c72, #2a5298)';
    const condition = weather.weather[0].main;
    switch (condition) {
      case 'Clear': return 'linear-gradient(135deg, #FF8C00, #F39C12)';
      case 'Clouds': return 'linear-gradient(135deg, #4b6cb7, #182848)';
      case 'Rain': case 'Drizzle': return 'linear-gradient(135deg, #00416A, #E4E5E6)';
      case 'Thunderstorm': return 'linear-gradient(135deg, #0f2027, #2c5364, #203a43)';
      case 'Snow': return 'linear-gradient(135deg, #83a4d4, #b6fbff)';
      default: return 'linear-gradient(135deg, #2c3e50, #4ca1af)';
    }
  };

  const getWeather = async (cityName = city) => {
    if (!cityName) return;
    setError("");
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      if (!response.ok) {
        setError("Η περιοχή δεν βρέθηκε. Δοκιμάστε ξανά.");
        return;
      }
      const fResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      const data = await response.json();
      const fData = await fResponse.json();

      setWeather(data);
      setForecast(fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5));
      setCity(""); 
      setHistory(prev => [data.name, ...prev.filter(c => c !== data.name)].slice(0, 10));
    } catch (err) { 
      setError("Πρόβλημα σύνδεσης.");
    }
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
      padding: '20px 12px 60px 12px', boxSizing: 'border-box',
      background: getBackground(), transition: 'all 1s ease-in-out', overflowX: 'hidden'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Inter', 'Segoe UI', sans-serif; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .glass-tile:hover {
            transform: translateY(-8px) scale(1.02);
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 15px 50px rgba(0,0,0,0.25);
          }
          .search-wrapper {
            background: rgba(255, 255, 255, 0.95); border-radius: 100px; padding: 6px;
            display: flex; align-items: center; width: 100%; max-width: 400px;
            margin: 0 auto; box-shadow: 0 12px 30px rgba(0,0,0,0.3);
          }
          .search-input {
            flex: 1; border: none; outline: none; padding: 10px 20px;
            font-size: 1rem; color: #1a1a1a; background: transparent; font-weight: 500;
          }
          .search-btn {
            background: #1a1a1a; color: white; border: none; padding: 10px 25px;
            border-radius: 100px; font-weight: 700; cursor: pointer;
            font-size: 0.8rem; letter-spacing: 0.5px; transition: 0.3s;
          }
          .search-btn:hover { background: #444; transform: scale(1.05); }
          .intense-text { text-shadow: 0 4px 15px rgba(0,0,0,0.4); }
          .mi-icon-premium { 
            font-family: 'Material Icons Round'; 
            font-size: 30px; 
            background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
          }
          .weather-icon-main { filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3)); width: 90px; }
          .error-text {
            color: #FFD700; font-weight: 700; font-size: 0.9rem; margin-top: 12px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.6); animation: slideIn 0.4s ease-out;
          }
          @keyframes slideIn { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>

      {weather && (
        <div className="intense-text" style={{ 
          textAlign: 'center', width: '100%', maxWidth: '480px', 
          display: 'flex', flexDirection: 'column', gap: '25px', paddingTop: '10px' 
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: '700', opacity: 0.9, letterSpacing: '0.5px', marginBottom: '8px' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <div style={{ fontSize: '6.5rem', fontWeight: '900', lineHeight: 1, letterSpacing: '-4px' }}>
                {Math.round(weather.main.temp)}°
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: 0, lineHeight: 0.9, textAlign: 'left', maxWidth: '200px' }}>
                {weather.name}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-5px' }}>
              <img className="weather-icon-main" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="icon" />
              <div style={{ fontSize: '1.6rem', fontWeight: '800', textTransform: 'capitalize', marginLeft: '-10px' }}>
                {weather.weather[0].description}
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 10 }}>
            <div className="search-wrapper">
              <input 
                className="search-input" 
                type="text" 
                placeholder="Αναζήτηση πόλης..." 
                value={city} 
                onChange={(e) => { setCity(e.target.value); setError(""); }} 
                onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }} 
              />
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>
            </div>
            {error && <div className="error-text">{error}</div>}
          </div>

          {/* Forecast Row */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '15px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.8 }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img style={{ width: '45px' }} src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* Premium Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" value={`${Math.round(weather.main.feels_like)}°`} color="#FF5252" />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" value={`${weather.main.humidity}%`} color="#40C4FF" />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" value={`${Math.round(weather.wind.speed)} m/s`} color="#69F0AE" />
            <DetailTile label="ΑΝΑΤΟΛΗ" icon="wb_sunny" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#FFD740" />
            <DetailTile label="ΔΥΣΗ" icon="wb_twilight" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} color="#FF4081" />
            <DetailTile label="ΠΙΕΣΗ" icon="speed" value={`${weather.main.pressure} hPa`} color="#B2FF59" />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, icon, value, color }) {
  return (
    <div className="glass-tile" style={{ padding: '18px 5px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Διακριτικό background glow ανάλογα με το χρώμα */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40px', height: '40px', background: color, filter: 'blur(30px)', opacity: 0.3 }}></div>
      
      <span className="mi-icon-premium" style={{ 
        marginBottom: '8px',
        // Εφαρμογή του συγκεκριμένου χρώματος στο εικονίδιο με εφέ glow
        textShadow: `0 0 15px ${color}`
      }}>{icon}</span>
      <div style={{ fontSize: '0.6rem', fontWeight: '900', marginBottom: '4px', opacity: 0.7, letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '-0.5px' }}>{value}</div>
    </div>
  );
}

export default App;

