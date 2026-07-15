import { useState } from "react";

function Test() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: "20px", 
      background: "rgba(255,255,255,0.2)", 
      borderRadius: "10px",
      textAlign: "center",
      margin: "20px auto",
      maxWidth: "300px"
    }}>
      <h3>Δοκιμαστικό React</h3>
      <p>Πατήθηκε: {count} φορές</p>
      <button 
        style={{ padding: "8px 16px", cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setCount(count + 1)}
      >
        Κάνε Κλικ!
      </button>
    </div>
  );
}

export default Test;