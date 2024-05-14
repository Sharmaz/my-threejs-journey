import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.getElementById('webgl-cube');
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {

  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
})

// Add vertices positions in a Float32Array
const positionsArray = new Float32Array(9);

// First vertice
positionsArray[0] = 0; // x
positionsArray[1] = 0; // y
positionsArray[2] = 0; // z

// Second vertice
positionsArray[3] = 0;
positionsArray[4] = 1;
positionsArray[5] = 0;

// Third vertice
positionsArray[6] = 1;
positionsArray[7] = 0;
positionsArray[8] = 0;

const otherPositionsArray = new Float32Array([
  0,0,0,
  0,1,0,
  1,0,0,
]);

const positionsAttribute = new BufferAttribute(otherPositionsArray, 3);
const customGeometry = new BufferGeometry();

const bunchOfTrianglesGeometry = new BufferGeometry();
const count = 500;
const positionsArrayBunch = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArrayBunch[i] = (Math.random() - 0.5) * 4;
}

const positionsAttributeBunch = new BufferAttribute(positionsArrayBunch, 3);
bunchOfTrianglesGeometry.setAttribute('position', positionsAttributeBunch);

customGeometry.setAttribute('position', positionsAttribute);

const scene = new Scene();

// Adding segments to the BoxGeometry
const geometry = new BoxGeometry(1, 1, 1, 2, 2, 2);

const material = new MeshBasicMaterial({ color: 'red', wireframe: true });
// const redCube = new Mesh(geometry, material);
//  const redTriangle = new Mesh(customGeometry, material);
const bunchOfRedTriangles = new Mesh(bunchOfTrianglesGeometry, material)
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
const renderer = new WebGLRenderer({ canvas });

camera.position.set(1,1,1);

// scene.add(redCube);
// scene.add(redTriangle);
scene.add(bunchOfRedTriangles);
scene.add(camera);

camera.lookAt(bunchOfRedTriangles.position);

renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function ticker() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(ticker);
}

ticker();
