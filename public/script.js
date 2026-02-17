const hoverSound = new Audio('paperEffect.mp3');
hoverSound.volume = 0.3;

const posters = document.querySelectorAll('.wantedPoster');

posters.forEach(poster => {
  poster.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

