// Global Variables
let camera, scene, renderer;
let player;
let controls;
let orbs = [];
let isGameStarted = false;

// Initialize Three.js
function init() {
    // Set up the scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('world-container').appendChild(renderer.domElement);

    // Add basic lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Set camera position
    camera.position.z = 5;

    // Set up player object (A simple cube for now)
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff69b4 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(player);

    // Add orbs to the scene
    for (let i = 0; i < 5; i++) {
        const orbGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const orbMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        orb.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        orbs.push(orb);
        scene.add(orb);
    }

    // Add the event listener for collecting orbs
    window.addEventListener('keydown', onKeyDown, false);

    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Keydown listener for movement and interactions
function onKeyDown(event) {
    if (!isGameStarted) return;

    if (event.key === 'w') player.position.z -= 0.1;
    if (event.key === 's') player.position.z += 0.1;
    if (event.key === 'a') player.position.x -= 0.1;
    if (event.key === 'd') player.position.x += 0.1;
    if (event.key === 'f') collectOrb();
}

// Collect orb when the player is near
function collectOrb() {
    for (let i = 0; i < orbs.length; i++) {
        if (player.position.distanceTo(orbs[i].position) < 1) {
            orbs[i].position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5); // Reset orb position
            alert('Orb collected!');
            break;
        }
    }
}

// Start the game
document.getElementById('start-game-btn').addEventListener('click', () => {
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('start-game-btn').style.display = 'none';
    init();
    isGameStarted = true;
});

// Start exploring a section (About Me, Projects, Certs)
function startExplore(section) {
    alert(`Exploring: ${section}`);
    document.getElementById('exploration-options').classList.add('hidden');
    // Here you could load new 3D models or change the world based on the section chosen
}
