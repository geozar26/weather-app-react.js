
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  // 1. Ξεκινάμε το state με ό,τι υπάρχει αποθηκευμένο, αλλιώς βάζουμε την Πάτρα
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : ["Πάτρα"];
  });
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  useEffect(() => {
    getWeather(history[0] || "Πάτρα");
    
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
  }, []);

  // 2. Κάθε φορά που αλλάζει το history, το σώζουμε στο LocalStorage
  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  const getWeather = async (cityName = city) => {
    if (!cityName) return;
    setSuggestions([]);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      const fResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`);
      const data = await response.json();
      const fData = await fResponse.json();
      
      setWeather(data);
      setForecast(fData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5));
      
      // 3. Ενημέρωση ιστορικού: Βάζουμε τη νέα πόλη πρώτη και κρατάμε τις υπόλοιπες
      setHistory(prev => {
        const filtered = prev.filter(h => h.toLowerCase() !== data.name.toLowerCase());
        return [data.name, ...filtered].slice(0, 5); // Κρατάμε τις 5 τελευταίες
      });
      
      setCity("");
    } catch (err) { alert("Σφάλμα!"); }
  };

  const getBackground = () => {
    if (!weather) return "#0f172a";
    const main = weather.weather[0].main;
    switch (main) {
      case "Clear": return "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)";
      case "Clouds": return "linear-gradient(to bottom, #1e293b, #334155)";
      case "Rain": return "linear-gradient(to bottom, #203a43, #2c5364)";
      default: return "#0f172a";
    }
  };

  return (
    <div style={{
      height: '100vh', width: '100vw', background: getBackground(),
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '15px', boxSizing: 'border-box', color: 'white', position: 'fixed', top: 0, left: 0, overflow: 'hidden'
    }}>

      <style>{`
        .main-wrapper { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 650px; z-index: 2; gap: min(2.5vh, 22px); }
        .city-title { font-size: clamp(2.5rem, 7vh, 3.5rem); font-weight: 700; margin: 0; }
        .temp-display { font-size: clamp(4.5rem, 14vh, 7rem); font-weight: 300; line-height: 1; margin: 0; }
        .desc-label { font-size: 1.8rem; font-weight: 400; text-transform: capitalize; margin: 0; }
        .search-area { width: 100%; max-width: 460px; position: relative; }
        .forecast-row { display: flex; gap: 10px; width: 100%; justify-content: center; }
        @media (max-width: 500px) {
          .desc-label { font-size: 1.4rem; }
          .forecast-row { display: grid !important; grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .main-wrapper { gap: 1.5vh; }
        }
      `}</style>

      {weather && (
        <div className="main-wrapper">
          <h1 className="city-title">{weather.name}</h1>
          <div className="temp-display">{Math.round(weather.main.temp)}°</div>
          <div className="desc-label">{weather.weather[0].description}</div>

          <div className="search-area">
            <div style={{ background: 'white', borderRadius: '50px', padding: '4px', display: 'flex', alignItems: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
              <input
                type="text" placeholder="Αναζήτηση..." value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setSuggestions(e.target.value ? history.filter(h => h.toLowerCase().startsWith(e.target.value.toLowerCase())) : []);
                }}
                onKeyDown={(e) => e.key === "Enter" && getWeather()}
                style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 20px', color: '#333', borderRadius: '50px', fontSize: '16px' }}
              />
              {city && <span onClick={() => setCity("")} style={{ color: '#999', cursor: 'pointer', marginRight: '10px', fontSize: '20px', fontWeight: 'bold' }}>&times;</span>}
              <button onClick={() => getWeather()} style={{ background: '#000', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>Αναζήτηση</button>
            </div>

            {suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: 'white', borderRadius: '15px', color: '#333', overflow: 'hidden', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                {suggestions.map((s, i) => (
                  <div key={i} onClick={() => getWeather(s)} style={{ padding: '12px 20px', borderBottom: '1px solid #eee', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {s} 
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newHistory = history.filter(h => h !== s);
                        setHistory(newHistory);
                        setSuggestions(newHistory.filter(h => h.toLowerCase().startsWith(city.toLowerCase())));
                      }} 
                      style={{ color: '#ff4757', fontWeight: 'bold', fontSize: '22px', padding: '0 10px', cursor: 'pointer' }}
                    >&times;</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="forecast-row">
            {forecast.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', padding: '12px', borderRadius: '18px', textAlign: 'center', minWidth: '70px', backdropFilter: 'blur(5px)' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{new Date(f.dt_txt).toLocaleDateString('el-GR', {weekday: 'short'})}</div>
                <img src={`https://openweathermap.org/img/wn/${f.weather[0].icon}.png`} width="30" alt="icon" />
                <div style={{ fontWeight: '700' }}>{Math.round(f.main.temp)}°</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '40px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px' }}>
            <div style={{textAlign:'center'}}><small style={{opacity:0.6, fontSize:'0.7rem'}}>ΑΙΣΘΗΣΗ</small><div style={{fontSize:'1.2rem', fontWeight:'600'}}>{Math.round(weather.main.feels_like)}°</div></div>
            <div style={{textAlign:'center'}}><small style={{opacity:0.6, fontSize:'0.7rem'}}>ΥΓΡΑΣΙΑ</small><div style={{fontSize:'1.2rem', fontWeight:'600'}}>{weather.main.humidity}%</div></div>
            <div style={{textAlign:'center'}}><small style={{opacity:0.6, fontSize:'0.7rem'}}>ΑΝΕΜΟΣ</small><div style={{fontSize:'1.2rem', fontWeight:'600'}}>{weather.wind.speed}m/s</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
