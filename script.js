const videoBox = document.querySelector('.media-placeholder');
const video = videoBox.querySelector('video');
const overlay = videoBox.querySelector('.play-overlay');

videoBox.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    overlay.style.opacity = '0'; // hide button while playing
  } else {
    video.pause();
    overlay.style.opacity = '1'; // show button when paused
  }
});

video.addEventListener('pause', () => overlay.style.opacity = '1');
video.addEventListener('play', () => overlay.style.opacity = '0');