export default function initWeather() {
  const tempEl = document.getElementById("temp");
  const aqiEl = document.getElementById("aqi");

  function updateUI(temp, aqi) {
    if (temp !== undefined) tempEl.textContent = `${temp}°C`;
    if (aqi !== undefined) {
      aqiEl.textContent = aqi;

      // Simple color coding for AQI
      const badge = document.getElementById("aqi-badge");
      if (aqi <= 50)
        badge.style.background = "rgba(46, 204, 113, 0.4)"; // Good (Green)
      else if (aqi <= 100)
        badge.style.background = "rgba(241, 196, 15, 0.4)"; // Moderate (Yellow)
      else badge.style.background = "rgba(231, 76, 60, 0.4)"; // Unhealthy (Red)
    }
  }

  function fetchData(lat, lon) {
    // Weather
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
    // AQI
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`;

    Promise.all([
      fetch(weatherUrl).then((r) => r.json()),
      fetch(aqiUrl).then((r) => r.json()),
    ])
      .then(([weatherData, aqiData]) => {
        const temp = weatherData.current?.temperature_2m;
        const aqi = aqiData.current?.us_aqi;
        updateUI(temp, aqi);
      })
      .catch((err) => {
        console.error("Weather fetch failed:", err);
        tempEl.textContent = "Err";
        aqiEl.textContent = "-";
      });
  }

  // Get User Location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchData(latitude, longitude);
      },
      (error) => {
        console.warn("Location denied:", error);
        tempEl.textContent = "N/A";
        aqiEl.textContent = "N/A";
      }
    );
  } else {
    tempEl.textContent = "N/A";
  }
}
