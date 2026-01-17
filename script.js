document.addEventListener('DOMContentLoaded', function() {
    initPokeballCanvas();
});

function initPokeballCanvas() {
    const canvas = document.getElementById('pokeball-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let rotationX = 0;
    let rotationY = 0;

    const points = [];
    const count = 300;
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

            const opacity = (z2 + radius) / (2 * radius) * 0.5 + 0.1;
            const isUpper = y1 < -2;
            
            if (Math.abs(y1) < 1.5) {
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity + 0.4})`;
            } else if (isUpper) {
                ctx.fillStyle = `rgba(239, 68, 68, ${opacity + 0.3})`;
            } else {
                ctx.fillStyle = `rgba(156, 163, 175, ${opacity})`;
            }

            ctx.beginPath();
            ctx.arc(x2d, y2d, 0.8 * scale, 0, Math.PI * 2);
            ctx.fill();
        });

        animationFrameId = window.requestAnimationFrame(render);
    }

    render();

    return () => {
        window.cancelAnimationFrame(animationFrameId);
    };
}
