import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import gsap from 'gsap';

const gui = new GUI({
  title: 'Debug UI',
  width: 300,
  closeFolders: false,
});

// gui.hide();

window.addEventListener('keypress', (event) => {
  if (event.key === 's') {
    gui.show(gui._hidden);
  }
});

const debugObj = {};

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
});

debugObj.color = '#ff0000';

const scene = new Scene();
const geometry = new BoxGeometry(1,1,1);
const material = new MeshBasicMaterial({ color: debugObj.color, wireframe: true});
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


// GUI Debug
const redCubeTweaks = gui.addFolder('Red Cube');
redCubeTweaks.close()

// Elevation 
redCubeTweaks
  .add(redCube.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Elevation');

// Visibility
redCubeTweaks.add(redCube, 'visible');

// Wireframe
redCubeTweaks.add(material, 'wireframe');

// Color
redCubeTweaks
  .addColor(debugObj, 'color')
  .onChange(() => {
    material.color.set(debugObj.color)
  });

// Spin
debugObj.spin = () => {
  gsap.to(redCube.rotation, { y: redCube.rotation.y + Math.PI * 2 });
}
redCubeTweaks.add(debugObj, 'spin');

// Subdivisions
debugObj.subdivision = 2;
redCubeTweaks
  .add(debugObj, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    redCube.geometry.dispose(); // Cleaning geometries
    redCube.geometry = new BoxGeometry(
      1, 1, 1,
      debugObj.subdivision,
      debugObj.subdivision,
      debugObj.subdivision
    );
  });


function ticker() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(ticker);
}



ticker();
