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
    getWeather(history[0] || "Πάτρα");
  }, []);

  return (
    <div style={{ 
      height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', color: 'white', padding: '10px', boxSizing: 'border-box',
      background: getBackground(), transition: '1s ease', justifyContent: 'center'
    }}>
      
      <style>
        {`
          * { box-sizing: border-box; font-family: sans-serif; }
          
          /* ΚΑΡΤΕΣ ΜΕ ΕΝΙΑΙΟ ΧΡΩΜΑ */
          .glass-tile {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-shadow: 0 1px 4px rgba(0,0,0,0.2);
          }

          .weather-icon {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
          }

          @media (max-width: 391px) {
            .main-temp { font-size: 3.5rem !important; }
            .city-name { font-size: 2rem !important; }
          }
        `}
      </style>

      {weather && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Main Weather Info */}
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>
              {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
              <div className="main-temp" style={{ fontSize: '4.5rem', fontWeight: '900' }}>{Math.round(weather.main.temp)}°</div>
              <h1 className="city-name" style={{ fontSize: '2.5rem', margin: 0, fontWeight: '900' }}>{weather.name}</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <img className="weather-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" width="80" />
                <div style={{ fontSize: '1.3rem', fontWeight: '700' }}>{weather.weather[0].description}</div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center' }}>
              <input 
                style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 20px', fontSize: '1rem', color: '#111', background: 'transparent' }} 
                type="text" placeholder="Αναζήτηση..." value={city} 
                onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}} 
                onKeyDown={(e) => e.key === "Enter" && getWeather()} 
              />
              <button 
                style={{ background: 'black', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: '900', cursor: 'pointer' }} 
                onClick={() => getWeather()}
              >ΑΝΑΖΗΤΗΣΗ</button>
            </div>
          </div>

          {/* Forecast Cards */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
            {forecast.map((f, i) => (
              <div key={i} className="glass-tile" style={{ flex: 1, padding: '10px 5px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '900' }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'}).toUpperCase()}</div>
                <img className="weather-icon" src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" width="35" />
                <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          {/* Detail Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
            <DetailTile label="ΑΙΣΘΗΣΗ" value={`${Math.round(weather.main.feels_like)}°`} />
            <DetailTile label="ΥΓΡΑΣΙΑ" value={`${weather.main.humidity}%`} />
            <DetailTile label="ΑΝΕΜΟΣ" value={`${weather.wind.speed}m/s`} />
            <DetailTile label="ΑΝΑΤΟΛΗ" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} />
            <DetailTile label="ΔΥΣΗ" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString('el-GR', {hour:'2-digit', minute:'2-digit'})} />
            <DetailTile label="ΠΙΕΣΗ" value={weather.main.pressure} />
          </div>

        </div>
      )}
    </div>
  );
}

function DetailTile({ label, value }) {
  return (
    <div className="glass-tile" style={{ padding: '15px 5px' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: '900', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>{value}</div>
    </div>
  );
}

export default App;
