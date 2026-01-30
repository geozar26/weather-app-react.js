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

  // Δυναμικό Background
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
      setCity(""); setShowDropdown(false);
      setHistory(prev => [data.name, ...prev.filter(c => c !== data.name)].slice(0, 10));
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    getWeather(history[0] || "Πάτρα");
  }, []);

  const filteredHistory = history.filter(h => h.toLowerCase().startsWith(city.toLowerCase()) && city.length > 0);

  return (
    <div style={{ 
      height: '100vh', width: '100vw', display: 'flex', 
      background: getBackground(), transition: '1s ease', fontFamily: 'sans-serif'
    }}>
      
      <style>
        {`
          .nav-footer { display: flex; flex-direction: column; margin-top: -10px; padding-top: 15px; width: 250px; background: white; padding-left: 20px; }
          .social-row { display: flex; align-items: center; gap: 12px; margin-bottom: 35px; }
          .social-row a { font-size: 1.6rem; color: #333; text-decoration: none; }
          .order-btn { 
            display: inline-block; background: linear-gradient(135deg, #007bff, #0056b3); 
            color: white; padding: 12px 22px; border-radius: 50px; font-weight: 700; 
            text-decoration: none; text-align: center; width: fit-content; min-width: 180px;
            margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0,123,255,0.3);
          }
          .contact-box { display: flex; flex-direction: column; gap: 12px; }
          .contact-box p { font-size: 0.95rem; color: #333; display: flex; align-items: center; gap: 10px; margin: 0; font-weight: 500; }
          
          .dropdown-item { padding: 10px; background: white; border-bottom: 1px solid #eee; cursor: pointer; color: #333; }
          .weather-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; }
        `}
      </style>

      {/* SIDEBAR FOOTER (ΑΥΤΟ ΠΟΥ ΦΤΙΑΧΝΑΜΕ) */}
      <div className="nav-footer">
        <div className="social-row">
          <a href="#">FB</a>
          <a href="#">IG</a>
        </div>

        <a href="#" className="order-btn" onClick={() => alert('Redirect to Order...')}>
          Online Παραγγελία
        </a>

        <div className="contact-box">
          <p>📍 Ελευθερίου Βενιζέλου 45</p>
          <p>📞 1234567890</p>
        </div>
      </div>

      {/* WEATHER CONTENT (Η ΛΕΙΤΟΥΡΓΙΚΟΤΗΤΑ ΠΟΥ ΕΛΕΙΠΕ) */}
      <div className="weather-content">
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <input 
            style={{ padding: '10px 20px', borderRadius: '50px', border: 'none', width: '250px' }}
            placeholder="Αναζήτηση πόλης..."
            value={city}
            onChange={(e) => {setCity(e.target.value); setShowDropdown(true);}}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
          />
          {showDropdown && filteredHistory.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}>
              {filteredHistory.map((h, i) => (
                <div key={i} className="dropdown-item" onClick={() => getWeather(h)}>{h}</div>
              ))}
            </div>
          )}
        </div>

        {weather && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>{weather.name}</h1>
            <div style={{ fontSize: '5rem', fontWeight: 'bold' }}>{Math.round(weather.main.temp)}°C</div>
            <p style={{ fontSize: '1.5rem' }}>{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
