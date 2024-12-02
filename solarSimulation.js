var body = []; // Array to hold all planets
var n = 9; // Total celestial objects (1 Sun + 8 Planets)
var G = 0.05; // Gravitational constant
var text1 = "Solar System Simulation";
var text2 = "Simulates circular orbits of planets around the Sun";

function setup() {
    var W = windowWidth;
    var H = windowHeight;
    createCanvas(W, H);
    background(0);

    // Sun
    body[0] = new planets(W / 2, H / 2, 30, 1000); // Large mass for the Sun
    body[0].col = "#ffc300"; // Sun color

    // Planets with circular orbits
    const planetData = [
        { name: "Mercury", diameter: 8, color: "gray", orbitRadius: 80, orbitSpeed: 47.87 },
        { name: "Venus", diameter: 10, color: "yellow", orbitRadius: 120, orbitSpeed: 35.02 },
        { name: "Earth", diameter: 12, color: "blue", orbitRadius: 160, orbitSpeed: 29.78 },
        { name: "Mars", diameter: 10, color: "red", orbitRadius: 200, orbitSpeed: 24.07 },
        { name: "Jupiter", diameter: 25, color: "orange", orbitRadius: 300, orbitSpeed: 13.07 },
        { name: "Saturn", diameter: 20, color: "tan", orbitRadius: 350, orbitSpeed: 9.69 },
        { name: "Uranus", diameter: 18, color: "lightblue", orbitRadius: 400, orbitSpeed: 6.81 },
        { name: "Neptune", diameter: 18, color: "blue", orbitRadius: 450, orbitSpeed: 5.43 },
    ];

    planetData.forEach(({ diameter, color, orbitRadius, orbitSpeed }, index) => {
        const planet = new planets(W / 2 + orbitRadius, H / 2, diameter, 0.001); // Initialize at edge of orbit
        planet.col = color;
        planet.orbitRadius = orbitRadius; // Custom property for circular orbit radius
        planet.orbitSpeed = orbitSpeed * 0.001; // Scaled orbital speed
        planet.angle = random(TWO_PI); // Random starting angle
        body.push(planet);
    });
}

function draw() {
    background(0, 0, 0, 40); // Black with transparency for trails

    // Draw Sun
    noStroke();
    fill("#ffc300");
    ellipse(width / 2, height / 2, 40, 40);

    // Display and update planets
    for (let i = 1; i < body.length; i++) {
        let planet = body[i];

        // Update position for circular orbit
        planet.angle += planet.orbitSpeed;
        planet.px = width / 2 + cos(planet.angle) * planet.orbitRadius;
        planet.py = height / 2 + sin(planet.angle) * planet.orbitRadius;

        planet.display(); // Use planets.js display function
    }

    // Add text
    fill(255);
    textSize(20);
    textStyle(ITALIC);
    text(text1, 20, 30);
    textSize(12);
    textStyle(NORMAL);
    text(text2, 20, 50);
}
