/* 
   Example:
   {
     name: "Line-following robot",
     tag: "Robotics",
     description: "A small bot that follows a track using IR sensors and a PID loop.",
     link: "https://github.com/hrishikesh599/line-follower"
   },
*/
const PROJECTS = [
 //project code here
];


function renderProjects(){
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  PROJECTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.innerHTML = `
      <span class="project-tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <a class="project-link" href="${p.link}" target="_blank" rel="noopener">View repo ↗</a>
    `;
    grid.appendChild(card);
  });

  const ghost = document.createElement('div');
  ghost.className = 'project-card add-project reveal';
  ghost.innerHTML = `
    <span class="plus">+</span>
    <p>More builds land here as I ship them — the full list always lives on GitHub.</p>
  `;
  grid.appendChild(ghost);
}
renderProjects();


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
