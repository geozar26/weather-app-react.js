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

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: 'white', 
      padding: '20px 12px', 
      boxSizing: 'border-box',
      background: getBackground(), 
      transition: '1s ease', 
      overflowX: 'hidden'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
          .glass-tile {
            background: rgba(255, 255, 255, 0.22);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
          .search-wrapper {
            background: white; border-radius: 50px; padding: 4px;
            display: flex; align-items: center; width: 100%; max-width: 380px;
            margin: 0 auto; box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
          .search-input {
            flex: 1; border: none; outline: none; padding: 10px 15px;
            font-size: 0.95rem; color: #111; background: transparent; min-width: 0;
          }
          .search-btn {
            background: black; color: white; border: none; padding: 8px 18px;
            border-radius: 50px; font-weight: 800; cursor: pointer;
            font-size: 0.75rem; white-space: nowrap; flex-shrink: 0;
          }
          .mi-icon { font-family: 'Material Icons Round'; font-size: 22px; margin-bottom: 2px; color: rgba(255,255,255,0.9); }
          .weather-icon-main { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)); width: 85px; }
          .weather-icon-small { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4)); width: 38px; }

          @media (max-width: 399px) {
            .main-temp { font-size: 4rem !important; }
            .city-name { font-size: 2.2rem !important; }
          }
          
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.25); border-radius: 10px; }
        `}
      </style>

      {weather && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', opacity: 0.85 }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
              <div className="main-temp" style={{ fontSize: '5rem', fontWeight: '900', lineHeight: 1 }}>{Math.round(weather.main.temp)}°</div>
              <h1 className="city-name" style={{ fontSize: '2.8rem', margin: 0, fontWeight: '900', lineHeight: 1 }}>{weather.name}</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-5px' }}>
              <img className="weather-icon-main" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              <div style={{ fontSize: '1.3rem', fontWeight: '700', textTransform: 'capitalize' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', zIndex: 100 }}>
            <div className="search-wrapper">
              <input className="search-input" type="text" placeholder="Αναζήτηση πόλης..." value={city} 
                onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}} 
                onKeyDown={(e) => e.key === "Enter" && getWeather()} />
              {/* ΤΟ ΚΟΥΜΠΙ Χ ΠΟΥ ΕΠΑΝΗΛΘΕ */}
              {city && (
                <span 
                  style={{ color: '#888', cursor: 'pointer', padding: '0 10px', fontSize: '1.2rem', fontWeight: 'bold' }} 
                  onClick={() => setCity("")}
                >
                  ✕
                </span>
              )}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '10px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '900', opacity: 0.9 }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img className="weather-icon-small" src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" icon="thermostat" value={`${Math.round(weather.main.feels_like)}°`} />
            <DetailTile label="ΥΓΡΑΣΙΑ" icon="water_drop" value={`${weather.main.humidity}%`} />
            <DetailTile label="ΑΝΕΜΟΣ" icon="air" value={`${Math.round(weather.wind.speed)}m/s`} />
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
    <div className="glass-tile" style={{ padding: '12px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span className="mi-icon">{icon}</span>
      <div style={{ fontSize: '0.65rem', fontWeight: '900', marginBottom: '2px', opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

export default App;
