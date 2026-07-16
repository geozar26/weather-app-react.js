import { useState, useEffect } from "react";

function DetailTile({ label, val, icon, col }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setIsReady(true));
  }, []);

  return (
    <div
      className="glass"
      style={{
        padding: "15px 2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <i
        className={`material-icons tile-icon ${isReady ? "ready" : ""}`}
        style={{ color: col, fontSize: "24px", marginBottom: "5px" }}
      >
        {icon}
      </i>
      <div
        style={{
          fontSize: "0.65rem",
          fontWeight: 950,
          color: "white",
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "1.05rem", fontWeight: 950 }}>{val}</div>
    </div>
  );
}

export default DetailTile;