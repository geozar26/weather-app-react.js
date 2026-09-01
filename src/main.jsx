import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './index.css'; // <-- ΕΔΩ ΜΠΑΙΝΕΙ ΤΟ CSS ΓΙΑ ΝΑ ΦΑΝΟΥΝ ΤΑ ΣΤΙΛ ΣΟΥ!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);