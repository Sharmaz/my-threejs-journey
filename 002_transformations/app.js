import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Group
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
const blueMaterial = new MeshBasicMaterial({color: 'blue'});
const redCube = new Mesh(geometry, material);
const greenCube = new Mesh(geometry, wiredframeMaterial);
const blueCube = new Mesh(geometry, blueMaterial);
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
const axesHelper = new AxesHelper();
const objectsGroup = new Group();
const renderer = new WebGLRenderer({ canvas });

camera.position.set(1.5,1.5,3);
redCube.position.set(1.5,1,0);
greenCube.position.set(-1,1,0);
blueCube.position.set(1,-1,.5)
objectsGroup.position.z = .5

redCube.scale.set(2,0.5,0.5);

greenCube.rotateZ(Math.PI / 1.5);

redCube.rotation.reorder('YXZ');
redCube.rotation.x = Math.PI * .25;
redCube.rotation.y = Math.PI * .25;
objectsGroup.rotation.z = Math.PI * .01;

camera.lookAt(axesHelper.position);

objectsGroup.add(redCube);
objectsGroup.add(greenCube);
objectsGroup.add(blueCube);

scene.add(objectsGroup);
scene.add(camera);
scene.add(axesHelper);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const cubesDistance = greenCube.position.distanceTo(redCube.position);
