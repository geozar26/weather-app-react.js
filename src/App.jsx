import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "8e870e1f59cadca07199db1d225e0dec";

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=el`
      );
      if (!response.ok) throw new Error("Δεν βρέθηκε η πόλη!");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ΟΡΙΣΤΙΚΑ ΣΤΥΛ ΓΙΑ ΝΑ ΜΗΝ ΚΟΛΛΑΕΙ ΣΤΙΣ ΑΚΡΕΣ (320px)
  const styles = {
    app: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5', // Γκρι φόντο για να σιγουρευτούμε ότι άλλαξε
      padding: '40px 20px', // ΤΑ ΠΕΡΙΘΩΡΙΑ ΠΟΥ ΗΘΕΛΕΣ
      boxSizing: 'border-box',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    },
    searchContainer: {
      display: 'flex',
      gap: '8px',
      width: '100%',
      maxWidth: '350px',
      margin: '0 auto 20px auto',
      backgroundColor: 'white',
      padding: '5px',
      borderRadius: '50px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      boxSizing: 'border-box'
    },
    input: {
      flex: 1,
      border: 'none',
      outline: 'none',
      padding: '10px 15px',
      fontSize: '16px',
      minWidth: '0', // SOS για να μικραίνει στα 320px
      borderRadius: '50px'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '50px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontWeight: 'bold'
    },
    card: {
      marginTop: '30px',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      maxWidth: '350px',
      margin: '30px auto 0 auto'
    }
  };

  return (
    <div style={styles.app}>
      <h1>🌤️ Weather App</h1>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Πόλη..."
          style={styles.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />
        <button style={styles.button} onClick={getWeather}>
          Αναζήτηση
        </button>
      </div>

      {loading && <p>Φόρτωση...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={styles.card}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <h3 style={{ fontSize: '2rem' }}>{Math.round(weather.main.temp)}°C</h3>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="icon" 
          />
        </div>
      )}
    </div>
  );
}

export default App;