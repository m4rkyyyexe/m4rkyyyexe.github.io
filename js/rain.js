const rainContainer = document.querySelector('.rain-container');
const numberOfDrops = 150;

for (let i = 0; i < numberOfDrops; i++) {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');

  raindrop.style.left = `${Math.random() * 100}vw`;

  const size = Math.random() * 0.5 + 0.5; 
  raindrop.style.transform = `scale(${size})`; 

  raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
  raindrop.style.animationDelay = `-${Math.random() * 2}s`;

  rainContainer.appendChild(raindrop);

  raindrop.addEventListener('animationiteration', () => {
    createSplash(raindrop);
  });
}

function createSplash(raindrop) {
  const splash = document.createElement('div');
  splash.classList.add('splash');

  const dropX = raindrop.style.left;
  const dropY = window.innerHeight; 
  
  splash.style.left = dropX;
  splash.style.top = `${dropY - 5}px`; 

  rainContainer.appendChild(splash);

  setTimeout(() => {
    splash.remove();
  }, 300); 
}