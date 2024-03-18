import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
} from 'three';

import gsap from 'gsap';

const canvas = document.getElementById('webgl-cube');
const sizes = {
  width: 800,
  height: 600,
};

const scene = new Scene();
const geometry = new BoxGeometry(1,1,1);
const material = new MeshBasicMaterial({ color: 'red'});
const blueMaterial = new MeshBasicMaterial({color: 'blue'});
const yellowMaterial = new MeshBasicMaterial({color: 'yellow'});
const wiredframeMaterial = new MeshBasicMaterial({ color: 'green', wireframe: true });
const redCube = new Mesh(geometry, material);
const greenCube = new Mesh(geometry, wiredframeMaterial);
const blueCube = new Mesh(geometry, blueMaterial);
const yellowCube = new Mesh(geometry, yellowMaterial);
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
const renderer = new WebGLRenderer({ canvas });

camera.position.z = 3;
redCube.position.x = 1;
redCube.position.y = -1;
greenCube.position.x = -1;
greenCube.position.y = 1;

scene.add(redCube);
scene.add(greenCube);
scene.add(blueCube);
scene.add(yellowCube);
scene.add(camera);

renderer.setSize(sizes.width, sizes.height);

function tickUncontrolledFrameRate() {
  greenCube.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickUncontrolledFrameRate);
}

tickUncontrolledFrameRate();

let time = Date.now();

function tickControlledByDate() {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;

  time = currentTime;
  redCube.rotation.y += 0.001 * deltaTime;
  window.requestAnimationFrame(tickControlledByDate);
}

tickControlledByDate();

const clock = new Clock();

function tickControlledByClock() {
  const elapsedTime = clock.getElapsedTime();

  blueCube.position.x = Math.sin(elapsedTime);
  blueCube.position.y = Math.cos(elapsedTime);
  blueCube.position.z = Math.sin(elapsedTime);
  window.requestAnimationFrame(tickControlledByClock);
}

tickControlledByClock();

function tickControlledByGsap() {
  gsap.to(yellowCube.position, { duration: 1, delay: 1, x: 2 })
  gsap.to(yellowCube.position, { duration: 1, delay: 2, x: 0 })
}

tickControlledByGsap();
