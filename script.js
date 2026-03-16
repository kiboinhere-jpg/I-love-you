const heartsContainer = document.getElementById('hearts-container');
const landingScreen = document.getElementById('landing-screen');
const qrEntry = document.getElementById('qr-entry');
const music = document.getElementById('bg-music');

// Function to create falling hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';

    const startLeft = Math.random() * 100;
    const size = Math.random() * (40 - 15) + 15;
    const duration = Math.random() * (12 - 6) + 6;
    const opacity = Math.random() * (0.9 - 0.5) + 0.5;

    heart.style.left = startLeft + 'vw';
    heart.style.top = '-50px';
    heart.style.fontSize = size + 'px';
    heart.style.animationDuration = duration + 's';
    heart.style.opacity = opacity;

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}

// Function to create floating neon text
function createFloatingText() {
    const texts = ["I LOVE YOU MORE", "CANTIKKU", "SAYANGKU"];
    const textElement = document.createElement('div');
    textElement.classList.add('text-line');

    if (Math.random() > 0.4) {
        textElement.classList.add('glow-intense');
    }

    const text = texts[Math.floor(Math.random() * texts.length)];
    textElement.innerText = text;

    const fontSize = (Math.random() * (2.2 - 1.1) + 1.1) + 'rem';
    const left = (Math.random() * 80) + 'vw';
    const top = (Math.random() * 90) + 'vh';
    const duration = (Math.random() * 10 + 5) + 's';
    const moveX = (Math.random() * 100 - 50) + 'px';
    const moveY = (Math.random() * -100 - 50) + 'px';
    const rotStart = (Math.random() * 20 - 10) + 'deg';
    const rotEnd = (Math.random() * 20 - 10) + 'deg';

    textElement.style.fontSize = fontSize;
    textElement.style.left = left;
    textElement.style.top = top;
    textElement.style.setProperty('--drift-duration', duration);
    textElement.style.setProperty('--move-x', moveX);
    textElement.style.setProperty('--move-y', moveY);
    textElement.style.setProperty('--rot-start', rotStart);
    textElement.style.setProperty('--rot-end', rotEnd);
    textElement.style.opacity = Math.random() * (0.9 - 0.3) + 0.3;

    heartsContainer.appendChild(textElement);

    setTimeout(() => {
        textElement.style.transition = 'opacity 5s ease';
        textElement.style.opacity = '0';
        setTimeout(() => textElement.remove(), 5000);
    }, 15000);
}

// Start generation logic
function startContentGeneration() {
    setInterval(createHeart, 250);
    setInterval(createFloatingText, 1500);
}

// Landing Screen Trigger
qrEntry.addEventListener('click', () => {
    landingScreen.classList.add('hidden');

    // Play music
    music.play().catch(e => console.log("Audio play failed:", e));

    startContentGeneration();

    // Initial burst
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingText, i * 100);
    }
});

// Click Interaction for Hearts
document.addEventListener('click', (e) => {
    if (!landingScreen.classList.contains('hidden')) return;

    if (music.paused) {
        music.play().catch(() => { });
    }

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '✨';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '40px';
    heart.style.animationDuration = '2s';
    heart.style.zIndex = '50';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
});
