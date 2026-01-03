export default function initSounds() {
  const buttons = document.querySelectorAll("[data-sound]");
  let currentAudio = null;
  let activeSoundName = null;

  const SOUNDS = {
    rain: "https://raw.githubusercontent.com/bradtraversy/ambient-sound-mixer/main/sounds/rain.mp3",
    forest:
      "https://raw.githubusercontent.com/bradtraversy/ambient-sound-mixer/main/sounds/forest.mp3",
    cafe: "https://raw.githubusercontent.com/bradtraversy/ambient-sound-mixer/main/sounds/coffee-shop.mp3",
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
      currentAudio = new Audio(url);
      currentAudio.loop = true;
      currentAudio.volume = 0.5; // Moderate volume
      currentAudio.play();

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
}
