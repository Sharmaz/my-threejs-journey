import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.getElementById('webgl-cube');
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Resizing

  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(sizes.width, sizes.height);

  // Pixel Ratio

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
  // Fullscreen

  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
})

const scene = new Scene();
const geometry = new BoxGeometry(1,1,1);
const material = new MeshBasicMaterial({ color: 'red'});
const redCube = new Mesh(geometry, material);
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
const renderer = new WebGLRenderer({ canvas });

camera.position.set(1,1,1);

scene.add(redCube);
scene.add(camera);

camera.lookAt(redCube.position);

renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function ticker() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(ticker);
}

ticker();
