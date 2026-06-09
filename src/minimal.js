import Pretext from 'pretext';

const canvas = document.getElementById('text-canvas');
const ctx = canvas.getContext('2d');
const dragonImg = document.getElementById('dragon-cover');

// 1. Setup Canvas Dimensions (Full Screen)
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 2. The Content
const aboutText = `I am a systems engineer focused on infrastructure... (your bio here).`;

// 3. Define the Exclusion Zone (The Dragon)
// In a real implementation, you can map the exact polygon of the dragon.
// For now, we define the bounding box of the image.
function getExclusionZones() {
    const rect = dragonImg.getBoundingClientRect();
    return [
        { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
    ];
}

// 4. The Pretext Render Loop
function renderText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set your editorial font
    ctx.font = "18px 'EB Garamond', serif";
    ctx.fillStyle = "#1C1C1C"; // Charcoal ink

    const exclusions = getExclusionZones();

    // Initialize Pretext to calculate the layout
    const layout = new Pretext.Layout({
        context: ctx,
        text: aboutText,
        x: 50, // Starting X margin
        y: 100, // Starting Y margin
        width: Math.min(canvas.width - 100, 800), // Max text column width
        exclusions: exclusions // Tell Pretext to dodge the dragon
    });

    // Draw the calculated lines
    layout.lines.forEach(line => {
        ctx.fillText(line.text, line.x, line.y);
    });
}

// Wait for the font and image to load before calculating layout
window.onload = () => {
    // A trick to ensure custom fonts are ready before canvas measures them
    document.fonts.ready.then(renderText);
};