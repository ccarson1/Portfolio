



// Select canvas
const canvas = document.querySelector('.webgl-bg');

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
camera.position.z = 5;

// Set up renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, 400);

// Create geometry for particles
const geometry = new THREE.BufferGeometry();
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Load PNG image texture
const textureLoader = new THREE.TextureLoader();
const sprite = textureLoader.load(textureUrl);

// Create material using the PNG texture
const material = new THREE.PointsMaterial({
  size: 0.2,
  map: sprite,
  transparent: true,
  alphaTest: 0.01
});

// Create and add particles to the scene
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / 400;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 400);
});


// // Select canvas
// const canvas = document.querySelector('.webgl-bg');

// // === GAME OF LIFE BACKGROUND ===
// const gameSize = 128;
// const gameCanvas = document.createElement('canvas');
// gameCanvas.width = gameCanvas.height = gameSize;
// const ctx = gameCanvas.getContext('2d');
// let grid = Array(gameSize * gameSize).fill(0).map(() => Math.random() > 0.8 ? 1 : 0);

// // Update grid with Game of Life rules
// function updateGameOfLife() {
//   const next = new Array(grid.length).fill(0);
//   for (let y = 0; y < gameSize; y++) {
//     for (let x = 0; x < gameSize; x++) {
//       let count = 0;
//       for (let j = -1; j <= 1; j++) {
//         for (let i = -1; i <= 1; i++) {
//           if (i === 0 && j === 0) continue;
//           const nx = (x + i + gameSize) % gameSize;
//           const ny = (y + j + gameSize) % gameSize;
//           count += grid[ny * gameSize + nx];
//         }
//       }
//       const index = y * gameSize + x;
//       next[index] = grid[index] ? (count === 2 || count === 3 ? 1 : 0) : (count === 3 ? 1 : 0);
//     }
//   }
//   grid = next;

//   // Draw grid to canvas
//   const imageData = ctx.getImageData(0, 0, gameSize, gameSize);
//   const data = imageData.data;
//   for (let i = 0; i < grid.length; i++) {
//     const val = grid[i] ? 255 : 0;
//     data[i * 4 + 0] = val;
//     data[i * 4 + 1] = val;
//     data[i * 4 + 2] = val;
//     data[i * 4 + 3] = 255;
//   }
//   ctx.putImageData(imageData, 0, 0);
//   backgroundTexture.needsUpdate = true;
// }

// // Create texture from the canvas
// const backgroundTexture = new THREE.CanvasTexture(gameCanvas);
// backgroundTexture.magFilter = THREE.NearestFilter;
// backgroundTexture.minFilter = THREE.NearestFilter;

// // Scene with Game of Life as background
// const scene = new THREE.Scene();
// scene.background = backgroundTexture;

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
// camera.position.z = 5;

// // Renderer
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, 400);

// // Animate
// function animate() {
//   requestAnimationFrame(animate);
//   updateGameOfLife();
//   renderer.render(scene, camera);
// }
// animate();

// // Handle resizing
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / 400;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, 400);
// });
