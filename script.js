import quote from "./quote.js";
import initTodo from "./todo.js";
import initWeather from "./weather.js";
import initBackgrounds from "./backgrounds.js";
import initSounds from "./sounds.js";

function updateTime() {
  const now = new Date();

  // Time
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = `${hours}:${minutes}`;

  // Date
  const options = { weekday: "long", month: "long", day: "numeric" };
  document.getElementById("date").textContent = now.toLocaleDateString(
    undefined,
    options
  );

  // Greeting
  const hour = now.getHours();
  let greetingText = "Good Evening";
  if (hour < 12) greetingText = "Good Morning";
  else if (hour < 18) greetingText = "Good Afternoon";

  document.getElementById("greeting").textContent = greetingText;
}

// Initial call
updateTime();
quote();
initTodo();
initWeather();
initBackgrounds();
initSounds();

// Update every second
setInterval(updateTime, 1000);

// Add a simple fade-in effect on load
document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector(".glass-panel");
  mainContent.style.opacity = "0";
  mainContent.style.transform = "translateY(20px)";

  setTimeout(() => {
    mainContent.style.transition = "opacity 1s ease, transform 1s ease";
    mainContent.style.opacity = "1";
    mainContent.style.transform = "translateY(0)";
  }, 100);
});
