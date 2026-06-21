document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navEl = document.querySelector('.nav nav');

  if (menuBtn && navEl) {
    menuBtn.setAttribute('aria-expanded', 'false');

    menuBtn.addEventListener('click', () => {
      const isOpen = navEl.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navEl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (navEl.classList.contains('open')) {
          navEl.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const placeholders = document.querySelectorAll('.media-placeholder');

  if (!placeholders || placeholders.length === 0) {
    console.error('.media-placeholder elements not found');
    return;
  }

  placeholders.forEach((videoBox) => {
    const video = videoBox.querySelector('video');
    const overlay = videoBox.querySelector('.play-overlay');
    const link = videoBox.querySelector('a');
    const linkImage = link && link.querySelector('img');

    if (linkImage) {
      if (getComputedStyle(videoBox).position === 'static') videoBox.style.position = 'relative';

      let linkOverlay = videoBox.querySelector('.link-overlay');
      if (!linkOverlay) {
        linkOverlay = document.createElement('div');
        linkOverlay.className = 'link-overlay';
        linkOverlay.textContent = 'Open link';
        Object.assign(linkOverlay.style, {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '8px',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          background: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: '8px',
          opacity: '0',
          transition: 'opacity 160ms ease',
          zIndex: '20',
          fontSize: '13px',
        });
        videoBox.appendChild(linkOverlay);
      }

      const showLinkOverlay = () => { linkOverlay.style.opacity = '1'; };
      const hideLinkOverlay = () => { linkOverlay.style.opacity = '0'; };

      link.addEventListener('pointerenter', showLinkOverlay);
      link.addEventListener('pointerleave', hideLinkOverlay);
      link.addEventListener('focus', showLinkOverlay);
      link.addEventListener('blur', hideLinkOverlay);
    }

    if (!video) {
      // no video in this placeholder (e.g. image-only), done
      return;
    }

    // Optional: ensure mobile inline playback
    video.setAttribute('playsinline', '');

    // If overlay is missing, create a simple one so users know they can play
    if (!overlay) {
      const ov = document.createElement('div');
      ov.className = 'play-overlay';
      ov.innerHTML = '<div class="play-icon">▶</div>';
      videoBox.appendChild(ov);
    }

    const currentOverlay = videoBox.querySelector('.play-overlay');

    videoBox.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        if (currentOverlay) currentOverlay.style.opacity = '0';
      } else {
        video.pause();
        if (currentOverlay) currentOverlay.style.opacity = '1';
      }
    });

    video.addEventListener('pause', () => { if (currentOverlay) currentOverlay.style.opacity = '1'; });
    video.addEventListener('play', () => { if (currentOverlay) currentOverlay.style.opacity = '0'; });
    
    // Pause the video when the pointer/cursor leaves the media container
    const pauseOnLeave = () => {
      if (!video.paused) video.pause();
      if (currentOverlay) currentOverlay.style.opacity = '1';
    };

    videoBox.addEventListener('pointerleave', pauseOnLeave);
    videoBox.addEventListener('mouseleave', pauseOnLeave);
  });
});