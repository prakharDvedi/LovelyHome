export default function initSounds() {
  const buttons = document.querySelectorAll("[data-sound]");
  let currentAudio = null;
  let activeSoundName = null;

  const SOUNDS = {
    rain: "sounds/rain.mp3",
    forest: "sounds/water.mp3", // User provided water.mp3
    cafe: "sounds/coffee.mp3", // User provided coffee.mp3
  };

  function stopSound() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    // Reset UI
    buttons.forEach((btn) => btn.classList.remove("active"));
    activeSoundName = null;
  }

  function playSound(name) {
    // If clicking the active one, toggle off
    if (activeSoundName === name) {
      stopSound();
      return;
    }

    // Stop previous
    stopSound();

    // Play new
    const url = SOUNDS[name];
    if (url) {
      console.log(`Loading sound: ${name} from ${url}`);
      currentAudio = new Audio(url);
      currentAudio.loop = true;
      currentAudio.volume = 0.5; // Moderate volume

      currentAudio
        .play()
        .then(() => console.log("Playback started successfully"))
        .catch((error) => {
          console.error("Playback failed:", error);
          alert("Error playing sound. Check console for details.");
        });

      activeSoundName = name;

      // Update UI
      const btn = document.querySelector(`[data-sound="${name}"]`);
      if (btn) btn.classList.add("active");
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      playSound(btn.dataset.sound);
    });
  });

  // Volume Control
  const volumeSlider = document.getElementById("volume-slider");
  if (volumeSlider) {
    // Set initial volume visually
    volumeSlider.value = 0.5;

    volumeSlider.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      if (currentAudio) {
        currentAudio.volume = vol;
      }
    });
  }
}
