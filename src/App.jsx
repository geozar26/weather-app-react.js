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

  // ΑΥΤΟ ΑΛΛΑΖΕΙ ΤΟ BACKGROUND ΑΝΑΛΟΓΑ ΜΕ ΤΟΝ ΚΑΙΡΟ
  useEffect(() => {
    if (weather) {
      const id = weather.weather[0].id;
      const icon = weather.weather[0].icon;
      const isNight = icon.includes('n');
      let bgColor = "";

      if (isNight) {
        bgColor = "linear-gradient(to bottom, #020c1b, #0f172a, #1e293b)"; // Νύχτα
      } else {
        if (id === 800) bgColor = "linear-gradient(to bottom, #4facfe, #00f2fe)"; // Ήλιος
        else if (id <= 804) bgColor = "linear-gradient(to bottom, #2c3e50, #4ca1af)"; // Σύννεφα (όπως στην Πάτρα)
        else if (id >= 500 && id <= 531) bgColor = "linear-gradient(to bottom, #203a43, #2c5364)"; // Βροχή
        else bgColor = "linear-gradient(to bottom, #4facfe, #00f2fe)";
      }
      
      document.body.style.background = bgColor;
      document.body.style.transition = "background 0.8s ease";
    }
  }, [weather]);

  useEffect(() => {
    getWeather(history[0] || "Πάτρα");
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
  }, []);

  const getWeather = async (cityName = city) => {
    if (!cityName) return;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      
      if (!response.ok) {
        setError("Η πόλη δεν βρέθηκε!"); 
        return; 
      }

      const fResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      const data = await response.json();
      const fData = await fResponse.json();
      
      setWeather(data);
      setForecast(fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5));
      setError(""); 
      setCity("");
    } catch (err) {
      setError("Σφάλμα σύνδεσης.");
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      
      {weather && (
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '700', margin: '0', textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>{weather.name}</h1>
          <div style={{ fontSize: '8rem', fontWeight: '200', margin: '-15px 0' }}>{Math.round(weather.main.temp)}°</div>
          
          {/* ΤΟ ΕΙΚΟΝΙΔΙΟ ΣΟΥ ΑΡΙΣΤΕΡΑ ΑΠΟ ΤΟ TEXT */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt="icon" 
              style={{ width: '60px', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
            />
            <div style={{ fontSize: '2rem', textTransform: 'capitalize' }}>
              {weather.weather[0].description}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', width: '90vw', maxWidth: '420px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <input 
              style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 25px', borderRadius: '50px', fontSize: '1.1rem', color: '#333' }}
              type="text" placeholder="Ποια πόλη θες;" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
            />
            <button 
              style={{ background: 'black', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => getWeather()}>Ψάξε</button>
          </div>

          {error && <div style={{ color: '#ffcccc', marginTop: '15px', fontWeight: 'bold' }}>{error}</div>}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '30px' }}>
            {forecast.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.18)', padding: '15px', borderRadius: '22px', minWidth: '75px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'})}</div>
                <img src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} alt="icon" width="40" />
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '25px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
            <div style={{textAlign:'center'}}><small style={{opacity:0.7, fontSize:'0.75rem'}}>ΑΙΣΘΗΣΗ</small><div style={{fontSize:'1.3rem'}}>{Math.round(weather.main.feels_like)}°</div></div>
            <div style={{textAlign:'center'}}><small style={{opacity:0.7, fontSize:'0.75rem'}}>ΥΓΡΑΣΙΑ</small><div style={{fontSize:'1.3rem'}}>{weather.main.humidity}%</div></div>
            <div style={{textAlign:'center'}}><small style={{opacity:0.7, fontSize:'0.75rem'}}>ΑΝΕΜΟΣ</small><div style={{fontSize:'1.3rem'}}>{weather.wind.speed}m/s</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
