import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
  Clock,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

/** CUSTOM CONTROLS */

const cursor = {
  x: 0,
  y: 0
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = - (event.clientY / sizes.height - 0.5);
});

const canvas = document.getElementById('webgl-cube');
const sizes = {
  width: 800,
  height: 600,
};

const aspectRatio = sizes.width / sizes.height;

const scene = new Scene();
const geometry = new BoxGeometry(1,1,1);
const material = new MeshBasicMaterial({ color: 'red'});
const redCube = new Mesh(geometry, material);
const perspectiveCamera = new PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);
const ortographicCamera = new OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, -1, 100);
const renderer = new WebGLRenderer({ canvas });

/** PERSPECTIVE AND ORTOGRAPHIC CAMERAS */

perspectiveCamera.position.set(2,2,2);
ortographicCamera.position.set(1,1,1);

scene.add(redCube);
scene.add(ortographicCamera);
// scene.add(perspectiveCamera);

// perspectiveCamera.lookAt(redCube.position);
ortographicCamera.lookAt(redCube.position);

renderer.setSize(sizes.width, sizes.height);

const clock = new Clock();

const controls = new OrbitControls(ortographicCamera, canvas);
controls.enableDamping = true;

function ticker() {
  /** ANIMATE CAMERAS WITH CUSTOM AND ORBIT CONTROLS */

  // ortographicCamera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // ortographicCamera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // ortographicCamera.position.y = cursor.y * 10;
  // ortographicCamera.lookAt(redCube.position);

  // renderer.render(scene, perspectiveCamera);
  controls.update();
  renderer.render(scene, ortographicCamera);
  window.requestAnimationFrame(ticker);
}

ticker();
