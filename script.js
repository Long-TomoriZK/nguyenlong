// --- Overlay & Heart Logic ---
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const heart = document.getElementById('heart');
  
  if (heart) {
    heart.addEventListener('click', () => {
      // 1. Create explosion particles
      const heartRect = heart.getBoundingClientRect();
      const heartX = heartRect.left + heartRect.width / 2;
      const heartY = heartRect.top + heartRect.height / 2;

      for (let i = 0; i < 40; i++) { // More particles
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle); 

        const size = Math.random() * 15 + 5;
        const angle = Math.random() * 360;
        const distance = Math.random() * 120 + 80; 

        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${heartX}px`;
        particle.style.top = `${heartY}px`;
        particle.style.backgroundColor = `hsl(${335 + Math.random()*20}, 90%, 65%)`;

        const anim = particle.animate([
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, opacity: 0 }
        ], {
          duration: 900 + Math.random() * 500,
          easing: 'cubic-bezier(0.17, 0.88, 0.32, 1.275)'
        });
        anim.onfinish = () => particle.remove();
      }

      // 2. Hide overlay
      overlay.classList.add('hidden');
      
      // 3. Show the secret message immediately
      document.getElementById('secret-message')?.classList.add('visible');

    }, { once: true });
  }

  // New click listener for the secret message
  const secretMessage = document.getElementById('secret-message');
  const mainContainer = document.querySelector('.container');

  if (secretMessage && mainContainer) {
    secretMessage.addEventListener('click', () => {
      secretMessage.classList.remove('visible'); // Hide the message
      mainContainer.classList.remove('hidden'); // Show the card
    }, { once: true });
  }
});





// Petals animation
const petalsContainer = document.getElementById('petals');
function makePetal(){
  if (!petalsContainer) return;
  const p = document.createElement('div');
  p.className = 'petal';
  const left = Math.random()*100;
  const animDelay = Math.random() * 5000;
  p.style.left = left + 'vw';
  p.style.animationDelay = animDelay + 'ms';

  const size = 12 + Math.random()*28;
  p.style.width = size + 'px'; p.style.height = size + 'px';
  
  const initialRotation = Math.random()*360;
  p.style.transform = 'rotate(' + initialRotation + 'deg)';
  petalsContainer.appendChild(p);

  const fall = p.animate([
    { transform: `translateY(-10vh) rotate(${initialRotation}deg)`, opacity:1},
    { transform: `translateY(110vh) translateX(${Math.random()*60-30}vw) rotate(${initialRotation + Math.random()*720}deg)`, opacity:0}
  ],{
    duration:8000+Math.random()*7000, 
    easing:'linear',
    delay: animDelay
  });
  fall.onfinish = ()=> p.remove();
}
for(let i=0; i<15; i++){ makePetal(); }
setInterval(makePetal, 800);


// Set absolute date
const dateEl = document.getElementById('dateText');
if (dateEl) {
  const d = new Date();
  const options = {year:'numeric', month:'long', day:'numeric'};
  dateEl.textContent = d.toLocaleDateString('vi-VN', options);
}
