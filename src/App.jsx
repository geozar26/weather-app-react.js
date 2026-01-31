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
        setError("Η περιοχή δεν βρέθηκε.");
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
      padding: '40px 10px 100px 10px', 
      boxSizing: 'border-box',
      background: getBackground(), transition: 'background 1s ease', overflowX: 'hidden'
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
          .search-wrapper {
            background: white; border-radius: 50px; padding: 4px;
            display: flex; align-items: center; width: 100%; max-width: 380px;
            margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            overflow: hidden;
          }
          .search-input {
            flex: 1; border: none; outline: none; padding: 10px 12px;
            font-size: 0.9rem; color: #111; background: transparent;
            min-width: 0; /* Σημαντικό για να μη σπάει το flex */
          }
          .search-btn {
            background: black; color: white; border: none; padding: 10px 15px;
            border-radius: 50px; font-weight: 800; cursor: pointer;
            font-size: 0.7rem; white-space: nowrap; /* Εμποδίζει το σπάσιμο κειμένου */
            flex-shrink: 0; /* Εμποδίζει το κούμπι να μικρύνει */
          }
          .intense-text { text-shadow: 0 3px 12px rgba(0,0,0,0.45); }
          .mi-icon-premium { 
            font-family: 'Material Icons Round'; 
            font-size: 26px; 
          }
          .weather-icon-main { filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2)); width: 80px; }
          
          @media (max-width: 360px) {
            .main-temp { font-size: 4.5rem !important; }
            .city-name { font-size: 2.5rem !important; }
            .search-btn { padding: 10px 12px; font-size: 0.65rem; }
          }
        `}
      </style>

      {weather && (
        <div className="intense-text" style={{ 
          textAlign: 'center', width: '100%', maxWidth: '450px', 
          display: 'flex', flexDirection: 'column', gap: '25px'
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', opacity: 0.9 }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div className="main-temp" style={{ fontSize: '5.5rem', fontWeight: '900', lineHeight: 1 }}>
                {Math.round(weather.main.temp)}°
              </div>
              <h1 className="city-name" style={{ fontSize: '3rem', fontWeight: '900', margin: 0, lineHeight: 1 }}>
                {weather.name}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-5px' }}>
              <img className="weather-icon-main" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
              <div style={{ fontSize: '1.3rem', fontWeight: '800', textTransform: 'capitalize', marginLeft: '-5px' }}>
                {weather.weather[0].description}
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <div className="search-wrapper">
              <input 
                className="search-input" 
                type="text" 
                placeholder="Πόλη..." 
                value={city} 
                onChange={(e) => { setCity(e.target.value); setError(""); }} 
                onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }} 
              />
              {city && (
                <span 
                  style={{ color: '#888', cursor: 'pointer', padding: '0 8px', fontSize: '1.1rem' }} 
                  onClick={() => setCity("")}
                >✕</span>
              )}
              <button className="search-btn" onClick={() => getWeather()}>ΑΝΑΖΗΤΗΣΗ</button>
            </div>
            {error && <div style={{ color: '#FFC107', fontWeight: '700', marginTop: '8px', fontSize: '0.85rem' }}>{error}</div>}
          </div>

          <div style={{ display: 'flex', gap: '5px' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '10px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: '900' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img style={{ width: '35px' }} src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" />
                <div style={{ fontWeight: '900', fontSize: '1rem' }}>{Math.round(f.main.temp)}°</div>
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
    <div className="glass-tile" style={{ padding: '12px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '25px', height: '25px', background: color, filter: 'blur(15px)', opacity: 0.15 }}></div>
      <span className="mi-icon-premium" style={{ color: color, textShadow: `0 0 8px ${color}66`, marginBottom: '4px' }}>{icon}</span>
      <div style={{ fontSize: '0.6rem', fontWeight: '900', marginBottom: '2px', opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

export default App;
