(function () {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  const mediaFrames = document.querySelectorAll('.media-frame[data-kind]');

  mediaFrames.forEach((frame) => {
    const kind = frame.dataset.kind;
    const media = frame.querySelector(kind);

    if (!media) {
      return;
    }

    const markMissing = () => {
      frame.classList.add('is-missing');
      media.style.display = 'none';
    };

    const markReady = () => {
      frame.classList.remove('is-missing');
      media.style.display = 'block';
    };

    if (kind === 'img') {
      media.addEventListener('load', markReady);
      media.addEventListener('error', markMissing);
      if (media.complete && media.naturalWidth > 0) {
        markReady();
      }
    }

    if (kind === 'video') {
      media.addEventListener('loadeddata', markReady);
      media.addEventListener('error', markMissing);
      media.addEventListener('stalled', markMissing);
    }
  });
})();
