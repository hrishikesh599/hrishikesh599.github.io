  const field = document.getElementById('field');
  const cursorGlow = document.getElementById('cursorGlow');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    field.style.setProperty('--mx', x + '%');
    field.style.setProperty('--my', y + '%');
    cursorGlow.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
  }, { passive: true });

  const progress = document.getElementById('progress');
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
	  }
	});
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  const visuals = [document.getElementById('signalVisual'), document.getElementById('jarvisVisual')];
  const vio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        vio.unobserve(entry.target);
	  }
	});
  }, { threshold: 0.4 });
  visuals.forEach(v => v && vio.observe(v));

  document.querySelectorAll('.feature-card').forEach(card => {
    const inner = card.querySelector('.feature-inner');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      inner.style.transform = `rotateY(${px * 6}deg) rotateX(${py * -6}deg)`;
	});
    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
	});
  });

  document.querySelectorAll('.magnet').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px) translateY(-2px)`;
	});
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
	});
  });
