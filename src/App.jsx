import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const [isXHovered, setIsXHovered] = useState(false);
  const [isCloseCardHovered, setIsCloseCardHovered] = useState(false);
  const [history, setHistory] = useState([]); 

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  const getWeather = async (cityName = city) => {
    if (!cityName) return;
    setLoading(true);
    setWeather(null);
    setSuggestions([]);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=el`
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      setWeather(data);
      
      if (!history.includes(data.name)) {
        setHistory(prev => [data.name, ...prev]);
      }
    } catch (err) {
      triggerToast("Η πόλη δεν βρέθηκε!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.length > 0) {
      const filtered = history.filter(item => 
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const removeFromHistory = (e, cityToRemove) => {
    e.stopPropagation();
    e.preventDefault();
    setHistory(prev => prev.filter(c => c !== cityToRemove));
    setSuggestions(prev => prev.filter(c => c !== cityToRemove));
  };

  const triggerToast = (msg) => {
    setShowToast({ show: true, message: msg });
    setTimeout(() => setShowToast({ show: false, message: "" }), 3000);
  };

  const styles = {
    app: { 
      width: '100vw', height: '100vh', backgroundColor: '#007bff', 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      fontFamily: 'sans-serif', margin: 0, padding: 0, overflow: 'hidden', position: 'fixed', top: 0, left: 0
    },
    title: { fontSize: '2.6rem', color: 'white', marginBottom: '25px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' },
    searchContainer: { 
      display: 'flex', alignItems: 'center', gap: '8px', width: '90%', maxWidth: '420px', 
      backgroundColor: 'white', padding: '6px 8px', borderRadius: '50px', 
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)', position: 'relative', zIndex: 100 
    },
    input: { flex: 1, border: 'none', outline: 'none', padding: '12px 15px', fontSize: '18px', borderRadius: '50px' },
    clearBtn: { 
      position: 'absolute', right: '155px', top: '50%', 
      transform: 'translateY(-50%)',
      cursor: 'pointer', color: '#999', fontSize: '22px', display: city ? 'block' : 'none', 
      zIndex: 10, transition: 'all 0.2s ease', userSelect: 'none'
    },
    button: { 
      backgroundColor: '#1a1a1a', color: 'white', border: 'none', 
      padding: '12px 20px', borderRadius: '50px', cursor: 'pointer', 
      fontSize: '15px', fontWeight: '600', minWidth: '110px',
      display: 'flex', justifyContent: 'center', alignItems: 'center' 
    },
    card: { 
      backgroundColor: 'white', padding: '30px 20px 20px 20px', borderRadius: '40px', 
      boxShadow: '0 20px 45px rgba(0,0,0,0.2)', width: '85%', maxWidth: '280px', 
      textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', 
      marginTop: '-15px', position: 'relative' 
    },
    closeCardBtn: {
      position: 'absolute', 
      top: '12px',      
      right: '18px',    
      fontSize: '22px', 
      cursor: 'pointer',
      transition: 'all 0.2s ease', fontWeight: 'bold', lineHeight: '1',
      color: isCloseCardHovered ? '#ff4757' : '#1a1a1a'
    },
    animatedIcon: { width: '120px', height: '120px', margin: '5px 0', objectFit: 'contain' },
    temp: { fontSize: '3.5rem', fontWeight: '900', color: '#1a1a1a', margin: '5px 0' },
    autocomplete: { 
      position: 'absolute', top: '110%', left: '0', right: '0', backgroundColor: 'white', 
      borderRadius: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', zIndex: 150, listStyle: 'none', padding: '10px 0',
      maxHeight: '200px', overflowY: 'auto'
    }
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}><span>☀️</span> Weather App</h1>

      <div style={styles.searchContainer}>
        <input
          type="text" style={styles.input} placeholder="Αναζήτηση..."
          value={city} onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />
        <span 
          style={styles.clearBtn} 
          onClick={() => {setCity(""); setSuggestions([]);}}
          onMouseEnter={() => setIsXHovered(true)}
          onMouseLeave={() => setIsXHovered(false)}
        >
          &times;
        </span>
        <button style={styles.button} onClick={() => getWeather()}>Αναζήτηση</button>

        {suggestions.length > 0 && (
          <ul style={styles.autocomplete}>
            {suggestions.map((s, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 25px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }} 
                  onClick={() => { setCity(s); getWeather(s); }}>
                <span style={{fontSize: '16px', color: '#333'}}>{s}</span>
                <span style={{color: '#ff4757', fontWeight: 'bold', fontSize: '22px', padding: '0 10px'}} 
                      onClick={(e) => removeFromHistory(e, s)}>&times;</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {showToast.show && (
          <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: 'white', padding: '10px 25px', borderRadius: '50px', fontSize: '14px', fontWeight: '600' }}>
            {showToast.message}
          </div>
        )}
        {loading && <p style={{color: 'white', fontWeight: 'bold'}}>Φόρτωση...</p>}
      </div>

      {weather && (
        <div style={styles.card}>
          <span 
            style={styles.closeCardBtn} 
            onClick={() => setWeather(null)}
            onMouseEnter={() => setIsCloseCardHovered(true)}
            onMouseLeave={() => setIsCloseCardHovered(false)}
          >
            &times;
          </span>
          <h2 style={{fontSize: '1.8rem', margin: 0, fontWeight: '700'}}>{weather.name}</h2>
          
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt="weather" 
            style={styles.animatedIcon}
          />

          <div style={{color: '#666', textTransform: 'capitalize', fontSize: '1.1rem'}}>{weather.weather[0].description}</div>
          <div style={styles.temp}>{Math.round(weather.main.temp)}°C</div>
        </div>
      )}
    </div>
  );
}

export default App;
