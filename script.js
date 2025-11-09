// Animated Background with Connected Lines
class AnimatedBackground {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.maxDistance = 150;
        this.pointCount = 100;
        this.connectionUpdateTimer = 0;
        this.connectionUpdateInterval = 5000; // Update connections every 5 seconds
        
        this.init();
        this.animate();
        this.handleResize();
        this.handleMouseMove();
    }
    
    init() {
        this.resize();
        this.createPoints();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createPoints() {
        this.points = [];
        for (let i = 0; i < this.pointCount; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                connections: []
            });
        }
        
        // Create random connections between points
        this.createRandomConnections();
    }
    
    createRandomConnections() {
        // Clear existing connections
        this.points.forEach(point => point.connections = []);
        
        // Create random connections (each point connects to 2-4 other points)
        this.points.forEach((point, index) => {
            const numConnections = Math.floor(Math.random() * 3) + 2; // 2-4 connections
            const possibleConnections = this.points.filter((_, i) => i !== index);
            
            // Shuffle and take random connections
            for (let i = 0; i < numConnections && possibleConnections.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * possibleConnections.length);
                const targetPoint = possibleConnections.splice(randomIndex, 1)[0];
                const targetIndex = this.points.indexOf(targetPoint);
                
                // Avoid duplicate connections
                if (!point.connections.includes(targetIndex) && !targetPoint.connections.includes(index)) {
                    point.connections.push(targetIndex);
                    targetPoint.connections.push(index);
                }
            }
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createPoints();
        });
    }
    
    handleMouseMove() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    update() {
        this.points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x <= 0 || point.x >= this.canvas.width) point.vx *= -1;
            if (point.y <= 0 || point.y >= this.canvas.height) point.vy *= -1;
            
            // Keep points within bounds
            point.x = Math.max(0, Math.min(this.canvas.width, point.x));
            point.y = Math.max(0, Math.min(this.canvas.height, point.y));
        });
        
        // Periodically update connections
        this.connectionUpdateTimer += 16; // Assuming 60fps
        if (this.connectionUpdateTimer >= this.connectionUpdateInterval) {
            this.createRandomConnections();
            this.connectionUpdateTimer = 0;
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current theme colors
        const isDark = document.body.classList.contains('dark-theme');
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary');
        const lineOpacity = isDark ? 0.2 : 0.15;
        const pointOpacity = isDark ? 0.6 : 0.4;
        
        // Draw connections based on stored connections
        this.ctx.lineWidth = 0.5;
        
        this.points.forEach((point, index) => {
            point.connections.forEach(connectionIndex => {
                if (connectionIndex > index) { // Avoid drawing the same line twice
                    const targetPoint = this.points[connectionIndex];
                    const dx = point.x - targetPoint.x;
                    const dy = point.y - targetPoint.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Calculate opacity based on distance (fade out for very long connections)
                    const maxVisibleDistance = 300;
                    const opacity = distance > maxVisibleDistance ? 0 : (1 - (distance / maxVisibleDistance)) * lineOpacity;
                    
                    if (opacity > 0) {
                        this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        this.ctx.beginPath();
                        this.ctx.moveTo(point.x, point.y);
                        this.ctx.lineTo(targetPoint.x, targetPoint.y);
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        // Draw points
        this.ctx.fillStyle = `rgba(59, 130, 246, ${pointOpacity})`;
        this.points.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animated background
let animatedBackground;

// Pokemon Database with Region Information
const pokemonData = [
    // Kanto Region (Gen 1)
    {
        id: 1,
        name: "bulbasaur",
        type: "grass/poison",
        region: "kanto",
        height: "0.7 m",
        weight: "6.9 kg",
        abilities: "overgrow, chlorophyll",
        description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this pokemon. Found throughout the kanto region in grassy areas.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    {
        id: 4,
        name: "charmander",
        type: "fire",
        region: "kanto",
        height: "0.6 m",
        weight: "8.5 kg",
        abilities: "blaze, solar power",
        description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail. Native to the volcanic areas of kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    },
    {
        id: 7,
        name: "squirtle",
        type: "water",
        region: "kanto",
        height: "0.5 m",
        weight: "9.0 kg",
        abilities: "torrent, rain dish",
        description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth. Common along kanto's coastal routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    },
    {
        id: 25,
        name: "pikachu",
        type: "electric",
        region: "kanto",
        height: "0.4 m",
        weight: "6.0 kg",
        abilities: "static, lightning rod",
        description: "When several of these pokemon gather, their electricity can cause lightning storms. The mascot pokemon of kanto, found in viridian forest.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    },
    {
        id: 6,
        name: "charizard",
        type: "fire/flying",
        region: "kanto",
        height: "1.7 m",
        weight: "90.5 kg",
        abilities: "blaze, solar power",
        description: "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames. The final evolution of kanto's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
    },
    {
        id: 9,
        name: "blastoise",
        type: "water",
        region: "kanto",
        height: "1.6 m",
        weight: "85.5 kg",
        abilities: "torrent, rain dish",
        description: "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell. The fully evolved water starter of kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
    },
    {
        id: 3,
        name: "venusaur",
        type: "grass/poison",
        region: "kanto",
        height: "2.0 m",
        weight: "100.0 kg",
        abilities: "overgrow, chlorophyll",
        description: "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight. The final form of kanto's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
    },
    {
        id: 150,
        name: "mewtwo",
        type: "psychic",
        region: "kanto",
        height: "2.0 m",
        weight: "122.0 kg",
        abilities: "pressure, unnerve",
        description: "Its DNA was almost the same as mew's. However, its size and disposition are vastly different. Created in kanto's cerulean cave.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
    },
    {
        id: 151,
        name: "mew",
        type: "psychic",
        region: "kanto",
        height: "0.4 m",
        weight: "4.0 kg",
        abilities: "synchronize",
        description: "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide. The mythical pokemon of kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png"
    },
    {
        id: 149,
        name: "dragonite",
        type: "dragon/flying",
        region: "kanto",
        height: "2.2 m",
        weight: "210.0 kg",
        abilities: "inner focus, multiscale",
        description: "It is said to make its home somewhere in the sea. It guides crews of shipwrecks to shore. Found around kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"
    },
    
    // Johto Region (Gen 2)
    {
        id: 152,
        name: "chikorita",
        type: "grass",
        region: "johto",
        height: "0.9 m",
        weight: "6.4 kg",
        abilities: "overgrow, leaf guard",
        description: "A sweet aroma gently wafts from the leaf on its head. It is docile and loves to soak up the sun's rays. The grass starter of johto region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png"
    },
    {
        id: 155,
        name: "cyndaquil",
        type: "fire",
        region: "johto",
        height: "0.5 m",
        weight: "7.9 kg",
        abilities: "blaze, flash fire",
        description: "It is timid, and always curls itself up in a ball. If attacked, it flares up its back for protection. The fire starter of johto region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png"
    },
    {
        id: 158,
        name: "totodile",
        type: "water",
        region: "johto",
        height: "0.6 m",
        weight: "9.5 kg",
        abilities: "torrent, sheer force",
        description: "Despite the smallness of its body, totodile's jaws are very powerful. While the pokemon may think it is just playfully nipping, its bite has enough power to cause serious injury. The water starter of johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png"
    },
    {
        id: 196,
        name: "espeon",
        type: "psychic",
        region: "johto",
        height: "0.9 m",
        weight: "26.5 kg",
        abilities: "synchronize, magic bounce",
        description: "Its fur is so sensitive, it can sense minute shifts in the air and predict the weather. It is a rare evolution of eevee found in johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png"
    },
    {
        id: 197,
        name: "umbreon",
        type: "dark",
        region: "johto",
        height: "1.0 m",
        weight: "27.0 kg",
        abilities: "synchronize, inner focus",
        description: "When agitated, this pokemon protects itself by spraying poisonous sweat from its pores. The dark evolution of eevee, native to johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png"
    },
    
    // Hoenn Region (Gen 3)
    {
        id: 252,
        name: "treecko",
        type: "grass",
        region: "hoenn",
        height: "0.5 m",
        weight: "5.0 kg",
        abilities: "overgrow, unburden",
        description: "Treecko has small hooks on the bottom of its feet that enable it to scale vertical walls. This pokemon attacks by slamming foes with its thick tail. The grass starter of hoenn region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png"
    },
    {
        id: 255,
        name: "torchic",
        type: "fire",
        region: "hoenn",
        height: "0.4 m",
        weight: "2.5 kg",
        abilities: "blaze, speed boost",
        description: "Torchic sticks with its trainer, following behind with unsteady steps. This pokemon breathes fire of over 1,800 degrees fahrenheit, including fireballs that leave the foe scorched black. The fire starter of hoenn.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png"
    },
    {
        id: 258,
        name: "mudkip",
        type: "water",
        region: "hoenn",
        height: "0.4 m",
        weight: "7.6 kg",
        abilities: "torrent, damp",
        description: "The fin on mudkip's head acts as highly sensitive radar. Using this fin to sense movements of water and air, this pokemon can determine what is taking place around it without using its eyes. The water starter of hoenn.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png"
    },
    {
        id: 282,
        name: "gardevoir",
        type: "psychic/fairy",
        region: "hoenn",
        height: "1.6 m",
        weight: "48.4 kg",
        abilities: "synchronize, trace",
        description: "Gardevoir has the psychokinetic power to distort the dimensions and create a small black hole. This pokemon will try to protect its trainer even at the risk of its own life. Found throughout hoenn region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png"
    },
    {
        id: 384,
        name: "rayquaza",
        type: "dragon/flying",
        region: "hoenn",
        height: "7.0 m",
        weight: "206.5 kg",
        abilities: "air lock",
        description: "Rayquaza is said to have lived for hundreds of millions of years. Legends remain of how it put to rest the clash between kyogre and groudon. The legendary pokemon of hoenn's sky pillar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png"
    },
    
    // Sinnoh Region (Gen 4)
    {
        id: 387,
        name: "turtwig",
        type: "grass",
        region: "sinnoh",
        height: "0.4 m",
        weight: "10.2 kg",
        abilities: "overgrow, shell armor",
        description: "Made from soil, the shell on its back gets harder when it drinks water. It lives along lakes. The grass starter of sinnoh region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png"
    },
    {
        id: 390,
        name: "chimchar",
        type: "fire",
        region: "sinnoh",
        height: "0.5 m",
        weight: "6.2 kg",
        abilities: "blaze, iron fist",
        description: "It agilely scales sheer cliffs to live atop craggy mountains. Its fire is put out when it sleeps. The fire starter of sinnoh region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/390.png"
    },
    {
        id: 393,
        name: "piplup",
        type: "water",
        region: "sinnoh",
        height: "0.4 m",
        weight: "5.2 kg",
        abilities: "torrent, defiant",
        description: "Because it is very proud, it hates accepting food from people. Its thick down guards it from cold. The water starter of sinnoh region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png"
    },
    {
        id: 448,
        name: "lucario",
        type: "fighting/steel",
        region: "sinnoh",
        height: "1.2 m",
        weight: "54.0 kg",
        abilities: "steadfast, inner focus",
        description: "It has the ability to sense the auras of all things. It understands human speech. Found in sinnoh's iron island and victory road.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"
    },
    {
        id: 483,
        name: "dialga",
        type: "steel/dragon",
        region: "sinnoh",
        height: "5.4 m",
        weight: "683.0 kg",
        abilities: "pressure, telepathy",
        description: "A pokemon spoken of in legend. It is said that time began moving when dialga was born. The legendary pokemon of time from sinnoh's spear pillar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png"
    },
    
    // Unova Region (Gen 5)
    {
        id: 495,
        name: "snivy",
        type: "grass",
        region: "unova",
        height: "0.6 m",
        weight: "8.1 kg",
        abilities: "overgrow, contrary",
        description: "They photosynthesize by bathing their tails in sunlight. When they are not feeling well, their tails droop. The grass starter of unova region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png"
    },
    {
        id: 498,
        name: "tepig",
        type: "fire",
        region: "unova",
        height: "0.5 m",
        weight: "9.9 kg",
        abilities: "blaze, thick fat",
        description: "It can deftly dodge its foe's attacks while shooting fireballs from its nose. It roasts berries before it eats them. The fire starter of unova region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png"
    },
    {
        id: 501,
        name: "oshawott",
        type: "water",
        region: "unova",
        height: "0.5 m",
        weight: "5.9 kg",
        abilities: "torrent, shell armor",
        description: "The scalchop on its stomach isn't just used for battle - it can be used to break open hard berries as well. The water starter of unova region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png"
    },
    {
        id: 643,
        name: "reshiram",
        type: "dragon/fire",
        region: "unova",
        height: "3.2 m",
        weight: "330.0 kg",
        abilities: "turboblaze",
        description: "When reshiram's tail flares, the heat energy moves the atmosphere and changes the world's weather. The legendary pokemon of truth from unova's dragonspiral tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/643.png"
    },
    
    // Kalos Region (Gen 6)
    {
        id: 650,
        name: "chespin",
        type: "grass",
        region: "kalos",
        height: "0.4 m",
        weight: "9.0 kg",
        abilities: "overgrow, bulletproof",
        description: "The quills on its head are usually soft. When it flexes them, the points become so hard and sharp that they can pierce rock. The grass starter of kalos region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/650.png"
    },
    {
        id: 653,
        name: "fennekin",
        type: "fire",
        region: "kalos",
        height: "0.4 m",
        weight: "9.4 kg",
        abilities: "blaze, magician",
        description: "Eating a twig fills it with energy, and its roomy ears give vent to air hotter than 390 degrees fahrenheit. The fire starter of kalos region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/653.png"
    },
    {
        id: 656,
        name: "froakie",
        type: "water",
        region: "kalos",
        height: "0.3 m",
        weight: "7.0 kg",
        abilities: "torrent, protean",
        description: "It secretes flexible bubbles from its chest and back. The bubbles reduce the damage it takes from attacks. The water starter of kalos region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png"
    },
    {
        id: 716,
        name: "xerneas",
        type: "fairy",
        region: "kalos",
        height: "3.0 m",
        weight: "215.0 kg",
        abilities: "fairy aura",
        description: "Legends say it can share eternal life. It slept for a thousand years in the form of a tree before its revival. The legendary pokemon of life from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/716.png"
    },
    
    // Alola Region (Gen 7)
    {
        id: 722,
        name: "rowlet",
        type: "grass/flying",
        region: "alola",
        height: "0.3 m",
        weight: "1.5 kg",
        abilities: "overgrow, long reach",
        description: "This wary pokemon uses photosynthesis to store up energy during the day, while becoming active at night. The grass starter of alola region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png"
    },
    {
        id: 725,
        name: "litten",
        type: "fire",
        region: "alola",
        height: "0.4 m",
        weight: "4.3 kg",
        abilities: "blaze, intimidate",
        description: "While grooming itself, it builds up fur inside its stomach. It sets the fur alight and spews fiery attacks, which change based on how it coughs. The fire starter of alola region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/725.png"
    },
    {
        id: 728,
        name: "popplio",
        type: "water",
        region: "alola",
        height: "0.4 m",
        weight: "7.5 kg",
        abilities: "torrent, liquid voice",
        description: "This pokemon snorts body fluids from its nose, blowing balloons to smash into its foes. It's famous for being a hard worker. The water starter of alola region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/728.png"
    },
    {
        id: 800,
        name: "necrozma",
        type: "psychic",
        region: "alola",
        height: "2.4 m",
        weight: "230.0 kg",
        abilities: "prism armor",
        description: "Light is apparently the source of its energy. It has an extraordinarily vicious disposition and is constantly firing off laser beams. The legendary pokemon of alola's ultra space.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/800.png"
    },
    
    // Galar Region (Gen 8)
    {
        id: 810,
        name: "grookey",
        type: "grass",
        region: "galar",
        height: "0.3 m",
        weight: "5.0 kg",
        abilities: "overgrow, grassy surge",
        description: "When it uses its special stick to strike up a beat, the sound waves produced carry revitalizing energy to the plants and flowers in the area. The grass starter of galar region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png"
    },
    {
        id: 813,
        name: "scorbunny",
        type: "fire",
        region: "galar",
        height: "0.3 m",
        weight: "4.5 kg",
        abilities: "blaze, libero",
        description: "A warm-up of running around gets fire energy coursing through this pokemon's body. Once that happens, it's ready to fight at full power. The fire starter of galar region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png"
    },
    {
        id: 816,
        name: "sobble",
        type: "water",
        region: "galar",
        height: "0.3 m",
        weight: "4.0 kg",
        abilities: "torrent, sniper",
        description: "When scared, this pokemon cries. Its tears pack the chemical punch of 100 onions, and attackers won't be able to resist weeping. The water starter of galar region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png"
    },
    {
        id: 888,
        name: "zacian",
        type: "fairy",
        region: "galar",
        height: "2.8 m",
        weight: "110.0 kg",
        abilities: "intrepid sword",
        description: "Known as a legendary hero, this pokemon absorbs metal particles, transforming them into a weapon it uses to battle. The legendary pokemon of galar's slumbering weald.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/888.png"
    },
    
    // Paldea Region (Gen 9)
    {
        id: 906,
        name: "sprigatito",
        type: "grass",
        region: "paldea",
        height: "0.4 m",
        weight: "4.1 kg",
        abilities: "overgrow, protean",
        description: "Capable of photosynthesis, it releases a sweet aroma when it rubs its forepaws together. The grass starter of paldea region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png"
    },
    {
        id: 909,
        name: "fuecoco",
        type: "fire",
        region: "paldea",
        height: "0.4 m",
        weight: "9.8 kg",
        abilities: "blaze, unaware",
        description: "It lies on warm rocks during the day to build up energy in its fire sac, then happily spits out flames at night. The fire starter of paldea region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/909.png"
    },
    {
        id: 912,
        name: "quaxly",
        type: "water",
        region: "paldea",
        height: "0.5 m",
        weight: "6.1 kg",
        abilities: "torrent, moxie",
        description: "Its glossy feathers repel water and grime. It aligns its crest with gel secreted from its scalp for impeccable form. The water starter of paldea region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/912.png"
    },
    {
        id: 1007,
        name: "koraidon",
        type: "fighting/dragon",
        region: "paldea",
        height: "2.5 m",
        weight: "303.0 kg",
        abilities: "orichalcum pulse",
        description: "This ancient legend left behind writings describing it as the winged king. It exudes primal strength across paldea.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1007.png"
    },
    {
        id: 1008,
        name: "miraidon",
        type: "electric/dragon",
        region: "paldea",
        height: "3.5 m",
        weight: "240.0 kg",
        abilities: "hadron engine",
        description: "Said to be the iron serpent, it glides effortlessly through the air with energy thrusters on its legs. It protects the future of paldea.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1008.png"
    },
    
    // Additional Kanto Pokemon
    {
        id: 2,
        name: "ivysaur",
        type: "grass/poison",
        region: "kanto",
        height: "1.0 m",
        weight: "13.0 kg",
        abilities: "overgrow, chlorophyll",
        description: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs. Found in kanto's pokemon gardens.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
    },
    {
        id: 5,
        name: "charmeleon",
        type: "fire",
        region: "kanto",
        height: "1.1 m",
        weight: "19.0 kg",
        abilities: "blaze, solar power",
        description: "It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws. The evolved form of kanto's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
    },
    {
        id: 8,
        name: "wartortle",
        type: "water",
        region: "kanto",
        height: "1.0 m",
        weight: "22.5 kg",
        abilities: "torrent, rain dish",
        description: "It is recognized as a symbol of longevity. If its shell has algae on it, that wartortle is very old. The evolved form of kanto's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"
    },
    {
        id: 26,
        name: "raichu",
        type: "electric",
        region: "kanto",
        height: "0.8 m",
        weight: "30.0 kg",
        abilities: "static, lightning rod",
        description: "If the electrical sacs become excessively charged, raichu plants its tail in the ground and discharges. The evolved form of pikachu in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png"
    },
    {
        id: 59,
        name: "arcanine",
        type: "fire",
        region: "kanto",
        height: "1.9 m",
        weight: "155.0 kg",
        abilities: "intimidate, flash fire",
        description: "A pokemon that has been admired since the past for its beauty. It runs agilely as if on wings. Found in kanto's route 7 and pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png"
    },
    {
        id: 94,
        name: "gengar",
        type: "ghost/poison",
        region: "kanto",
        height: "1.5 m",
        weight: "40.5 kg",
        abilities: "levitate",
        description: "On the night of a full moon, if shadows move on their own and laugh, it must be gengar's doing. The final evolution of gastly in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
    },
    {
        id: 130,
        name: "gyarados",
        type: "water/flying",
        region: "kanto",
        height: "6.5 m",
        weight: "235.0 kg",
        abilities: "intimidate, moxie",
        description: "Once it begins to rampage, a gyarados will burn everything down, even in a harsh storm. Found in kanto's lakes and seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png"
    },
    
    // Additional Johto Pokemon
    {
        id: 153,
        name: "bayleef",
        type: "grass",
        region: "johto",
        height: "1.2 m",
        weight: "15.8 kg",
        abilities: "overgrow, leaf guard",
        description: "A spicy aroma emanates from around its neck. The aroma acts as a stimulant to restore health. The evolved form of johto's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/153.png"
    },
    {
        id: 156,
        name: "quilava",
        type: "fire",
        region: "johto",
        height: "0.9 m",
        weight: "19.0 kg",
        abilities: "blaze, flash fire",
        description: "This pokemon is fully covered by nonflammable fur. It can withstand any kind of fire attack. The evolved form of johto's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png"
    },
    {
        id: 159,
        name: "croconaw",
        type: "water",
        region: "johto",
        height: "1.1 m",
        weight: "25.0 kg",
        abilities: "torrent, sheer force",
        description: "Once it bites down, it won't let go until it loses its fangs. New fangs quickly grow into place. The evolved form of johto's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/159.png"
    },
    {
        id: 169,
        name: "crobat",
        type: "poison/flying",
        region: "johto",
        height: "1.8 m",
        weight: "75.0 kg",
        abilities: "inner focus, infiltrator",
        description: "It flies so silently through the dark on its four wings that it may not be noticed even when nearby. The final evolution of zubat in johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/169.png"
    },
    {
        id: 248,
        name: "tyranitar",
        type: "rock/dark",
        region: "johto",
        height: "2.0 m",
        weight: "202.0 kg",
        abilities: "sand stream, unnerve",
        description: "Its body can't be harmed by any sort of attack, so it is very eager to make challenges against enemies. The pseudo-legendary of johto region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png"
    },
    
    // Additional Hoenn Pokemon
    {
        id: 254,
        name: "sceptile",
        type: "grass",
        region: "hoenn",
        height: "1.7 m",
        weight: "52.2 kg",
        abilities: "overgrow, unburden",
        description: "The leaves that grow on its arms can slice down thick trees. It is a master of close-quarters combat. The final evolution of hoenn's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/254.png"
    },
    {
        id: 257,
        name: "blaziken",
        type: "fire/fighting",
        region: "hoenn",
        height: "1.9 m",
        weight: "52.0 kg",
        abilities: "blaze, speed boost",
        description: "In battle, blaziken blows out intense flames from its wrists and attacks foes courageously. The final evolution of hoenn's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png"
    },
    {
        id: 260,
        name: "swampert",
        type: "water/ground",
        region: "hoenn",
        height: "1.5 m",
        weight: "81.9 kg",
        abilities: "torrent, damp",
        description: "Swampert is very strong. It has enough power to easily drag a boulder weighing more than a ton. The final evolution of hoenn's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/260.png"
    },
    {
        id: 282,
        name: "gardevoir",
        type: "psychic/fairy",
        region: "hoenn",
        height: "1.6 m",
        weight: "48.4 kg",
        abilities: "synchronize, trace",
        description: "Gardevoir has the psychokinetic power to distort the dimensions and create a small black hole. Found throughout hoenn region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png"
    },
    {
        id: 373,
        name: "salamence",
        type: "dragon/flying",
        region: "hoenn",
        height: "1.5 m",
        weight: "102.6 kg",
        abilities: "intimidate, moxie",
        description: "By evolving into salamence, this pokemon finally realizes its long-held dream of growing wings. The pseudo-legendary of hoenn region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/373.png"
    },
    
    // Additional Sinnoh Pokemon
    {
        id: 389,
        name: "torterra",
        type: "grass/ground",
        region: "sinnoh",
        height: "2.2 m",
        weight: "310.0 kg",
        abilities: "overgrow, shell armor",
        description: "Ancient people imagined that beneath the ground, a gigantic torterra dwelled. The final evolution of sinnoh's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/389.png"
    },
    {
        id: 392,
        name: "infernape",
        type: "fire/fighting",
        region: "sinnoh",
        height: "1.2 m",
        weight: "55.0 kg",
        abilities: "blaze, iron fist",
        description: "It uses a special kind of martial arts involving all its limbs. Its fire never goes out. The final evolution of sinnoh's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/392.png"
    },
    {
        id: 395,
        name: "empoleon",
        type: "water/steel",
        region: "sinnoh",
        height: "1.7 m",
        weight: "84.5 kg",
        abilities: "torrent, defiant",
        description: "The three horns that extend from its beak attest to its power. The leader has the biggest horns. The final evolution of sinnoh's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/395.png"
    },
    {
        id: 445,
        name: "garchomp",
        type: "dragon/ground",
        region: "sinnoh",
        height: "1.9 m",
        weight: "95.0 kg",
        abilities: "sand veil, rough skin",
        description: "When it folds up its body and extends its wings, it looks like a jet plane. It flies at sonic speed. The pseudo-legendary of sinnoh region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png"
    },
    {
        id: 484,
        name: "palkia",
        type: "water/dragon",
        region: "sinnoh",
        height: "4.2 m",
        weight: "336.0 kg",
        abilities: "pressure, telepathy",
        description: "It is said to live in a gap in the spatial dimension parallel to ours. The legendary pokemon of space from sinnoh's spear pillar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/484.png"
    },
    
    // Additional Unova Pokemon
    {
        id: 497,
        name: "serperior",
        type: "grass",
        region: "unova",
        height: "3.3 m",
        weight: "63.0 kg",
        abilities: "overgrow, contrary",
        description: "It can stop its opponents' movements with just a glare. It takes in solar energy and boosts it internally. The final evolution of unova's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/497.png"
    },
    {
        id: 500,
        name: "emboar",
        type: "fire/fighting",
        region: "unova",
        height: "1.6 m",
        weight: "150.0 kg",
        abilities: "blaze, reckless",
        description: "It can throw a fire punch by setting its fists on fire with its fiery chin. It cares deeply about its friends. The final evolution of unova's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png"
    },
    {
        id: 503,
        name: "samurott",
        type: "water",
        region: "unova",
        height: "1.5 m",
        weight: "94.6 kg",
        abilities: "torrent, shell armor",
        description: "One swing of the sword incorporated in its armor can fell an opponent. A simple glare from one of them quiets everybody. The final evolution of unova's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/503.png"
    },
    {
        id: 644,
        name: "zekrom",
        type: "dragon/electric",
        region: "unova",
        height: "2.9 m",
        weight: "345.0 kg",
        abilities: "teravolt",
        description: "This legendary pokemon can scorch the world with lightning. It joins those who want to create an ideal world. The legendary pokemon of ideals from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/644.png"
    },
    
    // Additional Kalos Pokemon
    {
        id: 652,
        name: "chesnaught",
        type: "grass/fighting",
        region: "kalos",
        height: "1.6 m",
        weight: "90.0 kg",
        abilities: "overgrow, bulletproof",
        description: "Its Tackle is forceful enough to flip a 50-ton tank. It shields its allies from danger with its own body. The final evolution of kalos's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/652.png"
    },
    {
        id: 655,
        name: "delphox",
        type: "fire/psychic",
        region: "kalos",
        height: "1.5 m",
        weight: "39.0 kg",
        abilities: "blaze, magician",
        description: "It gazes into the flame at the tip of its branch to achieve a focused state, which allows it to see the future. The final evolution of kalos's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/655.png"
    },
    {
        id: 658,
        name: "greninja",
        type: "water/dark",
        region: "kalos",
        height: "1.5 m",
        weight: "40.0 kg",
        abilities: "torrent, protean",
        description: "It creates throwing stars out of compressed water. When it spins them and throws them at high speed, these stars can split metal in two. The final evolution of kalos's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png"
    },
    {
        id: 717,
        name: "yveltal",
        type: "dark/flying",
        region: "kalos",
        height: "5.8 m",
        weight: "203.0 kg",
        abilities: "dark aura",
        description: "When this legendary pokemon's wings and tail feathers spread wide and glow red, it absorbs the life force of living creatures. The legendary pokemon of destruction from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/717.png"
    },
    
    // Additional Alola Pokemon
    {
        id: 724,
        name: "decidueye",
        type: "grass/ghost",
        region: "alola",
        height: "1.6 m",
        weight: "36.6 kg",
        abilities: "overgrow, long reach",
        description: "It fires arrow quills from its wings with such precision, they can pierce a pebble at distances over a hundred yards. The final evolution of alola's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/724.png"
    },
    {
        id: 727,
        name: "incineroar",
        type: "fire/dark",
        region: "alola",
        height: "1.8 m",
        weight: "83.0 kg",
        abilities: "blaze, intimidate",
        description: "This pokemon has a violent, selfish disposition. If it's not in the mood to listen, it will ignore its trainer's orders with complete impunity. The final evolution of alola's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/727.png"
    },
    {
        id: 730,
        name: "primarina",
        type: "water/fairy",
        region: "alola",
        height: "1.8 m",
        weight: "44.0 kg",
        abilities: "torrent, liquid voice",
        description: "It controls its water balloons with song. The melody is learned from others of its kind and is passed down from one generation to the next. The final evolution of alola's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/730.png"
    },
    {
        id: 791,
        name: "solgaleo",
        type: "psychic/steel",
        region: "alola",
        height: "3.4 m",
        weight: "230.0 kg",
        abilities: "full metal body",
        description: "It is said to live in another world. The intense light it radiates from the surface of its body can make the darkest of nights light up like midday. The legendary pokemon of the sun from alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/791.png"
    },
    
    // Additional Galar Pokemon
    {
        id: 812,
        name: "thwackey",
        type: "grass",
        region: "galar",
        height: "0.7 m",
        weight: "14.0 kg",
        abilities: "overgrow, grassy surge",
        description: "The faster a thwackey can beat out a rhythm with its two sticks, the more respect it wins from its peers. The evolved form of galar's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/812.png"
    },
    {
        id: 815,
        name: "raboot",
        type: "fire",
        region: "galar",
        height: "0.6 m",
        weight: "9.0 kg",
        abilities: "blaze, libero",
        description: "Its thick and fluffy fur protects it from the cold and enables it to use hotter fire moves. The evolved form of galar's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/815.png"
    },
    {
        id: 818,
        name: "drizzile",
        type: "water",
        region: "galar",
        height: "0.7 m",
        weight: "11.5 kg",
        abilities: "torrent, sniper",
        description: "A clever combatant, this pokemon battles using water balloons created with moisture secreted from its palms. The evolved form of galar's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/818.png"
    },
    {
        id: 889,
        name: "zamazenta",
        type: "fighting",
        region: "galar",
        height: "2.9 m",
        weight: "210.0 kg",
        abilities: "dauntless shield",
        description: "Now that it's equipped with its shield, it can shrug off any attack and counter with a force that will shatter the opponent's will to fight. The legendary pokemon of galar's slumbering weald.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/889.png"
    },
    
    // More Kanto Pokemon
    {
        id: 12,
        name: "butterfree",
        type: "bug/flying",
        region: "kanto",
        height: "1.1 m",
        weight: "32.0 kg",
        abilities: "compound eyes, tinted lens",
        description: "In battle, it flaps its wings at high speed to release highly toxic dust into the air. Found throughout kanto's forests and routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png"
    },
    {
        id: 15,
        name: "beedrill",
        type: "bug/poison",
        region: "kanto",
        height: "1.0 m",
        weight: "29.5 kg",
        abilities: "swarm, sniper",
        description: "It has three poisonous stingers on its forelegs and its tail. They are used to jab its enemy repeatedly. Found in kanto's viridian forest.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png"
    },
    {
        id: 18,
        name: "pidgeot",
        type: "normal/flying",
        region: "kanto",
        height: "1.5 m",
        weight: "39.5 kg",
        abilities: "keen eye, tangled feet",
        description: "This pokemon flies at mach 2 speed, seeking prey. Its large talons are feared as wicked weapons. The final evolution of kanto's common bird pokemon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png"
    },
    {
        id: 31,
        name: "nidoqueen",
        type: "poison/ground",
        region: "kanto",
        height: "1.3 m",
        weight: "60.0 kg",
        abilities: "poison point, rivalry",
        description: "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves. The evolved form of nidorina in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png"
    },
    {
        id: 34,
        name: "nidoking",
        type: "poison/ground",
        region: "kanto",
        height: "1.4 m",
        weight: "62.0 kg",
        abilities: "poison point, rivalry",
        description: "It uses its powerful tail in battle to smash, constrict, then break the prey's bones. The evolved form of nidorino in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png"
    },
    {
        id: 36,
        name: "clefable",
        type: "fairy",
        region: "kanto",
        height: "1.3 m",
        weight: "40.0 kg",
        abilities: "cute charm, magic guard",
        description: "A timid fairy pokemon that is rarely seen by people. Some believe that it only appears to a person who is pure of heart. Found in kanto's mt. moon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png"
    },
    {
        id: 38,
        name: "ninetales",
        type: "fire",
        region: "kanto",
        height: "1.1 m",
        weight: "19.9 kg",
        abilities: "flash fire, drought",
        description: "It is said to live 1,000 years, and each of its tails is loaded with supernatural powers. The evolved form of vulpix in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png"
    },
    {
        id: 40,
        name: "wigglytuff",
        type: "normal/fairy",
        region: "kanto",
        height: "1.0 m",
        weight: "12.0 kg",
        abilities: "cute charm, competitive",
        description: "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size. The evolved form of jigglypuff in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png"
    },
    {
        id: 45,
        name: "vileplume",
        type: "grass/poison",
        region: "kanto",
        height: "1.2 m",
        weight: "18.6 kg",
        abilities: "chlorophyll, effect spore",
        description: "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up. The evolved form of gloom in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/45.png"
    },
    {
        id: 47,
        name: "parasect",
        type: "bug/grass",
        region: "kanto",
        height: "1.0 m",
        weight: "29.5 kg",
        abilities: "effect spore, dry skin",
        description: "A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places. Found in kanto's forests.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/47.png"
    },
    {
        id: 49,
        name: "venomoth",
        type: "bug/poison",
        region: "kanto",
        height: "1.5 m",
        weight: "12.5 kg",
        abilities: "shield dust, tinted lens",
        description: "The dust-like scales covering its wings are color coded to indicate the kinds of poison it has. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png"
    },
    {
        id: 51,
        name: "dugtrio",
        type: "ground",
        region: "kanto",
        height: "0.7 m",
        weight: "33.3 kg",
        abilities: "sand veil, arena trap",
        description: "A team of diglett triplets. It triggers huge earthquakes by burrowing 60 miles underground. Found in kanto's diglett's cave.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/51.png"
    },
    {
        id: 55,
        name: "golduck",
        type: "water",
        region: "kanto",
        height: "1.7 m",
        weight: "76.6 kg",
        abilities: "damp, cloud nine",
        description: "Often seen swimming elegantly by lake shores. It is often mistaken for the japanese monster, kappa. The evolved form of psyduck in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png"
    },
    {
        id: 57,
        name: "primeape",
        type: "fighting",
        region: "kanto",
        height: "1.0 m",
        weight: "32.0 kg",
        abilities: "vital spirit, anger point",
        description: "It stops being angry only when nobody else is around. To view this moment is very difficult. The evolved form of mankey in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/57.png"
    },
    {
        id: 62,
        name: "poliwrath",
        type: "water/fighting",
        region: "kanto",
        height: "1.3 m",
        weight: "54.0 kg",
        abilities: "water absorb, damp",
        description: "An adept swimmer at both the front crawl and breast stroke. Easily overtakes the best human swimmers. The final evolution of poliwag in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png"
    },
    {
        id: 65,
        name: "alakazam",
        type: "psychic",
        region: "kanto",
        height: "1.5 m",
        weight: "48.0 kg",
        abilities: "synchronize, inner focus",
        description: "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000. The final evolution of abra in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png"
    },
    {
        id: 68,
        name: "machamp",
        type: "fighting",
        region: "kanto",
        height: "1.6 m",
        weight: "130.0 kg",
        abilities: "guts, no guard",
        description: "Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon. The final evolution of machop in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png"
    },
    {
        id: 71,
        name: "victreebel",
        type: "grass/poison",
        region: "kanto",
        height: "1.7 m",
        weight: "15.5 kg",
        abilities: "chlorophyll, gluttony",
        description: "Said to live in huge colonies deep in jungles, although no one has ever returned from there. The final evolution of bellsprout in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/71.png"
    },
    {
        id: 73,
        name: "tentacruel",
        type: "water/poison",
        region: "kanto",
        height: "1.6 m",
        weight: "55.0 kg",
        abilities: "clear body, liquid ooze",
        description: "The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey. The evolved form of tentacool in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/73.png"
    },
    {
        id: 76,
        name: "golem",
        type: "rock/ground",
        region: "kanto",
        height: "1.4 m",
        weight: "300.0 kg",
        abilities: "rock head, sturdy",
        description: "Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without damage. The final evolution of geodude in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/76.png"
    },
    {
        id: 78,
        name: "rapidash",
        type: "fire",
        region: "kanto",
        height: "1.7 m",
        weight: "95.0 kg",
        abilities: "run away, flash fire",
        description: "Very competitive, this pokemon will chase anything that moves fast in the hopes of racing it. The evolved form of ponyta in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png"
    },
    {
        id: 80,
        name: "slowbro",
        type: "water/psychic",
        region: "kanto",
        height: "1.6 m",
        weight: "78.5 kg",
        abilities: "oblivious, own tempo",
        description: "The slowpoke tail has fallen off. It seems the slowbro will swim for a while to eat fish. Found in kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png"
    },
    {
        id: 82,
        name: "magneton",
        type: "electric/steel",
        region: "kanto",
        height: "1.0 m",
        weight: "60.0 kg",
        abilities: "magnet pull, sturdy",
        description: "Formed by several magnemite linked together. They frequently appear when sunspots flare up. The evolved form of magnemite in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png"
    },
    {
        id: 85,
        name: "dodrio",
        type: "normal/flying",
        region: "kanto",
        height: "1.8 m",
        weight: "85.2 kg",
        abilities: "run away, early bird",
        description: "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake. The evolved form of doduo in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/85.png"
    },
    {
        id: 87,
        name: "dewgong",
        type: "water/ice",
        region: "kanto",
        height: "1.7 m",
        weight: "120.0 kg",
        abilities: "thick fat, hydration",
        description: "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters. The evolved form of seel in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png"
    },
    {
        id: 89,
        name: "muk",
        type: "poison",
        region: "kanto",
        height: "1.2 m",
        weight: "30.0 kg",
        abilities: "stench, sticky hold",
        description: "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison. The evolved form of grimer in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png"
    },
    {
        id: 91,
        name: "cloyster",
        type: "water/ice",
        region: "kanto",
        height: "1.5 m",
        weight: "132.5 kg",
        abilities: "shell armor, skill link",
        description: "When attacked, it launches its horns in quick volleys. Its innards have never been seen. The evolved form of shellder in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png"
    },
    {
        id: 95,
        name: "onix",
        type: "rock/ground",
        region: "kanto",
        height: "8.8 m",
        weight: "210.0 kg",
        abilities: "rock head, sturdy",
        description: "As it grows, the stone portions of its body harden to become similar to a diamond, but colored black. Found in kanto's rock tunnel.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png"
    },
    {
        id: 97,
        name: "hypno",
        type: "psychic",
        region: "kanto",
        height: "1.6 m",
        weight: "75.6 kg",
        abilities: "insomnia, forewarn",
        description: "When it locks eyes with an enemy, it will use a mix of psi moves such as hypnosis and confusion. The evolved form of drowzee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png"
    },
    {
        id: 99,
        name: "kingler",
        type: "water",
        region: "kanto",
        height: "1.3 m",
        weight: "60.0 kg",
        abilities: "hyper cutter, shell armor",
        description: "The large and hard pincer has 10,000-horsepower strength. However, being so big, it is unwieldy to move. The evolved form of krabby in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/99.png"
    },
    {
        id: 101,
        name: "electrode",
        type: "electric",
        region: "kanto",
        height: "1.2 m",
        weight: "66.6 kg",
        abilities: "soundproof, static",
        description: "It stores electric energy under very high pressure. It often explodes with little or no provocation. The evolved form of voltorb in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/101.png"
    },
    {
        id: 103,
        name: "exeggutor",
        type: "grass/psychic",
        region: "kanto",
        height: "2.0 m",
        weight: "120.0 kg",
        abilities: "chlorophyll, harvest",
        description: "Legend has it that on rare occasions, one of its heads will drop off and continue on as an exeggcute. The evolved form of exeggcute in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/103.png"
    },
    {
        id: 105,
        name: "marowak",
        type: "ground",
        region: "kanto",
        height: "1.0 m",
        weight: "45.0 kg",
        abilities: "rock head, lightning rod",
        description: "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets. The evolved form of cubone in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png"
    },
    {
        id: 107,
        name: "hitmonchan",
        type: "fighting",
        region: "kanto",
        height: "1.4 m",
        weight: "50.2 kg",
        abilities: "keen eye, iron fist",
        description: "While apparently doing nothing, it fires punches in lightning-fast volleys that are impossible to see. One of the hitmon evolution line in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/107.png"
    },
    {
        id: 110,
        name: "weezing",
        type: "poison",
        region: "kanto",
        height: "1.2 m",
        weight: "9.5 kg",
        abilities: "levitate",
        description: "Where two kinds of poison gases meet, 2 koffings can fuse into a weezing over many years. The evolved form of koffing in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png"
    },
    {
        id: 112,
        name: "rhydon",
        type: "ground/rock",
        region: "kanto",
        height: "1.9 m",
        weight: "120.0 kg",
        abilities: "lightning rod, rock head",
        description: "Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees. The evolved form of rhyhorn in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/112.png"
    },
    {
        id: 113,
        name: "chansey",
        type: "normal",
        region: "kanto",
        height: "1.1 m",
        weight: "34.6 kg",
        abilities: "natural cure, serene grace",
        description: "A rare and elusive pokemon that is said to bring happiness to those who manage to get one. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png"
    },
    {
        id: 115,
        name: "kangaskhan",
        type: "normal",
        region: "kanto",
        height: "2.2 m",
        weight: "80.0 kg",
        abilities: "early bird, scrappy",
        description: "The infant rarely ventures out of its mother's protective pouch until it is 3 years old. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png"
    },
    {
        id: 117,
        name: "seadra",
        type: "water",
        region: "kanto",
        height: "1.2 m",
        weight: "25.0 kg",
        abilities: "poison point, sniper",
        description: "Capable of swimming backwards by rapidly flapping its wing-like pectoral fins and stout tail. The evolved form of horsea in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/117.png"
    },
    {
        id: 119,
        name: "seaking",
        type: "water",
        region: "kanto",
        height: "1.3 m",
        weight: "39.0 kg",
        abilities: "swift swim, water vein",
        description: "In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks. The evolved form of goldeen in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/119.png"
    },
    {
        id: 121,
        name: "starmie",
        type: "water/psychic",
        region: "kanto",
        height: "1.1 m",
        weight: "80.0 kg",
        abilities: "illuminate, natural cure",
        description: "Its central core glows with the seven colors of the rainbow. Some people value the core as a gem. The evolved form of staryu in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png"
    },
    {
        id: 122,
        name: "mr. mime",
        type: "psychic/fairy",
        region: "kanto",
        height: "1.3 m",
        weight: "54.5 kg",
        abilities: "soundproof, filter",
        description: "If interrupted while it is miming, it will slap around the offender with its broad hands. Found in kanto's route 2.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png"
    },
    {
        id: 123,
        name: "scyther",
        type: "bug/flying",
        region: "kanto",
        height: "1.5 m",
        weight: "56.0 kg",
        abilities: "swarm, technician",
        description: "With ninja-like agility and speed, it can create the illusion that there is more than one. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png"
    },
    {
        id: 124,
        name: "jynx",
        type: "ice/psychic",
        region: "kanto",
        height: "1.4 m",
        weight: "40.6 kg",
        abilities: "oblivious, forewarn",
        description: "It seductively wiggles its hips as it walks. It can cause people to dance in unison with it. The evolved form of smoochum in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png"
    },
    {
        id: 125,
        name: "electabuzz",
        type: "electric",
        region: "kanto",
        height: "1.1 m",
        weight: "30.0 kg",
        abilities: "static, vital spirit",
        description: "Normally found near power plants, they can wander away and cause major blackouts in cities. The evolved form of elekid in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png"
    },
    {
        id: 126,
        name: "magmar",
        type: "fire",
        region: "kanto",
        height: "1.3 m",
        weight: "44.5 kg",
        abilities: "flame body, vital spirit",
        description: "Its body always burns with an orange glow that enables it to hide perfectly among flames. The evolved form of magby in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png"
    },
    {
        id: 127,
        name: "pinsir",
        type: "bug",
        region: "kanto",
        height: "1.5 m",
        weight: "55.0 kg",
        abilities: "hyper cutter, mold breaker",
        description: "If it fails to crush the victim in its pincers, it will swing it around and toss it hard. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/127.png"
    },
    {
        id: 128,
        name: "tauros",
        type: "normal",
        region: "kanto",
        height: "1.4 m",
        weight: "88.4 kg",
        abilities: "intimidate, anger point",
        description: "When it targets an enemy, it charges furiously while whipping its body with its long tails. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png"
    },
    {
        id: 131,
        name: "lapras",
        type: "water/ice",
        region: "kanto",
        height: "2.5 m",
        weight: "220.0 kg",
        abilities: "water absorb, shell armor",
        description: "A pokemon that has been overhunted almost to extinction. It can ferry people across the water. Found in kanto's silph co.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png"
    },
    {
        id: 132,
        name: "ditto",
        type: "normal",
        region: "kanto",
        height: "0.3 m",
        weight: "4.0 kg",
        abilities: "limber, impostor",
        description: "Capable of copying an enemy's genetic code to instantly transform itself into a duplicate of the enemy. Found in kanto's pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
    },
    {
        id: 134,
        name: "vaporeon",
        type: "water",
        region: "kanto",
        height: "1.0 m",
        weight: "29.0 kg",
        abilities: "water absorb, hydration",
        description: "Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid's. The water evolution of eevee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png"
    },
    {
        id: 135,
        name: "jolteon",
        type: "electric",
        region: "kanto",
        height: "0.8 m",
        weight: "24.5 kg",
        abilities: "volt absorb, quick feet",
        description: "It accumulates negative ions in the atmosphere to blast out 10000-volt lightning bolts. The electric evolution of eevee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png"
    },
    {
        id: 136,
        name: "flareon",
        type: "fire",
        region: "kanto",
        height: "0.9 m",
        weight: "25.0 kg",
        abilities: "flash fire, guts",
        description: "When storing thermal energy in its body, its temperature could soar to over 1600 degrees. The fire evolution of eevee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png"
    },
    {
        id: 137,
        name: "porygon",
        type: "normal",
        region: "kanto",
        height: "0.8 m",
        weight: "36.5 kg",
        abilities: "trace, download",
        description: "A pokemon that consists entirely of programming code. Capable of moving freely in cyberspace. Created in kanto's silph co.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
    },
    {
        id: 139,
        name: "omastar",
        type: "rock/water",
        region: "kanto",
        height: "1.0 m",
        weight: "35.0 kg",
        abilities: "swift swim, shell armor",
        description: "A prehistoric pokemon that died out when its heavy shell made it impossible to catch prey. The evolved form of omanyte in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/139.png"
    },
    {
        id: 141,
        name: "kabutops",
        type: "rock/water",
        region: "kanto",
        height: "1.3 m",
        weight: "40.5 kg",
        abilities: "swift swim, battle armor",
        description: "In the water, it tucks in its limbs and becomes more compact, then it wiggles its shell to swim fast. The evolved form of kabuto in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png"
    },
    {
        id: 142,
        name: "aerodactyl",
        type: "rock/flying",
        region: "kanto",
        height: "1.8 m",
        weight: "59.0 kg",
        abilities: "rock head, pressure",
        description: "A ferocious, prehistoric pokemon that goes for the enemy's throat with its serrated saw-like fangs. Revived from old amber in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/142.png"
    },
    {
        id: 143,
        name: "snorlax",
        type: "normal",
        region: "kanto",
        height: "2.1 m",
        weight: "460.0 kg",
        abilities: "immunity, thick fat",
        description: "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful. Found sleeping in kanto's routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
    },
    {
        id: 144,
        name: "articuno",
        type: "ice/flying",
        region: "kanto",
        height: "1.7 m",
        weight: "55.4 kg",
        abilities: "pressure, snow cloak",
        description: "A legendary bird pokemon that is said to appear to doomed people who are lost in icy mountains. The legendary pokemon of ice from kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png"
    },
    {
        id: 145,
        name: "zapdos",
        type: "electric/flying",
        region: "kanto",
        height: "1.6 m",
        weight: "52.6 kg",
        abilities: "pressure, static",
        description: "A legendary bird pokemon that is said to appear from clouds while dropping enormous lightning bolts. The legendary pokemon of electricity from kanto's power plant.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png"
    },
    {
        id: 146,
        name: "moltres",
        type: "fire/flying",
        region: "kanto",
        height: "2.0 m",
        weight: "60.0 kg",
        abilities: "pressure, flame body",
        description: "Known as the legendary bird of fire. Every flap of its wings creates a dazzling flash of flames. The legendary pokemon of fire from kanto's victory road.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png"
    },
    {
        id: 147,
        name: "dratini",
        type: "dragon",
        region: "kanto",
        height: "1.8 m",
        weight: "3.3 kg",
        abilities: "shed skin, marvel scale",
        description: "Long considered a mythical pokemon until recently when a small colony was found living underwater. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png"
    },
    {
        id: 148,
        name: "dragonair",
        type: "dragon",
        region: "kanto",
        height: "4.0 m",
        weight: "16.5 kg",
        abilities: "shed skin, marvel scale",
        description: "A mystical pokemon that exudes a gentle aura. Has the ability to change climate conditions. The evolved form of dratini in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png"
    },
    
    // Paldea Region (Gen 9)
    {
        id: 906,
        name: "sprigatito",
        type: "grass",
        region: "paldea",
        height: "0.4 m",
        weight: "4.1 kg",
        abilities: "overgrow, protean",
        description: "The capricious, attention-seeking grass cat pokemon. The grass starter of paldea region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png"
    },
    {
        id: 909,
        name: "fuecoco",
        type: "fire",
        region: "paldea",
        height: "0.4 m",
        weight: "9.8 kg",
        abilities: "blaze, unaware",
        description: "This laid-back fire croc pokemon does things at its own pace. The fire starter of paldea region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/909.png"
    },
    {
        id: 912,
        name: "quaxly",
        type: "water",
        region: "paldea",
        height: "0.5 m",
        weight: "6.1 kg",
        abilities: "torrent, moxie",
        description: "This serious-mannered pokemon will follow in its trainer's wake. The water starter of paldea region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/912.png"
    },
    {
        id: 1008,
        name: "miraidon",
        type: "electric/dragon",
        region: "paldea",
        height: "3.5 m",
        weight: "240.0 kg",
        abilities: "hadron engine",
        description: "This pokemon is said to be a relative of cyclizar that looks similar to it but is far more fierce and powerful. The legendary pokemon of paldea.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1008.png"
    },
    
    // Hisui Region (Legends: Arceus)
    {
        id: 900,
        name: "kleavor",
        type: "bug/rock",
        region: "hisui",
        height: "1.8 m",
        weight: "89.0 kg",
        abilities: "swarm, sheer force",
        description: "A violent creature that fells towering trees with its crude axes and shields itself with hard stone. The hisuian evolution of scyther.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/900.png"
    },
    {
        id: 901,
        name: "ursaluna",
        type: "ground/normal",
        region: "hisui",
        height: "2.4 m",
        weight: "290.0 kg",
        abilities: "guts, bulletproof",
        description: "Peat soil that compresses around its body gives it a new form. The hisuian evolution of ursaring.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/901.png"
    },
    {
        id: 902,
        name: "basculegion",
        type: "water/ghost",
        region: "hisui",
        height: "3.0 m",
        weight: "110.0 kg",
        abilities: "swift swim, adaptability",
        description: "Clads itself in the souls of comrades that died before fulfilling their goals of journeying upstream. The hisuian evolution of basculin.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/902.png"
    },
    
    // More Popular Pokemon from Various Regions
    {
        id: 133,
        name: "eevee",
        type: "normal",
        region: "kanto",
        height: "0.3 m",
        weight: "6.5 kg",
        abilities: "run away, adaptability",
        description: "Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones. The evolution pokemon of kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
    },
    {
        id: 129,
        name: "magikarp",
        type: "water",
        region: "kanto",
        height: "0.9 m",
        weight: "10.0 kg",
        abilities: "swift swim, rattled",
        description: "In the distant past, it was somewhat stronger than the horribly weak descendants that exist today. Found in kanto's water routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png"
    },
    {
        id: 143,
        name: "snorlax",
        type: "normal",
        region: "kanto",
        height: "2.1 m",
        weight: "460.0 kg",
        abilities: "immunity, thick fat",
        description: "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful. Found sleeping in kanto's routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
    },
    {
        id: 150,
        name: "mewtwo",
        type: "psychic",
        region: "kanto",
        height: "2.0 m",
        weight: "122.0 kg",
        abilities: "pressure, unnerve",
        description: "Its DNA was almost the same as mew's. However, its size and disposition are vastly different. Created in kanto's cerulean cave.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
    },
    {
        id: 151,
        name: "mew",
        type: "psychic",
        region: "kanto",
        height: "0.4 m",
        weight: "4.0 kg",
        abilities: "synchronize",
        description: "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide. The mythical pokemon of kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png"
    },
    
    // More Johto Favorites
    {
        id: 169,
        name: "crobat",
        type: "poison/flying",
        region: "johto",
        height: "1.8 m",
        weight: "75.0 kg",
        abilities: "inner focus, infiltrator",
        description: "It flies so silently through the dark on its four wings that it may not be noticed even when nearby. The final evolution of zubat in johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/169.png"
    },
    {
        id: 184,
        name: "azumarill",
        type: "water/fairy",
        region: "johto",
        height: "0.8 m",
        weight: "28.5 kg",
        abilities: "thick fat, huge power",
        description: "By keeping still and listening intently, it can tell what is in even wild, fast-moving rivers. The evolved form of marill in johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/184.png"
    },
    {
        id: 212,
        name: "scizor",
        type: "bug/steel",
        region: "johto",
        height: "1.8 m",
        weight: "118.0 kg",
        abilities: "swarm, technician",
        description: "It swings its eye-patterned pincers up to scare its foes. This makes it look like it has three heads. The evolved form of scyther in johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/212.png"
    },
    
    // More Hoenn Favorites
    {
        id: 282,
        name: "gardevoir",
        type: "psychic/fairy",
        region: "hoenn",
        height: "1.6 m",
        weight: "48.4 kg",
        abilities: "synchronize, trace",
        description: "Gardevoir has the psychokinetic power to distort the dimensions and create a small black hole. Found throughout hoenn region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png"
    },
    {
        id: 303,
        name: "mawile",
        type: "steel/fairy",
        region: "hoenn",
        height: "0.6 m",
        weight: "11.5 kg",
        abilities: "hyper cutter, intimidate",
        description: "It has a pair of large jaws formed by horns. These jaws can't be used for eating. Found in hoenn's granite cave.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/303.png"
    },
    {
        id: 350,
        name: "milotic",
        type: "water",
        region: "hoenn",
        height: "6.2 m",
        weight: "162.0 kg",
        abilities: "marvel scale, competitive",
        description: "It is said to be the most beautiful of all the pokemon. It has the ability to calm aggressive feelings. The evolved form of feebas in hoenn.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/350.png"
    },
    
    // More Sinnoh Favorites
    {
        id: 448,
        name: "lucario",
        type: "fighting/steel",
        region: "sinnoh",
        height: "1.2 m",
        weight: "54.0 kg",
        abilities: "steadfast, inner focus",
        description: "It has the ability to sense the auras of all things. It understands human speech. Found in sinnoh's iron island and victory road.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"
    },
    {
        id: 460,
        name: "abomasnow",
        type: "grass/ice",
        region: "sinnoh",
        height: "2.2 m",
        weight: "135.5 kg",
        abilities: "snow warning, soundproof",
        description: "It whips up blizzards in mountains that are always buried in snow. It is the evolved form of snover in sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/460.png"
    },
    {
        id: 467,
        name: "magmortar",
        type: "fire",
        region: "sinnoh",
        height: "1.6 m",
        weight: "68.0 kg",
        abilities: "flame body, vital spirit",
        description: "It blasts fireballs of temperatures over 3,600 degrees fahrenheit from the ends of its arms. The evolved form of magmar in sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/467.png"
    },
    
    // More Unova Favorites
    {
        id: 530,
        name: "excadrill",
        type: "ground/steel",
        region: "unova",
        height: "0.7 m",
        weight: "40.4 kg",
        abilities: "sand rush, sand force",
        description: "It can help in tunnel construction. Its drill has evolved into steel strong enough to bore through iron plates. The evolved form of drilbur in unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/530.png"
    },
    {
        id: 553,
        name: "krookodile",
        type: "ground/dark",
        region: "unova",
        height: "1.5 m",
        weight: "96.3 kg",
        abilities: "intimidate, moxie",
        description: "It can expand the focus of its eyes, enabling it to see objects in the far distance as if it were using binoculars. The final evolution of sandile in unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/553.png"
    },
    {
        id: 571,
        name: "zoroark",
        type: "dark",
        region: "unova",
        height: "1.6 m",
        weight: "81.1 kg",
        abilities: "illusion",
        description: "Bonds between these pokemon are very strong. It protects the safety of its pack by tricking its opponents. The evolved form of zorua in unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png"
    },
    
    // More Kalos Favorites
    {
        id: 658,
        name: "greninja",
        type: "water/dark",
        region: "kalos",
        height: "1.5 m",
        weight: "40.0 kg",
        abilities: "torrent, protean",
        description: "It creates throwing stars out of compressed water. When it spins them and throws them at high speed, these stars can split metal in two. The final evolution of kalos's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png"
    },
    {
        id: 663,
        name: "talonflame",
        type: "fire/flying",
        region: "kalos",
        height: "1.2 m",
        weight: "24.5 kg",
        abilities: "flame body, gale wings",
        description: "In the fever of an exciting battle, it showers embers from the gaps between its feathers and takes to the air. The final evolution of fletchling in kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/663.png"
    },
    {
        id: 681,
        name: "aegislash",
        type: "steel/ghost",
        region: "kalos",
        height: "1.7 m",
        weight: "53.0 kg",
        abilities: "stance change",
        description: "Generations of kings were attended by these pokemon, which used their spectral power to manipulate and control people and pokemon. The evolved form of doublade in kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/681.png"
    },
    
    // More Alola Favorites
    {
        id: 724,
        name: "decidueye",
        type: "grass/ghost",
        region: "alola",
        height: "1.6 m",
        weight: "36.6 kg",
        abilities: "overgrow, long reach",
        description: "It fires arrow quills from its wings with such precision, they can pierce a pebble at distances over a hundred yards. The final evolution of alola's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/724.png"
    },
    {
        id: 727,
        name: "incineroar",
        type: "fire/dark",
        region: "alola",
        height: "1.8 m",
        weight: "83.0 kg",
        abilities: "blaze, intimidate",
        description: "This pokemon has a violent, selfish disposition. If it's not in the mood to listen, it will ignore its trainer's orders with complete impunity. The final evolution of alola's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/727.png"
    },
    {
        id: 730,
        name: "primarina",
        type: "water/fairy",
        region: "alola",
        height: "1.8 m",
        weight: "44.0 kg",
        abilities: "torrent, liquid voice",
        description: "It controls its water balloons with song. The melody is learned from others of its kind and is passed down from one generation to the next. The final evolution of alola's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/730.png"
    },
    
    // More Galar Favorites
    {
        id: 812,
        name: "thwackey",
        type: "grass",
        region: "galar",
        height: "0.7 m",
        weight: "14.0 kg",
        abilities: "overgrow, grassy surge",
        description: "The faster a thwackey can beat out a rhythm with its two sticks, the more respect it wins from its peers. The evolved form of galar's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/812.png"
    },
    {
        id: 815,
        name: "raboot",
        type: "fire",
        region: "galar",
        height: "0.6 m",
        weight: "9.0 kg",
        abilities: "blaze, libero",
        description: "Its thick and fluffy fur protects it from the cold and enables it to use hotter fire moves. The evolved form of galar's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/815.png"
    },
    {
        id: 818,
        name: "drizzile",
        type: "water",
        region: "galar",
        height: "0.7 m",
        weight: "11.5 kg",
        abilities: "torrent, sniper",
        description: "A clever combatant, this pokemon battles using water balloons created with moisture secreted from its palms. The evolved form of galar's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/818.png"
    },
    
    // Mythical and Special Pokemon
    {
        id: 385,
        name: "jirachi",
        type: "steel/psychic",
        region: "hoenn",
        height: "0.3 m",
        weight: "1.1 kg",
        abilities: "serene grace",
        description: "Jirachi will awaken from its sleep of a thousand years if you sing to it in a voice of purity. The mythical pokemon of hoenn.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/385.png"
    },
    {
        id: 386,
        name: "deoxys",
        type: "psychic",
        region: "hoenn",
        height: "1.7 m",
        weight: "60.8 kg",
        abilities: "pressure",
        description: "The DNA of a space virus underwent a sudden mutation upon exposure to a laser beam and resulted in deoxys. The mythical pokemon of hoenn.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/386.png"
    },
    {
        id: 493,
        name: "arceus",
        type: "normal",
        region: "sinnoh",
        height: "3.2 m",
        weight: "320.0 kg",
        abilities: "multitype",
        description: "It is described in mythology as the pokemon that shaped the universe with its 1,000 arms. The mythical pokemon of sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png"
    },
    {
        id: 649,
        name: "genesect",
        type: "bug/steel",
        region: "unova",
        height: "1.5 m",
        weight: "82.5 kg",
        abilities: "download",
        description: "Over 300 million years ago, it was feared as the strongest of hunters. It has been modified by team plasma. The mythical pokemon of unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/649.png"
    },
    {
        id: 720,
        name: "hoopa",
        type: "psychic/ghost",
        region: "kalos",
        height: "0.5 m",
        weight: "9.0 kg",
        abilities: "magician",
        description: "This troublemaker sends anything and everything to faraway places using its loop, which can warp space. The mythical pokemon of kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/720.png"
    },
    {
        id: 801,
        name: "magearna",
        type: "steel/fairy",
        region: "alola",
        height: "1.0 m",
        weight: "80.5 kg",
        abilities: "soul-heart",
        description: "This artificial pokemon, constructed more than 500 years ago, can understand human speech but cannot itself speak. The mythical pokemon of alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/801.png"
    },
    {
        id: 890,
        name: "eternatus",
        type: "poison/dragon",
        region: "galar",
        height: "20.0 m",
        weight: "950.0 kg",
        abilities: "pressure",
        description: "The core on its chest absorbs energy emanating from the lands of the galar region. This energy is what appears to drive this pokemon. The legendary pokemon of galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/890.png"
    },
    
    // More Paldea Pokemon
    {
        id: 907,
        name: "floragato",
        type: "grass",
        region: "paldea",
        height: "0.9 m",
        weight: "12.2 kg",
        abilities: "overgrow, protean",
        description: "Its fluffy fur is similar in composition to plants. This pokemon frequently washes its face to keep it from drying out. The evolved form of paldea's grass starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/907.png"
    },
    {
        id: 910,
        name: "crocalor",
        type: "fire",
        region: "paldea",
        height: "1.0 m",
        weight: "30.7 kg",
        abilities: "blaze, unaware",
        description: "The combination of crocalor's fire energy and the salt from its snacks creates a unique type of fire that burns at a low temperature for a long time. The evolved form of paldea's fire starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/910.png"
    },
    {
        id: 913,
        name: "quaxwell",
        type: "water",
        region: "paldea",
        height: "0.7 m",
        weight: "17.9 kg",
        abilities: "torrent, moxie",
        description: "This pokemon is a neat freak. It will only go into dirty water if absolutely necessary, and it always keeps its feathers well-groomed. The evolved form of paldea's water starter.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/913.png"
    },
    {
        id: 1009,
        name: "koraidon",
        type: "fighting/dragon",
        region: "paldea",
        height: "2.5 m",
        weight: "303.0 kg",
        abilities: "orichalcum pulse",
        description: "This pokemon resembles cyclizar but is far more brutal and powerful. Nothing is known about its ecology or other features. The legendary pokemon of paldea.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1009.png"
    },
    
    // More Hisui Pokemon
    {
        id: 903,
        name: "sneasler",
        type: "fighting/poison",
        region: "hisui",
        height: "1.3 m",
        weight: "43.0 kg",
        abilities: "pressure, poison touch",
        description: "It is one of the most dangerous pokemon around, with a mischievous disposition. It climbs precipitous cliffs with its claws and moves about as nimbly as a ninja. The hisuian evolution of sneasel.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/903.png"
    },
    {
        id: 904,
        name: "overqwil",
        type: "dark/poison",
        region: "hisui",
        height: "2.5 m",
        weight: "60.5 kg",
        abilities: "poison point, swift swim",
        description: "Its lancelike spikes and savage temperament have earned it the nickname 'sea fiend.' It slurps up poison to nourish itself. The hisuian evolution of qwilfish.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/904.png"
    },
    {
        id: 905,
        name: "enamorus",
        type: "fairy/flying",
        region: "hisui",
        height: "1.6 m",
        weight: "48.0 kg",
        abilities: "healer, contrary",
        description: "When it flies to this land from across the sea, the bitter winter comes to an end. According to some, it appears in hisui when the land is blessed with good fortune. The legendary pokemon of hisui.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/905.png"
    },
    
    // More Classic Kanto Pokemon
    {
        id: 16,
        name: "pidgey",
        type: "normal/flying",
        region: "kanto",
        height: "0.3 m",
        weight: "1.8 kg",
        abilities: "keen eye, tangled feet",
        description: "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand. Found throughout kanto's routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png"
    },
    {
        id: 19,
        name: "rattata",
        type: "normal",
        region: "kanto",
        height: "0.3 m",
        weight: "3.5 kg",
        abilities: "run away, guts",
        description: "Bites anything when it attacks. Small and very quick, it is a common sight in many places. Found throughout kanto's routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png"
    },
    {
        id: 23,
        name: "ekans",
        type: "poison",
        region: "kanto",
        height: "2.0 m",
        weight: "6.9 kg",
        abilities: "intimidate, shed skin",
        description: "Moves silently and stealthily. Eats the eggs of birds, such as pidgey and spearrow, whole. Found in kanto's route 4 and pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png"
    },
    {
        id: 27,
        name: "sandshrew",
        type: "ground",
        region: "kanto",
        height: "0.6 m",
        weight: "12.0 kg",
        abilities: "sand veil, sand rush",
        description: "Burrows deep underground in arid locations far from water. It only emerges to hunt for food. Found in kanto's route 4 and seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png"
    },
    {
        id: 29,
        name: "nidoran♀",
        type: "poison",
        region: "kanto",
        height: "0.4 m",
        weight: "7.0 kg",
        abilities: "poison point, rivalry",
        description: "Although small, its venomous barbs render this pokemon dangerous. The female has smaller horns. Found in kanto's route 2 and safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png"
    },
    {
        id: 32,
        name: "nidoran♂",
        type: "poison",
        region: "kanto",
        height: "0.5 m",
        weight: "9.0 kg",
        abilities: "poison point, rivalry",
        description: "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom. Found in kanto's route 2 and safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png"
    },
    {
        id: 35,
        name: "clefairy",
        type: "fairy",
        region: "kanto",
        height: "0.6 m",
        weight: "7.5 kg",
        abilities: "cute charm, magic guard",
        description: "Its magical and cute appeal has many admirers. It is rare and found only in certain areas. Found in kanto's mt. moon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png"
    },
    {
        id: 37,
        name: "vulpix",
        type: "fire",
        region: "kanto",
        height: "0.6 m",
        weight: "9.9 kg",
        abilities: "flash fire, drought",
        description: "At the time of birth, it has just one tail. The tail splits from its tip as it grows older. Found in kanto's route 7 and pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
    },
    {
        id: 39,
        name: "jigglypuff",
        type: "normal/fairy",
        region: "kanto",
        height: "0.5 m",
        weight: "5.5 kg",
        abilities: "cute charm, competitive",
        description: "When its huge eyes waver, it sings a mysteriously soothing melody that lulls its enemies to sleep. Found in kanto's route 3 and pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"
    },
    {
        id: 41,
        name: "zubat",
        type: "poison/flying",
        region: "kanto",
        height: "0.8 m",
        weight: "7.5 kg",
        abilities: "inner focus, infiltrator",
        description: "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets. Found in kanto's caves and pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png"
    },
    {
        id: 43,
        name: "oddish",
        type: "grass/poison",
        region: "kanto",
        height: "0.5 m",
        weight: "5.4 kg",
        abilities: "chlorophyll, run away",
        description: "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds. Found in kanto's route 24 and pokemon gardens.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png"
    },
    {
        id: 46,
        name: "paras",
        type: "bug/grass",
        region: "kanto",
        height: "0.3 m",
        weight: "5.4 kg",
        abilities: "effect spore, dry skin",
        description: "Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host. Found in kanto's viridian forest.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/46.png"
    },
    {
        id: 48,
        name: "venonat",
        type: "bug/poison",
        region: "kanto",
        height: "1.0 m",
        weight: "30.0 kg",
        abilities: "compound eyes, tinted lens",
        description: "Lives in the shadows of tall trees where it eats insects. It is attracted by light at night. Found in kanto's viridian forest.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/48.png"
    },
    {
        id: 50,
        name: "diglett",
        type: "ground",
        region: "kanto",
        height: "0.2 m",
        weight: "0.8 kg",
        abilities: "sand veil, arena trap",
        description: "Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground. Found in kanto's diglett's cave.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png"
    },
    {
        id: 52,
        name: "meowth",
        type: "normal",
        region: "kanto",
        height: "0.4 m",
        weight: "4.2 kg",
        abilities: "pickup, technician",
        description: "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change. Found in kanto's route 5 and pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png"
    },
    {
        id: 54,
        name: "psyduck",
        type: "water",
        region: "kanto",
        height: "0.8 m",
        weight: "19.6 kg",
        abilities: "damp, cloud nine",
        description: "Constantly troubled by headaches. It uses psychic powers when its head hurts. Found in kanto's water routes and seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
    },
    {
        id: 56,
        name: "mankey",
        type: "fighting",
        region: "kanto",
        height: "0.5 m",
        weight: "28.0 kg",
        abilities: "vital spirit, anger point",
        description: "Extremely quick to anger. It could be docile one moment then thrashing away the next instant. Found in kanto's route 3 and pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png"
    },
    {
        id: 58,
        name: "growlithe",
        type: "fire",
        region: "kanto",
        height: "0.7 m",
        weight: "19.0 kg",
        abilities: "intimidate, flash fire",
        description: "Very protective of its territory. It will bark and bite to repel intruders from its space. Found in kanto's route 7 and pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png"
    },
    {
        id: 60,
        name: "poliwag",
        type: "water",
        region: "kanto",
        height: "0.6 m",
        weight: "12.4 kg",
        abilities: "water absorb, damp",
        description: "Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand. Found in kanto's water routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/60.png"
    },
    {
        id: 63,
        name: "abra",
        type: "psychic",
        region: "kanto",
        height: "0.9 m",
        weight: "19.5 kg",
        abilities: "synchronize, inner focus",
        description: "Using its ability to read minds, it will identify impending danger and teleport to safety. Found in kanto's route 5 and pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png"
    },
    {
        id: 66,
        name: "machop",
        type: "fighting",
        region: "kanto",
        height: "0.8 m",
        weight: "19.5 kg",
        abilities: "guts, no guard",
        description: "Loves to build its muscles. It trains in all styles of martial arts to become even stronger. Found in kanto's route 3 and pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png"
    },
    {
        id: 69,
        name: "bellsprout",
        type: "grass/poison",
        region: "kanto",
        height: "0.7 m",
        weight: "4.0 kg",
        abilities: "chlorophyll, gluttony",
        description: "A carnivorous pokemon that traps and eats bugs. It uses its root feet to soak up needed moisture. Found in kanto's route 24 and pokemon gardens.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png"
    },
    {
        id: 72,
        name: "tentacool",
        type: "water/poison",
        region: "kanto",
        height: "0.9 m",
        weight: "45.5 kg",
        abilities: "clear body, liquid ooze",
        description: "Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid. Found in kanto's water routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/72.png"
    },
    {
        id: 74,
        name: "geodude",
        type: "rock/ground",
        region: "kanto",
        height: "0.4 m",
        weight: "20.0 kg",
        abilities: "rock head, sturdy",
        description: "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them. Found in kanto's rock tunnel and victory road.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png"
    },
    {
        id: 77,
        name: "ponyta",
        type: "fire",
        region: "kanto",
        height: "1.0 m",
        weight: "30.0 kg",
        abilities: "run away, flash fire",
        description: "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time. Found in kanto's route 17 and pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png"
    },
    {
        id: 79,
        name: "slowpoke",
        type: "water/psychic",
        region: "kanto",
        height: "1.2 m",
        weight: "36.0 kg",
        abilities: "oblivious, own tempo",
        description: "Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack. Found in kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png"
    },
    {
        id: 81,
        name: "magnemite",
        type: "electric/steel",
        region: "kanto",
        height: "0.3 m",
        weight: "6.0 kg",
        abilities: "magnet pull, sturdy",
        description: "Uses anti-gravity to stay suspended. Appears without warning and uses thunder wave and similar moves. Found in kanto's power plant.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png"
    },
    {
        id: 83,
        name: "farfetch'd",
        type: "normal/flying",
        region: "kanto",
        height: "0.8 m",
        weight: "15.0 kg",
        abilities: "keen eye, inner focus",
        description: "The plant stalk it holds is its weapon. The stalk is used like a sword to cut all sorts of things. Found in kanto's route 12 and safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/83.png"
    },
    {
        id: 84,
        name: "doduo",
        type: "normal/flying",
        region: "kanto",
        height: "1.4 m",
        weight: "39.2 kg",
        abilities: "run away, early bird",
        description: "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints. Found in kanto's route 16 and safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/84.png"
    },
    {
        id: 86,
        name: "seel",
        type: "water",
        region: "kanto",
        height: "1.1 m",
        weight: "90.0 kg",
        abilities: "thick fat, hydration",
        description: "The protruding horn on its head is very hard. It is used for bashing through thick ice. Found in kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png"
    },
    {
        id: 88,
        name: "grimer",
        type: "poison",
        region: "kanto",
        height: "0.9 m",
        weight: "30.0 kg",
        abilities: "stench, sticky hold",
        description: "Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories. Found in kanto's pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/88.png"
    },
    {
        id: 90,
        name: "shellder",
        type: "water",
        region: "kanto",
        height: "0.3 m",
        weight: "4.0 kg",
        abilities: "shell armor, skill link",
        description: "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open. Found in kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/90.png"
    },
    {
        id: 92,
        name: "gastly",
        type: "ghost/poison",
        region: "kanto",
        height: "1.3 m",
        weight: "0.1 kg",
        abilities: "levitate",
        description: "Almost invisible, this gaseous pokemon cloaks the target and puts it to sleep without notice. Found in kanto's pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png"
    },
    {
        id: 96,
        name: "drowzee",
        type: "psychic",
        region: "kanto",
        height: "1.0 m",
        weight: "32.4 kg",
        abilities: "insomnia, forewarn",
        description: "Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams. Found in kanto's route 11 and pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/96.png"
    },
    {
        id: 98,
        name: "krabby",
        type: "water",
        region: "kanto",
        height: "0.4 m",
        weight: "6.5 kg",
        abilities: "hyper cutter, shell armor",
        description: "Its pincers are not only powerful weapons but also serve as tools for breaking open hard shells. Found in kanto's route 6 and seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/98.png"
    },
    {
        id: 100,
        name: "voltorb",
        type: "electric",
        region: "kanto",
        height: "0.5 m",
        weight: "10.4 kg",
        abilities: "soundproof, static",
        description: "Usually found in power plants. Easily mistaken for a pokeball, it has zapped many people. Found in kanto's power plant.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png"
    },
    {
        id: 102,
        name: "exeggcute",
        type: "grass/psychic",
        region: "kanto",
        height: "0.4 m",
        weight: "2.5 kg",
        abilities: "chlorophyll, harvest",
        description: "Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/102.png"
    },
    {
        id: 104,
        name: "cubone",
        type: "ground",
        region: "kanto",
        height: "0.4 m",
        weight: "6.5 kg",
        abilities: "rock head, lightning rod",
        description: "Because it never removes its skull helmet, no one has ever seen this pokemon's real face. Found in kanto's pokemon tower.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png"
    },
    {
        id: 106,
        name: "hitmonlee",
        type: "fighting",
        region: "kanto",
        height: "1.5 m",
        weight: "49.8 kg",
        abilities: "limber, reckless",
        description: "When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides. One of the hitmon evolution line in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/106.png"
    },
    {
        id: 108,
        name: "lickitung",
        type: "normal",
        region: "kanto",
        height: "1.2 m",
        weight: "65.5 kg",
        abilities: "own tempo, oblivious",
        description: "Its tongue can be extended like a chameleon's. It leaves a tingling sensation when it licks enemies. Found in kanto's route 18 and safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png"
    },
    {
        id: 109,
        name: "koffing",
        type: "poison",
        region: "kanto",
        height: "0.6 m",
        weight: "1.0 kg",
        abilities: "levitate",
        description: "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning. Found in kanto's pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/109.png"
    },
    {
        id: 111,
        name: "rhyhorn",
        type: "ground/rock",
        region: "kanto",
        height: "1.0 m",
        weight: "115.0 kg",
        abilities: "lightning rod, rock head",
        description: "Its massive bones are 1000 times harder than human bones. It can easily knock a trailer flying. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/111.png"
    },
    {
        id: 114,
        name: "tangela",
        type: "grass",
        region: "kanto",
        height: "1.0 m",
        weight: "35.0 kg",
        abilities: "chlorophyll, leaf guard",
        description: "The whole body is swathed with wide vines that are similar to seaweed. Its vines shake as it walks. Found in kanto's route 21 and safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png"
    },
    {
        id: 116,
        name: "horsea",
        type: "water",
        region: "kanto",
        height: "0.4 m",
        weight: "8.0 kg",
        abilities: "swift swim, sniper",
        description: "Known to shoot down flying bugs with precision blasts of ink from the surface of the water. Found in kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/116.png"
    },
    {
        id: 118,
        name: "goldeen",
        type: "water",
        region: "kanto",
        height: "0.6 m",
        weight: "15.0 kg",
        abilities: "swift swim, water vein",
        description: "Its tail fin billows like an elegant ballroom dress, giving it the nickname of the water queen. Found in kanto's water routes.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png"
    },
    {
        id: 120,
        name: "staryu",
        type: "water",
        region: "kanto",
        height: "0.8 m",
        weight: "34.5 kg",
        abilities: "illuminate, natural cure",
        description: "An enigmatic pokemon that can effortlessly regenerate any appendage it loses in battle. Found in kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/120.png"
    },
    
    // All Eevee Evolutions
    {
        id: 134,
        name: "vaporeon",
        type: "water",
        region: "kanto",
        height: "1.0 m",
        weight: "29.0 kg",
        abilities: "water absorb, hydration",
        description: "Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid's. The water evolution of eevee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png"
    },
    {
        id: 135,
        name: "jolteon",
        type: "electric",
        region: "kanto",
        height: "0.8 m",
        weight: "24.5 kg",
        abilities: "volt absorb, quick feet",
        description: "It accumulates negative ions in the atmosphere to blast out 10000-volt lightning bolts. The electric evolution of eevee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png"
    },
    {
        id: 136,
        name: "flareon",
        type: "fire",
        region: "kanto",
        height: "0.9 m",
        weight: "25.0 kg",
        abilities: "flash fire, guts",
        description: "When storing thermal energy in its body, its temperature could soar to over 1600 degrees. The fire evolution of eevee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png"
    },
    {
        id: 196,
        name: "espeon",
        type: "psychic",
        region: "johto",
        height: "0.9 m",
        weight: "26.5 kg",
        abilities: "synchronize, magic bounce",
        description: "Its fur is so sensitive, it can sense minute shifts in the air and predict the weather. It is a rare evolution of eevee found in johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png"
    },
    {
        id: 197,
        name: "umbreon",
        type: "dark",
        region: "johto",
        height: "1.0 m",
        weight: "27.0 kg",
        abilities: "synchronize, inner focus",
        description: "When agitated, this pokemon protects itself by spraying poisonous sweat from its pores. The dark evolution of eevee, native to johto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png"
    },
    {
        id: 470,
        name: "leafeon",
        type: "grass",
        region: "sinnoh",
        height: "1.0 m",
        weight: "25.5 kg",
        abilities: "leaf guard, chlorophyll",
        description: "Just like a plant, it uses photosynthesis. As a result, it is always enveloped in clear air. The grass evolution of eevee in sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/470.png"
    },
    {
        id: 471,
        name: "glaceon",
        type: "ice",
        region: "sinnoh",
        height: "0.8 m",
        weight: "25.9 kg",
        abilities: "snow cloak, ice body",
        description: "As a protective technique, it can completely freeze its fur to make its hairs stand like needles. The ice evolution of eevee in sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/471.png"
    },
    {
        id: 700,
        name: "sylveon",
        type: "fairy",
        region: "kalos",
        height: "1.0 m",
        weight: "23.5 kg",
        abilities: "cute charm, pixilate",
        description: "It sends a soothing aura from its ribbonlike feelers to calm fights. The fairy evolution of eevee in kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png"
    },
    
    // More Popular Pokemon from Various Regions
    {
        id: 17,
        name: "pidgeotto",
        type: "normal/flying",
        region: "kanto",
        height: "1.1 m",
        weight: "30.0 kg",
        abilities: "keen eye, tangled feet",
        description: "Very protective of its sprawling territorial area. This pokemon will fiercely peck at any intruder. The evolved form of pidgey in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png"
    },
    {
        id: 20,
        name: "raticate",
        type: "normal",
        region: "kanto",
        height: "0.7 m",
        weight: "18.5 kg",
        abilities: "run away, guts",
        description: "It uses its whiskers to maintain its balance. It apparently slows down if they are cut off. The evolved form of rattata in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png"
    },
    {
        id: 22,
        name: "fearow",
        type: "normal/flying",
        region: "kanto",
        height: "1.2 m",
        weight: "38.0 kg",
        abilities: "keen eye, sniper",
        description: "With its huge and magnificent wings, it can keep aloft without ever having to land for rest. The evolved form of spearow in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png"
    },
    {
        id: 24,
        name: "arbok",
        type: "poison",
        region: "kanto",
        height: "3.5 m",
        weight: "65.0 kg",
        abilities: "intimidate, shed skin",
        description: "It is rumored that the ferocious warning markings on its belly differ from area to area. The evolved form of ekans in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png"
    },
    {
        id: 28,
        name: "sandslash",
        type: "ground",
        region: "kanto",
        height: "1.0 m",
        weight: "29.5 kg",
        abilities: "sand veil, sand rush",
        description: "Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape. The evolved form of sandshrew in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png"
    },
    {
        id: 30,
        name: "nidorina",
        type: "poison",
        region: "kanto",
        height: "0.8 m",
        weight: "20.0 kg",
        abilities: "poison point, rivalry",
        description: "The female has a gentle temperament. It emits ultrasonic cries that have the power to befuddle its foes. The evolved form of nidoran♀ in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png"
    },
    {
        id: 33,
        name: "nidorino",
        type: "poison",
        region: "kanto",
        height: "0.9 m",
        weight: "19.5 kg",
        abilities: "poison point, rivalry",
        description: "An aggressive pokemon that is quick to attack. The horn on its head secretes a powerful venom. The evolved form of nidoran♂ in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png"
    },
    {
        id: 42,
        name: "golbat",
        type: "poison/flying",
        region: "kanto",
        height: "1.6 m",
        weight: "55.0 kg",
        abilities: "inner focus, infiltrator",
        description: "Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly. The evolved form of zubat in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/42.png"
    },
    {
        id: 44,
        name: "gloom",
        type: "grass/poison",
        region: "kanto",
        height: "0.8 m",
        weight: "8.6 kg",
        abilities: "chlorophyll, stench",
        description: "The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey. The evolved form of oddish in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/44.png"
    },
    {
        id: 53,
        name: "persian",
        type: "normal",
        region: "kanto",
        height: "1.0 m",
        weight: "32.0 kg",
        abilities: "limber, technician",
        description: "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness. The evolved form of meowth in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/53.png"
    },
    {
        id: 55,
        name: "golduck",
        type: "water",
        region: "kanto",
        height: "1.7 m",
        weight: "76.6 kg",
        abilities: "damp, cloud nine",
        description: "Often seen swimming elegantly by lake shores. It is often mistaken for the japanese monster, kappa. The evolved form of psyduck in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png"
    },
    {
        id: 57,
        name: "primeape",
        type: "fighting",
        region: "kanto",
        height: "1.0 m",
        weight: "32.0 kg",
        abilities: "vital spirit, anger point",
        description: "It stops being angry only when nobody else is around. To view this moment is very difficult. The evolved form of mankey in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/57.png"
    },
    {
        id: 61,
        name: "poliwhirl",
        type: "water",
        region: "kanto",
        height: "1.0 m",
        weight: "20.0 kg",
        abilities: "water absorb, damp",
        description: "Capable of living in or out of water. When out of water, it sweats to keep its body slimy. The evolved form of poliwag in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/61.png"
    },
    {
        id: 64,
        name: "kadabra",
        type: "psychic",
        region: "kanto",
        height: "1.3 m",
        weight: "56.5 kg",
        abilities: "synchronize, inner focus",
        description: "It emits a special alpha wave from its body that induces headaches just by being nearby. The evolved form of abra in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/64.png"
    },
    {
        id: 67,
        name: "machoke",
        type: "fighting",
        region: "kanto",
        height: "1.5 m",
        weight: "70.5 kg",
        abilities: "guts, no guard",
        description: "Its muscular body is so powerful, it must wear a power save belt to be able to regulate its motions. The evolved form of machop in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/67.png"
    },
    {
        id: 70,
        name: "weepinbell",
        type: "grass/poison",
        region: "kanto",
        height: "1.0 m",
        weight: "6.4 kg",
        abilities: "chlorophyll, gluttony",
        description: "It spits out poisonpowder to immobilize the enemy and then finishes it with a spray of acid. The evolved form of bellsprout in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png"
    },
    {
        id: 75,
        name: "graveler",
        type: "rock/ground",
        region: "kanto",
        height: "1.0 m",
        weight: "105.0 kg",
        abilities: "rock head, sturdy",
        description: "Rolls down slopes to move. It rolls over any obstacle without stopping or changing its direction. The evolved form of geodude in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/75.png"
    },
    {
        id: 78,
        name: "rapidash",
        type: "fire",
        region: "kanto",
        height: "1.7 m",
        weight: "95.0 kg",
        abilities: "run away, flash fire",
        description: "Very competitive, this pokemon will chase anything that moves fast in the hopes of racing it. The evolved form of ponyta in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png"
    },
    {
        id: 80,
        name: "slowbro",
        type: "water/psychic",
        region: "kanto",
        height: "1.6 m",
        weight: "78.5 kg",
        abilities: "oblivious, own tempo",
        description: "The slowpoke tail has fallen off. It seems the slowbro will swim for a while to eat fish. Found in kanto's seafoam islands.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png"
    },
    {
        id: 82,
        name: "magneton",
        type: "electric/steel",
        region: "kanto",
        height: "1.0 m",
        weight: "60.0 kg",
        abilities: "magnet pull, sturdy",
        description: "Formed by several magnemite linked together. They frequently appear when sunspots flare up. The evolved form of magnemite in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png"
    },
    {
        id: 85,
        name: "dodrio",
        type: "normal/flying",
        region: "kanto",
        height: "1.8 m",
        weight: "85.2 kg",
        abilities: "run away, early bird",
        description: "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake. The evolved form of doduo in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/85.png"
    },
    {
        id: 87,
        name: "dewgong",
        type: "water/ice",
        region: "kanto",
        height: "1.7 m",
        weight: "120.0 kg",
        abilities: "thick fat, hydration",
        description: "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters. The evolved form of seel in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png"
    },
    {
        id: 89,
        name: "muk",
        type: "poison",
        region: "kanto",
        height: "1.2 m",
        weight: "30.0 kg",
        abilities: "stench, sticky hold",
        description: "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison. The evolved form of grimer in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png"
    },
    {
        id: 91,
        name: "cloyster",
        type: "water/ice",
        region: "kanto",
        height: "1.5 m",
        weight: "132.5 kg",
        abilities: "shell armor, skill link",
        description: "When attacked, it launches its horns in quick volleys. Its innards have never been seen. The evolved form of shellder in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png"
    },
    {
        id: 93,
        name: "haunter",
        type: "ghost/poison",
        region: "kanto",
        height: "1.6 m",
        weight: "0.1 kg",
        abilities: "levitate",
        description: "Because of its ability to slip through block walls, it is said to be from another dimension. The evolved form of gastly in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png"
    },
    {
        id: 97,
        name: "hypno",
        type: "psychic",
        region: "kanto",
        height: "1.6 m",
        weight: "75.6 kg",
        abilities: "insomnia, forewarn",
        description: "When it locks eyes with an enemy, it will use a mix of psi moves such as hypnosis and confusion. The evolved form of drowzee in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png"
    },
    {
        id: 99,
        name: "kingler",
        type: "water",
        region: "kanto",
        height: "1.3 m",
        weight: "60.0 kg",
        abilities: "hyper cutter, shell armor",
        description: "The large and hard pincer has 10,000-horsepower strength. However, being so big, it is unwieldy to move. The evolved form of krabby in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/99.png"
    },
    {
        id: 101,
        name: "electrode",
        type: "electric",
        region: "kanto",
        height: "1.2 m",
        weight: "66.6 kg",
        abilities: "soundproof, static",
        description: "It stores electric energy under very high pressure. It often explodes with little or no provocation. The evolved form of voltorb in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/101.png"
    },
    {
        id: 103,
        name: "exeggutor",
        type: "grass/psychic",
        region: "kanto",
        height: "2.0 m",
        weight: "120.0 kg",
        abilities: "chlorophyll, harvest",
        description: "Legend has it that on rare occasions, one of its heads will drop off and continue on as an exeggcute. The evolved form of exeggcute in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/103.png"
    },
    {
        id: 105,
        name: "marowak",
        type: "ground",
        region: "kanto",
        height: "1.0 m",
        weight: "45.0 kg",
        abilities: "rock head, lightning rod",
        description: "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets. The evolved form of cubone in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png"
    },
    {
        id: 107,
        name: "hitmonchan",
        type: "fighting",
        region: "kanto",
        height: "1.4 m",
        weight: "50.2 kg",
        abilities: "keen eye, iron fist",
        description: "While apparently doing nothing, it fires punches in lightning-fast volleys that are impossible to see. One of the hitmon evolution line in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/107.png"
    },
    {
        id: 110,
        name: "weezing",
        type: "poison",
        region: "kanto",
        height: "1.2 m",
        weight: "9.5 kg",
        abilities: "levitate",
        description: "Where two kinds of poison gases meet, 2 koffings can fuse into a weezing over many years. The evolved form of koffing in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png"
    },
    {
        id: 112,
        name: "rhydon",
        type: "ground/rock",
        region: "kanto",
        height: "1.9 m",
        weight: "120.0 kg",
        abilities: "lightning rod, rock head",
        description: "Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees. The evolved form of rhyhorn in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/112.png"
    },
    {
        id: 113,
        name: "chansey",
        type: "normal",
        region: "kanto",
        height: "1.1 m",
        weight: "34.6 kg",
        abilities: "natural cure, serene grace",
        description: "A rare and elusive pokemon that is said to bring happiness to those who manage to get one. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png"
    },
    {
        id: 115,
        name: "kangaskhan",
        type: "normal",
        region: "kanto",
        height: "2.2 m",
        weight: "80.0 kg",
        abilities: "early bird, scrappy",
        description: "The infant rarely ventures out of its mother's protective pouch until it is 3 years old. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png"
    },
    {
        id: 117,
        name: "seadra",
        type: "water",
        region: "kanto",
        height: "1.2 m",
        weight: "25.0 kg",
        abilities: "poison point, sniper",
        description: "Capable of swimming backwards by rapidly flapping its wing-like pectoral fins and stout tail. The evolved form of horsea in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/117.png"
    },
    {
        id: 119,
        name: "seaking",
        type: "water",
        region: "kanto",
        height: "1.3 m",
        weight: "39.0 kg",
        abilities: "swift swim, water vein",
        description: "In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks. The evolved form of goldeen in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/119.png"
    },
    {
        id: 121,
        name: "starmie",
        type: "water/psychic",
        region: "kanto",
        height: "1.1 m",
        weight: "80.0 kg",
        abilities: "illuminate, natural cure",
        description: "Its central core glows with the seven colors of the rainbow. Some people value the core as a gem. The evolved form of staryu in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png"
    },
    {
        id: 122,
        name: "mr. mime",
        type: "psychic/fairy",
        region: "kanto",
        height: "1.3 m",
        weight: "54.5 kg",
        abilities: "soundproof, filter",
        description: "If interrupted while it is miming, it will slap around the offender with its broad hands. Found in kanto's route 2.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png"
    },
    {
        id: 123,
        name: "scyther",
        type: "bug/flying",
        region: "kanto",
        height: "1.5 m",
        weight: "56.0 kg",
        abilities: "swarm, technician",
        description: "With ninja-like agility and speed, it can create the illusion that there is more than one. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png"
    },
    {
        id: 124,
        name: "jynx",
        type: "ice/psychic",
        region: "kanto",
        height: "1.4 m",
        weight: "40.6 kg",
        abilities: "oblivious, forewarn",
        description: "It seductively wiggles its hips as it walks. It can cause people to dance in unison with it. The evolved form of smoochum in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png"
    },
    {
        id: 125,
        name: "electabuzz",
        type: "electric",
        region: "kanto",
        height: "1.1 m",
        weight: "30.0 kg",
        abilities: "static, vital spirit",
        description: "Normally found near power plants, they can wander away and cause major blackouts in cities. The evolved form of elekid in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png"
    },
    {
        id: 126,
        name: "magmar",
        type: "fire",
        region: "kanto",
        height: "1.3 m",
        weight: "44.5 kg",
        abilities: "flame body, vital spirit",
        description: "Its body always burns with an orange glow that enables it to hide perfectly among flames. The evolved form of magby in kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png"
    },
    {
        id: 127,
        name: "pinsir",
        type: "bug",
        region: "kanto",
        height: "1.5 m",
        weight: "55.0 kg",
        abilities: "hyper cutter, mold breaker",
        description: "If it fails to crush the victim in its pincers, it will swing it around and toss it hard. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/127.png"
    },
    {
        id: 128,
        name: "tauros",
        type: "normal",
        region: "kanto",
        height: "1.4 m",
        weight: "88.4 kg",
        abilities: "intimidate, anger point",
        description: "When it targets an enemy, it charges furiously while whipping its body with its long tails. Found in kanto's safari zone.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png"
    },
    {
        id: 131,
        name: "lapras",
        type: "water/ice",
        region: "kanto",
        height: "2.5 m",
        weight: "220.0 kg",
        abilities: "water absorb, shell armor",
        description: "A pokemon that has been overhunted almost to extinction. It can ferry people across the water. Found in kanto's silph co.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png"
    },
    {
        id: 132,
        name: "ditto",
        type: "normal",
        region: "kanto",
        height: "0.3 m",
        weight: "4.0 kg",
        abilities: "limber, impostor",
        description: "Capable of copying an enemy's genetic code to instantly transform itself into a duplicate of the enemy. Found in kanto's pokemon mansion.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
    },
    {
        id: 2,
        name: "ivysaur",
        type: "grass/poison",
        region: "kanto",
        height: "1.0 m",
        weight: "13.0 kg",
        abilities: "overgrow, chlorophyll",
        description: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs. The evolved form of bulbasaur.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
    },
    {
        id: 5,
        name: "charmeleon",
        type: "fire",
        region: "kanto",
        height: "1.1 m",
        weight: "19.0 kg",
        abilities: "blaze, solar power",
        description: "It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws. The evolved form of charmander.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
    },
    {
        id: 8,
        name: "wartortle",
        type: "water",
        region: "kanto",
        height: "1.0 m",
        weight: "22.5 kg",
        abilities: "torrent, rain dish",
        description: "It is recognized as a symbol of longevity. If its shell has algae on it, that wartortle is very old. The evolved form of squirtle.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"
    },
    {
        id: 10,
        name: "caterpie",
        type: "bug",
        region: "kanto",
        height: "0.3 m",
        weight: "2.9 kg",
        abilities: "shield dust, run away",
        description: "For protection, it releases a horrible stench from the antenna on its head to drive away enemies. Found in kanto's forests.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"
    },
    {
        id: 11,
        name: "metapod",
        type: "bug",
        region: "kanto",
        height: "0.7 m",
        weight: "9.9 kg",
        abilities: "shed skin",
        description: "This pokemon is vulnerable to attack while its shell is soft, exposing its weak and tender body. The evolved form of caterpie.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png"
    },
    {
        id: 12,
        name: "butterfree",
        type: "bug/flying",
        region: "kanto",
        height: "1.1 m",
        weight: "32.0 kg",
        abilities: "compound eyes, tinted lens",
        description: "In battle, it flaps its wings at high speed to release highly toxic dust into the air. The final evolution of caterpie.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png"
    },
    {
        id: 13,
        name: "weedle",
        type: "bug/poison",
        region: "kanto",
        height: "0.3 m",
        weight: "3.2 kg",
        abilities: "shield dust, run away",
        description: "Often found in forests, eating leaves. It has a sharp venomous stinger on its head. Found throughout kanto's wooded areas.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png"
    },
    {
        id: 14,
        name: "kakuna",
        type: "bug/poison",
        region: "kanto",
        height: "0.6 m",
        weight: "10.0 kg",
        abilities: "shed skin",
        description: "Able to move only slightly. When endangered, it may stick out its stinger and poison its enemy. The evolved form of weedle.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png"
    },
    {
        id: 15,
        name: "beedrill",
        type: "bug/poison",
        region: "kanto",
        height: "1.0 m",
        weight: "29.5 kg",
        abilities: "swarm, sniper",
        description: "It has three poisonous stingers on its forelegs and its tail. They are used to jab its enemy repeatedly. The final evolution of weedle.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png"
    },
    {
        id: 16,
        name: "pidgey",
        type: "normal/flying",
        region: "kanto",
        height: "0.3 m",
        weight: "1.8 kg",
        abilities: "keen eye, tangled feet",
        description: "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand. Found throughout kanto.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png"
    },
    {
        id: 17,
        name: "pidgeotto",
        type: "normal/flying",
        region: "kanto",
        height: "1.1 m",
        weight: "30.0 kg",
        abilities: "keen eye, tangled feet",
        description: "Very protective of its sprawling territorial area, this pokemon will fiercely peck at any intruder. The evolved form of pidgey.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png"
    },
    {
        id: 18,
        name: "pidgeot",
        type: "normal/flying",
        region: "kanto",
        height: "1.5 m",
        weight: "39.5 kg",
        abilities: "keen eye, tangled feet",
        description: "When hunting, it skims the surface of water at high speed to pick off unwary prey such as magikarp. The final evolution of pidgey.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png"
    },
    {
        id: 19,
        name: "rattata",
        type: "normal",
        region: "kanto",
        height: "0.3 m",
        weight: "3.5 kg",
        abilities: "run away, guts",
        description: "Bites anything when it attacks. Small and very quick, it is a common sight in many places. Found throughout kanto's urban areas.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png"
    },
    {
        id: 20,
        name: "raticate",
        type: "normal",
        region: "kanto",
        height: "0.7 m",
        weight: "18.5 kg",
        abilities: "run away, guts",
        description: "It uses its whiskers to maintain its balance. It apparently slows down if they are cut off. The evolved form of rattata.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png"
    },
    
    // Sinnoh Region (Gen 4)
    {
        id: 387,
        name: "turtwig",
        type: "grass",
        region: "sinnoh",
        height: "0.4 m",
        weight: "10.2 kg",
        abilities: "overgrow, shell armor",
        description: "Made from soil, the shell on its back hardens when it drinks water. It lives along lakes. The grass starter of sinnoh region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png"
    },
    {
        id: 390,
        name: "chimchar",
        type: "fire",
        region: "sinnoh",
        height: "0.5 m",
        weight: "6.2 kg",
        abilities: "blaze, iron fist",
        description: "It agilely scales sheer cliffs to live atop craggy mountains. Its fire is put out when it sleeps. The fire starter of sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/390.png"
    },
    {
        id: 393,
        name: "piplup",
        type: "water",
        region: "sinnoh",
        height: "0.4 m",
        weight: "5.2 kg",
        abilities: "torrent, defiant",
        description: "Because it is very proud, it hates accepting food from people. Its thick down guards it from cold. The water starter of sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png"
    },
    {
        id: 483,
        name: "dialga",
        type: "steel/dragon",
        region: "sinnoh",
        height: "5.4 m",
        weight: "683.0 kg",
        abilities: "pressure, telepathy",
        description: "A pokemon spoken of in legend. It is said that time began moving when dialga was born. The legendary pokemon of time from sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png"
    },
    {
        id: 484,
        name: "palkia",
        type: "water/dragon",
        region: "sinnoh",
        height: "4.2 m",
        weight: "336.0 kg",
        abilities: "pressure, telepathy",
        description: "It has the ability to distort space. It is described as a deity in sinnoh-region mythology. The legendary pokemon of space from sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/484.png"
    },
    {
        id: 487,
        name: "giratina",
        type: "ghost/dragon",
        region: "sinnoh",
        height: "4.5 m",
        weight: "750.0 kg",
        abilities: "pressure, telepathy",
        description: "A pokemon that is said to live in a world on the reverse side of ours. It appears in an ancient cemetery. The legendary pokemon of antimatter from sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/487.png"
    },
    {
        id: 448,
        name: "lucario",
        type: "fighting/steel",
        region: "sinnoh",
        height: "1.2 m",
        weight: "54.0 kg",
        abilities: "steadfast, inner focus",
        description: "It has the ability to sense the auras of all things. It understands human speech. A popular pokemon from sinnoh known for its aura abilities.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"
    },
    {
        id: 445,
        name: "garchomp",
        type: "dragon/ground",
        region: "sinnoh",
        height: "1.9 m",
        weight: "95.0 kg",
        abilities: "sand veil, rough skin",
        description: "When it folds up its body and extends its wings, it looks like a jet plane. It flies at sonic speed. The final evolution of gible from sinnoh.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png"
    },
    {
        id: 479,
        name: "rotom",
        type: "electric/ghost",
        region: "sinnoh",
        height: "0.3 m",
        weight: "0.3 kg",
        abilities: "levitate",
        description: "Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc. A unique pokemon from sinnoh that can possess appliances.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png"
    },
    {
        id: 421,
        name: "cherrim",
        type: "grass",
        region: "sinnoh",
        height: "0.5 m",
        weight: "9.3 kg",
        abilities: "flower gift",
        description: "During times of strong sunlight, its bud blooms, its petals open fully, and it becomes very active. A cheerful pokemon from sinnoh that blooms in sunlight.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/421.png"
    },
    
    // Unova Region (Gen 5)
    {
        id: 495,
        name: "snivy",
        type: "grass",
        region: "unova",
        height: "0.6 m",
        weight: "8.1 kg",
        abilities: "overgrow, contrary",
        description: "Being exposed to sunlight makes its movements swifter. It uses vines more adeptly than its hands. The grass starter of unova region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png"
    },
    {
        id: 498,
        name: "tepig",
        type: "fire",
        region: "unova",
        height: "0.5 m",
        weight: "9.9 kg",
        abilities: "blaze, thick fat",
        description: "It can deftly dodge its foe's attacks while shooting fireballs from its nose. It roasts berries before it eats them. The fire starter of unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png"
    },
    {
        id: 501,
        name: "oshawott",
        type: "water",
        region: "unova",
        height: "0.5 m",
        weight: "5.9 kg",
        abilities: "torrent, shell armor",
        description: "The scalchop on its stomach isn't just used for battle—it can be used to break open hard berries as well. The water starter of unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png"
    },
    {
        id: 643,
        name: "reshiram",
        type: "dragon/fire",
        region: "unova",
        height: "3.2 m",
        weight: "330.0 kg",
        abilities: "turboblaze",
        description: "This legendary pokemon can scorch the world with fire. It helps those who want to build a world of truth. The legendary pokemon of truth from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/643.png"
    },
    {
        id: 644,
        name: "zekrom",
        type: "dragon/electric",
        region: "unova",
        height: "2.9 m",
        weight: "345.0 kg",
        abilities: "teravolt",
        description: "This legendary pokemon can scorch the world with lightning. It assists those who want to build an ideal world. The legendary pokemon of ideals from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/644.png"
    },
    {
        id: 646,
        name: "kyurem",
        type: "dragon/ice",
        region: "unova",
        height: "3.0 m",
        weight: "325.0 kg",
        abilities: "pressure",
        description: "It generates a powerful, freezing energy inside itself, but its body became frozen when the energy leaked out. The legendary pokemon of balance from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/646.png"
    },
    {
        id: 571,
        name: "zoroark",
        type: "dark",
        region: "unova",
        height: "1.6 m",
        weight: "81.1 kg",
        abilities: "illusion",
        description: "Each has the ability to fool a large group of people simultaneously. They protect their lair with illusory scenery. The final evolution of zorua from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png"
    },
    {
        id: 530,
        name: "excadrill",
        type: "ground/steel",
        region: "unova",
        height: "0.7 m",
        weight: "40.4 kg",
        abilities: "sand rush, sand force",
        description: "It can help in tunnel construction. Its drill has evolved into steel strong enough to bore through iron plates. The final evolution of drilbur from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/530.png"
    },
    {
        id: 542,
        name: "leavanny",
        type: "bug/grass",
        region: "unova",
        height: "1.2 m",
        weight: "20.5 kg",
        abilities: "swarm, chlorophyll",
        description: "Upon finding a small pokemon, it weaves clothing for it from leaves by using the sticky silk secreted from its mouth. The final evolution of sewaddle from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/542.png"
    },
    {
        id: 555,
        name: "darmanitan",
        type: "fire",
        region: "unova",
        height: "1.3 m",
        weight: "92.9 kg",
        abilities: "sheer force, zen mode",
        description: "When one is injured in a fierce battle, it hardens into a stone-like form. Then medita and it will rise again. The final evolution of darumaka from unova.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/555.png"
    },
    
    // Kalos Region (Gen 6)
    {
        id: 650,
        name: "chespin",
        type: "grass",
        region: "kalos",
        height: "0.4 m",
        weight: "9.0 kg",
        abilities: "overgrow, bulletproof",
        description: "The quills on its head are usually soft. When it flexes them, the points become so hard and sharp that they can pierce rock. The grass starter of kalos region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/650.png"
    },
    {
        id: 653,
        name: "fennekin",
        type: "fire",
        region: "kalos",
        height: "0.4 m",
        weight: "9.4 kg",
        abilities: "blaze, magician",
        description: "Eating a twig fills it with energy, and its roomy ears give vent to air hotter than 390 degrees fahrenheit. The fire starter of kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/653.png"
    },
    {
        id: 656,
        name: "froakie",
        type: "water",
        region: "kalos",
        height: "0.3 m",
        weight: "7.0 kg",
        abilities: "torrent, protean",
        description: "It secretes flexible bubbles from its chest and back. The bubbles reduce the damage it would otherwise take when attacked. The water starter of kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png"
    },
    {
        id: 716,
        name: "xerneas",
        type: "fairy",
        region: "kalos",
        height: "3.0 m",
        weight: "215.0 kg",
        abilities: "fairy aura",
        description: "Legends say it can share eternal life. It slept for a thousand years in the form of a tree before its revival. The legendary pokemon of life from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/716.png"
    },
    {
        id: 717,
        name: "yveltal",
        type: "dark/flying",
        region: "kalos",
        height: "5.8 m",
        weight: "203.0 kg",
        abilities: "dark aura",
        description: "When this legendary pokemon's wings and tail feathers spread wide and glow red, it absorbs the life force of living creatures. The legendary pokemon of destruction from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/717.png"
    },
    {
        id: 718,
        name: "zygarde",
        type: "dragon/ground",
        region: "kalos",
        height: "5.0 m",
        weight: "305.0 kg",
        abilities: "aura break, power construct",
        description: "This is zygarde's form when about half of its pieces have been assembled. It plays the role of monitoring the ecosystem. The legendary pokemon of order from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/718.png"
    },
    {
        id: 658,
        name: "greninja",
        type: "water/dark",
        region: "kalos",
        height: "1.5 m",
        weight: "40.0 kg",
        abilities: "torrent, protean",
        description: "It creates throwing stars out of compressed water. When it spins them and throws them at high speed, these stars can split metal in two. The final evolution of froakie from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png"
    },
    {
        id: 681,
        name: "aegislash",
        type: "steel/ghost",
        region: "kalos",
        height: "1.7 m",
        weight: "53.0 kg",
        abilities: "stance change",
        description: "Generations of kings were attended by these pokemon, which used their spectral power to manipulate and control people and pokemon. The final evolution of honedge from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/681.png"
    },
    {
        id: 700,
        name: "sylveon",
        type: "fairy",
        region: "kalos",
        height: "1.0 m",
        weight: "23.5 kg",
        abilities: "cute charm, pixilate",
        description: "It sends a soothing aura from its ribbonlike feelers to calm fights. A fairy-type evolution of eevee discovered in kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png"
    },
    {
        id: 701,
        name: "hawlucha",
        type: "fighting/flying",
        region: "kalos",
        height: "0.8 m",
        weight: "21.5 kg",
        abilities: "limber, unburden",
        description: "Although its body is small, its proficient fighting skills enable it to keep up with big bruisers like machamp and hariyama. A unique fighting pokemon from kalos.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/701.png"
    },
    
    // Alola Region (Gen 7)
    {
        id: 722,
        name: "rowlet",
        type: "grass/flying",
        region: "alola",
        height: "0.3 m",
        weight: "1.5 kg",
        abilities: "overgrow, long reach",
        description: "This wary pokemon uses photosynthesis to sustain itself, so it is always soaking up rays of light with its wings. The grass starter of alola region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png"
    },
    {
        id: 725,
        name: "litten",
        type: "fire",
        region: "alola",
        height: "0.4 m",
        weight: "4.3 kg",
        abilities: "blaze, intimidate",
        description: "While grooming itself, it builds up fur inside its stomach. It sets the fur alight and spews fiery attacks, which change based on how it coughs. The fire starter of alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/725.png"
    },
    {
        id: 728,
        name: "popplio",
        type: "water",
        region: "alola",
        height: "0.4 m",
        weight: "7.5 kg",
        abilities: "torrent, liquid voice",
        description: "This pokemon can control water balloons. It practices diligently so it can learn to make water balloons appear to be dancing. The water starter of alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/728.png"
    },
    {
        id: 791,
        name: "solgaleo",
        type: "psychic/steel",
        region: "alola",
        height: "3.4 m",
        weight: "230.0 kg",
        abilities: "full metal body",
        description: "It is said to live in another world. The intense light it radiates from the surface of its body can make the darkest of nights light up like midday. The legendary pokemon of the sun from alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/791.png"
    },
    {
        id: 792,
        name: "lunala",
        type: "psychic/ghost",
        region: "alola",
        height: "4.0 m",
        weight: "120.0 kg",
        abilities: "shadow shield",
        description: "It is said to be a female evolution of cosmog. When its third eye activates, away it flies to another world. The legendary pokemon of the moon from alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/792.png"
    },
    {
        id: 800,
        name: "necrozma",
        type: "psychic",
        region: "alola",
        height: "2.4 m",
        weight: "230.0 kg",
        abilities: "prism armor",
        description: "Light is apparently the source of its energy. It has an extraordinarily vicious disposition and is constantly firing off laser beams. The legendary pokemon of light from alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/800.png"
    },
    {
        id: 730,
        name: "primarina",
        type: "water/fairy",
        region: "alola",
        height: "1.8 m",
        weight: "44.0 kg",
        abilities: "torrent, liquid voice",
        description: "It controls its water balloons with song. The melody is learned from others of its kind and is passed down from one generation to the next. The final evolution of popplio from alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/730.png"
    },
    {
        id: 778,
        name: "mimikyu",
        type: "ghost/fairy",
        region: "alola",
        height: "0.2 m",
        weight: "0.7 kg",
        abilities: "disguise",
        description: "Its actual appearance is unknown. A scholar who saw what was under its rag was overwhelmed by terror and died from the shock. A mysterious pokemon from alola that disguises itself as pikachu.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/778.png"
    },
    {
        id: 784,
        name: "kommo-o",
        type: "dragon/fighting",
        region: "alola",
        height: "1.6 m",
        weight: "78.2 kg",
        abilities: "bulletproof, soundproof",
        description: "When it spots enemies, it threatens them by jingling the scales on its tail. Weak opponents will crack and flee immediately. The final evolution of jangmo-o from alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/784.png"
    },
    {
        id: 777,
        name: "togedemaru",
        type: "electric/steel",
        region: "alola",
        height: "0.3 m",
        weight: "3.3 kg",
        abilities: "iron barbs, lightning rod",
        description: "The spiny fur on its back is normally at rest. When this pokemon becomes agitated, its fur stands on end and stabs into its attackers. A cute electric pokemon from alola.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/777.png"
    },
    
    // Galar Region (Gen 8)
    {
        id: 810,
        name: "grookey",
        type: "grass",
        region: "galar",
        height: "0.3 m",
        weight: "5.0 kg",
        abilities: "overgrow, grassy surge",
        description: "When it uses its special stick to strike up a beat, the sound waves produced carry revitalizing energy to the plants and flowers in the area. The grass starter of galar region.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png"
    },
    {
        id: 813,
        name: "scorbunny",
        type: "fire",
        region: "galar",
        height: "0.3 m",
        weight: "4.5 kg",
        abilities: "blaze, libero",
        description: "A warm-up of running around gets fire energy coursing through this pokemon's body. Once that happens, it's ready to fight at full power. The fire starter of galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png"
    },
    {
        id: 816,
        name: "sobble",
        type: "water",
        region: "galar",
        height: "0.3 m",
        weight: "4.0 kg",
        abilities: "torrent, sniper",
        description: "When scared, this pokemon cries. Its tears pack the chemical punch of 100 onions, and attackers won't be able to resist weeping. The water starter of galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png"
    },
    {
        id: 890,
        name: "eternatus",
        type: "poison/dragon",
        region: "galar",
        height: "20.0 m",
        weight: "950.0 kg",
        abilities: "pressure",
        description: "The core on its chest absorbs energy emanating from the lands of the galar region. This energy is what allows eternatus to stay active. The legendary pokemon of galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/890.png"
    },
    {
        id: 888,
        name: "zacian",
        type: "fairy",
        region: "galar",
        height: "2.8 m",
        weight: "110.0 kg",
        abilities: "intrepid sword",
        description: "Known as a legendary hero, this pokemon absorbs metal particles, floating in the air and using them as weapons. The legendary pokemon of the sword from galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/888.png"
    },
    {
        id: 889,
        name: "zamazenta",
        type: "fighting",
        region: "galar",
        height: "2.9 m",
        weight: "210.0 kg",
        abilities: "dauntless shield",
        description: "In times past, it worked together with a king of the people to save the galar region. It absorbs metal that it then uses in battle. The legendary pokemon of the shield from galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/889.png"
    },
    {
        id: 818,
        name: "inteleon",
        type: "water",
        region: "galar",
        height: "1.9 m",
        weight: "45.2 kg",
        abilities: "torrent, sniper",
        description: "It creates many small water droplets around its body and then uses light to refract the sunlight through them to create a powerful laser beam. The final evolution of sobble from galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/818.png"
    },
    {
        id: 826,
        name: "orbeetle",
        type: "bug/psychic",
        region: "galar",
        height: "0.4 m",
        weight: "40.8 kg",
        abilities: "swarm, frisk",
        description: "It's famous for its high intelligence, and the large size of its brain is proof that it also possesses immense psychic power. The final evolution of blipbug from galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/826.png"
    },
    {
        id: 839,
        name: "coalossal",
        type: "rock/fire",
        region: "galar",
        height: "2.8 m",
        weight: "310.5 kg",
        abilities: "steam engine, flame body",
        description: "While it's engaged in battle, its mountain of coal will burn bright red, sending off sparks that scorch the surrounding area. The final evolution of rolycoly from galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/839.png"
    },
    {
        id: 851,
        name: "centiskorch",
        type: "fire/bug",
        region: "galar",
        height: "3.0 m",
        weight: "120.0 kg",
        abilities: "flash fire, white smoke",
        description: "While its burning body is already dangerous on its own, this excessively hostile pokemon also has large and very sharp fangs. The final evolution of sizzlipede from galar.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/851.png"
    }
];

// Live Clock Functionality
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Initialize animated background
    animatedBackground = new AnimatedBackground();
    
    // Initialize clock
    updateTime();
    setInterval(updateTime, 1000);
    
    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = savedTheme + '-theme';
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.className.includes('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update body class
        body.className = newTheme + '-theme';
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Add subtle animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-tag, .contact-link');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Typing effect functionality
    function typeWriter(element, text, speed = 100, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let i = 0;
                element.innerHTML = '';
                
                function type() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    } else {
                        resolve();
                    }
                }
                type();
            }, delay);
        });
    }
    
    // Initialize typing effects
    async function initTypingEffects() {
        const typingName = document.getElementById('typingName');
        const typingSubtitle = document.getElementById('typingSubtitle');
        const typingDescription = document.getElementById('typingDescription');
        
        if (typingName && typingSubtitle && typingDescription) {
            const nameText = typingName.textContent;
            const subtitleText = typingSubtitle.textContent;
            const descriptionText = typingDescription.textContent;
            
            // Clear initial text
            typingName.innerHTML = '';
            typingSubtitle.innerHTML = '';
            typingDescription.innerHTML = '';
            
            // Start typing sequence
            await typeWriter(typingName, nameText, 120, 500);
            await typeWriter(typingSubtitle, subtitleText, 80, 200);
            await typeWriter(typingDescription, descriptionText, 60, 300);
        }
    }
    
    // Add parallax effect to hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Photo placeholder functionality
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    if (photoPlaceholder) {
        photoPlaceholder.addEventListener('click', () => {
            // This will be replaced with actual photo upload functionality
            console.log('Photo placeholder clicked - ready for photo upload');
        });
    }
    
    // Start typing effects after a short delay
    setTimeout(() => {
        initTypingEffects();
    }, 1000);
    
    // Rotating subtitle functionality
    const subtitles = [
        "AI Enthusiast & Tech Explorer",
        "Ambitious Student & Curious Learner", 
        "Creative Developer & Avid Problem Solver"
    ];
    
    let currentSubtitleIndex = 0;
    const subtitleElement = document.getElementById('typingSubtitle');
    
    function rotateSubtitle() {
        if (subtitleElement) {
            // Fade out
            subtitleElement.style.opacity = '0';
            subtitleElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                // Change text
                currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
                subtitleElement.textContent = subtitles[currentSubtitleIndex];
                
                // Set color based on current subtitle
                if (subtitles[currentSubtitleIndex] === "Creative Developer & Avid Problem Solver" || 
                    subtitles[currentSubtitleIndex] === "AI Enthusiast & Tech Explorer" ||
                    subtitles[currentSubtitleIndex] === "Ambitious Student & Curious Learner") {
                    subtitleElement.style.color = 'var(--text-primary)';
                } else {
                    subtitleElement.style.color = 'var(--text-muted)';
                }
                
                // Fade in
                subtitleElement.style.opacity = '1';
                subtitleElement.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    // Set initial subtitle color
    if (subtitleElement) {
        subtitleElement.style.color = 'var(--text-primary)';
    }
    
    // Start rotating subtitles after initial typing effect
    setTimeout(() => {
        setInterval(rotateSubtitle, 10000); // Rotate every 10 seconds
    }, 5000); // Start after 5 seconds to allow initial typing effect to complete
    
    // Pokemon Ball Feature
    const pokemonBall = document.getElementById('pokemonBall');
    const pokemonModal = document.getElementById('pokemonModal');
    const modalClose = document.getElementById('modalClose');
    
    function getRandomPokemon() {
        return pokemonData[Math.floor(Math.random() * pokemonData.length)];
    }
    
    function showPokemonModal(pokemon) {
        // Update modal content
        document.getElementById('pokemonName').textContent = pokemon.name;
        document.getElementById('pokemonType').textContent = pokemon.type;
        document.getElementById('pokemonRegion').textContent = pokemon.region;
        document.getElementById('pokemonHeight').textContent = pokemon.height;
        document.getElementById('pokemonWeight').textContent = pokemon.weight;
        document.getElementById('pokemonAbilities').textContent = pokemon.abilities;
        document.getElementById('pokemonDescription').textContent = pokemon.description;
        document.getElementById('pokemonImage').src = pokemon.image;
        
        // Show modal
        pokemonModal.classList.add('active');
        
        // Add capture animation to pokeball
        pokemonBall.style.animation = 'none';
        pokemonBall.offsetHeight; // Trigger reflow
        pokemonBall.style.animation = 'capture 0.5s ease';
    }
    
    function hidePokemonModal() {
        pokemonModal.classList.remove('active');
        
        // Reset pokeball animation
        setTimeout(() => {
            pokemonBall.style.animation = 'float 3s ease-in-out infinite';
        }, 500);
    }
    
    // Event listeners
    if (pokemonBall) {
        pokemonBall.addEventListener('click', () => {
            const randomPokemon = getRandomPokemon();
            showPokemonModal(randomPokemon);
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', hidePokemonModal);
    }
    
    // Close modal when clicking outside
    if (pokemonModal) {
        pokemonModal.addEventListener('click', (e) => {
            if (e.target === pokemonModal) {
                hidePokemonModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pokemonModal.classList.contains('active')) {
            hidePokemonModal();
        }
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--accent-primary) !important;
    }
    
    .nav-links a.active::after {
        width: 100% !important;
    }
    
    /* Loading animation */
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Subtitle rotation animation */
    #typingSubtitle {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);
