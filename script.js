document.addEventListener('DOMContentLoaded', function() {
    initPokeballCanvas();
    initPokemonPopup();
    initClock();
});

function initClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    
    function updateClock() {
        const now = new Date();
        const options = { 
            timeZone: 'America/Los_Angeles',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        };
        clockEl.textContent = now.toLocaleTimeString('en-US', options);
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

function initPokeballCanvas() {
    const canvas = document.getElementById('pokeball-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let rotationX = 0;
    let rotationY = 0;

    const points = [];
    const count = 350;
    const radius = 38;

    for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        points.push({
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi),
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        rotationX += 0.003;
        rotationY += 0.005;

        points.forEach((p) => {
            let y1 = p.y * Math.cos(rotationX) - p.z * Math.sin(rotationX);
            let z1 = p.y * Math.sin(rotationX) + p.z * Math.cos(rotationX);
            
            let x2 = p.x * Math.cos(rotationY) + z1 * Math.sin(rotationY);
            let z2 = -p.x * Math.sin(rotationY) + z1 * Math.cos(rotationY);

            const scale = 200 / (200 + z2);
            const x2d = x2 * scale + centerX;
            const y2d = y1 * scale + centerY;

            const depth = (z2 + radius) / (2 * radius);
            const opacity = depth * 0.6 + 0.2;
            
            const distFromCenter = Math.abs(y1);
            const isCenter = distFromCenter < 3;
            const isUpper = y1 < -3;
            
            let color;
            if (isCenter) {
                if (Math.sqrt(x2*x2 + y1*y1) < 8) {
                    color = `rgba(255, 255, 255, ${opacity + 0.5})`; // Button white
                } else {
                    color = `rgba(30, 30, 30, ${opacity + 0.6})`; // Band black
                }
            } else if (isUpper) {
                color = `rgba(220, 50, 50, ${opacity + 0.3})`; // Top red
            } else {
                color = `rgba(240, 240, 240, ${opacity * 0.7})`; // Bottom white
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x2d, y2d, 1.1 * scale, 0, Math.PI * 2);
            ctx.fill();
        });

        animationFrameId = window.requestAnimationFrame(render);
    }

    render();
}

function initPokemonPopup() {
    const canvas = document.getElementById('pokeball-canvas');
    const popup = document.getElementById('pokemon-popup');
    const closeBtn = document.querySelector('.pokemon-close');
    const sprite = document.getElementById('pokemon-sprite');
    const nameEl = document.getElementById('pokemon-name');
    const typesEl = document.getElementById('pokemon-types');
    const descriptionEl = document.getElementById('pokemon-description');

    if (!canvas || !popup) return;

    canvas.addEventListener('click', async () => {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        
        try {
            const [pokemonResponse, speciesResponse] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`)
            ]);
            const data = await pokemonResponse.json();
            const speciesData = await speciesResponse.json();
            
            const englishEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
            const description = englishEntry ? englishEntry.flavor_text.replace(/\f|\n/g, ' ') : '';
            
            sprite.src = data.sprites.front_default;
            nameEl.textContent = data.name;
            typesEl.textContent = data.types.map(t => t.type.name).join(' / ');
            descriptionEl.textContent = description;
            
            popup.classList.remove('hidden');
        } catch (error) {
            console.error('Failed to fetch Pokemon:', error);
        }
    });

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.add('hidden');
        }
    });
}
