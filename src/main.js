import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(6, 3, 5);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Create a projectile object
const projectileGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const projectileMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
scene.add(projectile);

// Variables for user input
let initialVelocity = 10; // Default initial velocity
let launchAngle = 45; // Default launch angle (in degrees)
let gravity = 9.81; // Default gravity value (m/s^2)

// Convert launch angle to radians
const launchAngleRadians = (launchAngle * Math.PI) / 180;

// Calculate initial horizontal and vertical velocity components
let initialVelocityX = initialVelocity * Math.cos(launchAngleRadians);
let initialVelocityY = initialVelocity * Math.sin(launchAngleRadians);

// Set up the animation
const clock = new THREE.Clock();
let elapsedTime = 0;

// Animation loop
function animate() {
    const deltaTime = clock.getDelta();
    elapsedTime += deltaTime;

    // Update the projectile's position based on projectile motion equations
    const x = initialVelocityX * elapsedTime;
    const y = initialVelocityY * elapsedTime - 0.5 * gravity * Math.pow(elapsedTime, 2);

    projectile.position.set(x, y, 0);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

// Function to start or restart the simulation
function startSimulation() {
    // Reset the projectile's position and elapsed time
    elapsedTime = 0;
    projectile.position.set(0, 0, 0);

    // Recalculate initialVelocityX and initialVelocityY
    const launchAngleRadians = (launchAngle * Math.PI) / 180;
    initialVelocityX = initialVelocity * Math.cos(launchAngleRadians);
    initialVelocityY = initialVelocity * Math.sin(launchAngleRadians);

    // Start the animation loop
    animate();
}

// Attach an event listener to the button to start the simulation
document.getElementById('startButton').addEventListener('click', startSimulation);

// Function to update the simulation when user input changes
function updateSimulation() {
    // Update initialVelocity, launchAngle, and gravity here
    initialVelocity = parseFloat(document.getElementById('velocityInput').value);
    launchAngle = parseFloat(document.getElementById('angleInput').value);
    gravity = parseFloat(document.getElementById('gravityInput').value);
}

// Attach event listeners to input fields or sliders
document.getElementById('velocityInput').addEventListener('input', updateSimulation);
document.getElementById('angleInput').addEventListener('input', updateSimulation);
document.getElementById('gravityInput').addEventListener('input', updateSimulation);
