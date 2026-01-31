import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    // Εδώ ορίσαμε την Πάτρα ως την πρώτη επιλογή αν το ιστορικό είναι κενό
    return saved ? JSON.parse(saved) : ["Πάτρα"];
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
      setError("Πρόβλημα σύνδεσης με την υπηρεσία.");
    }
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    // Φόρτωση Πάτρας κατά την εκκίνηση
    getWeather("Πάτρα");
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', color: 'white', 
      padding: '20px 12px 40px 12px', boxSizing: 'border-box',
      background: getBackground(), transition: '1s ease', overflowX: 'hidden'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.22);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          .glass-tile:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          }
          .search-wrapper {
            background: white; border-radius: 50px; padding: 4px;
            display: flex; align-items: center; width: 100%; max-width: 380px;
            margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          .search-input {
            flex: 1; border: none; outline: none; padding: 10px 15px;
            font-size: 0.95rem; color: #111; background: transparent;
          }
          .search-btn {
            background: black; color: white; border: none; padding: 8px 18px;
            border-radius: 50px; font-weight: 800; cursor: pointer;
            font-size: 0.75rem; white-space: nowrap; transition: 0.2s;
          }
          .search-btn:hover { background: #333; }
          .intense-text { text-shadow: 0 3px 12px rgba(0,0,0,0.45); }
          .mi-icon { font-family: 'Material Icons Round'; font-size: 26px; }
          .weather-icon-main { filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2)); width: 85px; }
          .weather-icon-small { filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)); width: 38px; }
          
          .error-text {
            color: #FFC107;
            font-weight: 700;
            font-size: 0.9rem;
            margin-top: 10px;
            letter-spacing: 0.3px;
            text-shadow: 0 2px 8px rgba(0,0,0,0.5);
            animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>

      {weather && (
        <div className="intense-text" style={{ 
          textAlign: 'center', width: '100%', maxWidth: '450px', 
          display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '20px' 
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', opacity: 0.9, marginBottom: '2px' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div className="main-temp" style={{ fontSize: '5.8rem', fontWeight: '900', lineHeight: 1 }}>
                {Math.round(weather.main.temp)}°
              </div>
              <h1 className="city-name" style={{ fontSize: '3.2rem', fontWeight: '900', margin: 0, lineHeight: 1 }}>
                {weather.name}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-5px' }}>
              <img className="weather-icon-main" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              <div style={{ fontSize: '1.4rem', fontWeight: '800', textTransform: 'capitalize', marginLeft: '-5px' }}>
                {weather.weather[0].description}
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="search-wrapper">
              <input 
                className="search-input" 
                type="text" 
                placeholder="Αναζήτηση πόλης..." 
                value={city} 
                onChange={(e) => { setCity(e.target.value); setError(""); }} 
                onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }} 
              />
              {city && <span style={{ color: '#888', cursor: 'pointer', padding: '0 10px' }} onClick={() => setCity("")}>✕</span>}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>
            </div>
            {error && <div className="error-text">{error}</div>}
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '10px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '900' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img className="weather-icon-small" src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
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
    <div className="glass-tile" style={{ padding: '12px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="mi-icon" style={{ color: color, textShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>{icon}</span>
      <div style={{ fontSize: '0.65rem', fontWeight: '900', marginBottom: '2px', opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

export default App;
