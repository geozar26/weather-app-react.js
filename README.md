Modern Weather Dashboard
A sleek, dynamic weather application built with React.js. This dashboard provides real-time weather data, a 5-day forecast, and an immersive user experience with dynamic backgrounds that adapt to current weather conditions.

 Key Features
 Real-Time Data: Fetches up-to-the-minute weather information via OpenWeather API.

 Dynamic UI: The interface background changes dynamically based on weather conditions (e.g., Clear, Clouds, Rain, Snow).

 Smart Time Tracking: Calculates and displays the accurate local time of the searched city using timezone offsets.

 5-Day Forecast: Displays a concise mid-day forecast for the upcoming week.

 Search History: Remembers your recently searched cities using localStorage for quick access.

 Fully Responsive: Optimized for all screen sizes with a modern Glassmorphism design.

 Robust Error Handling: Provides user feedback for "City not found" or connection issues.

 Tech Stack
Frontend: React.js (Hooks: useState, useEffect, useRef)

Styling: CSS-in-JS & Glassmorphism techniques

API: OpenWeatherMap API

Icons: Material Design Icons

 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/geozar26/weather-app-react.js.git
Install dependencies:

Bash
npm install
API Key:
The project uses the OpenWeatherMap API. Replace the API_KEY variable in App.js with your own key from OpenWeatherMap.

Run the app:

Bash
npm start
