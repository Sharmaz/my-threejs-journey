import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';

const canvas = document.getElementById('webgl-cube');
const sizes = {
  width: 800,
  height: 600,
};

const scene = new Scene();
const geometry = new BoxGeometry(1,1,1);
const material = new MeshBasicMaterial({ color: 'red'});
const wiredframeMaterial = new MeshBasicMaterial({ color: 'green', wireframe: true });
const redCube = new Mesh(geometry, material);
const greenCube = new Mesh(geometry, wiredframeMaterial);
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
const renderer = new WebGLRenderer({ canvas });

camera.position.z = 3;
redCube.position.x = 1;
redCube.position.y = -1;
greenCube.position.x = -1;
greenCube.position.y = 1;

scene.add(redCube);
scene.add(greenCube);
scene.add(camera);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
