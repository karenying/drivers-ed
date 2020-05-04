/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Fog, Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Washington } from 'scenes';
import * as THREE from 'three';

// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const scene = new Washington(camera);
const renderer = new WebGLRenderer({ antialias: true /*alpha: true */ });

// Add fog
scene.fog = new Fog(new Color(0x7ec0ee), 1, 50);

// Set up camera
camera.position.set(0, 5, 20);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Add key controls for car
function setupKeyControls() {
    var car = scene.getObjectByName('car');
    document.onkeydown = function (e) {
        car.inMotion = true;
        switch (e.keyCode) {
            case 37:
                if (car.position.x - 0.25 > -car.maxPos) car.position.x -= 0.25;
                break;
            case 39:
                if (car.position.x + 0.25 < car.maxPos) car.position.x += 0.25;
                break;
            /*
            case 38:
                car.position.z--;
                break;
            case 40:
                car.position.z++;
                break;
            */
        }
    };
}

setupKeyControls();

// Set up score
var score = 0;

var scoreDiv = document.createElement('div');
scoreDiv.id = 'score';
scoreDiv.style.position = 'absolute';
scoreDiv.innerHTML = 'Score: ' + score;
scoreDiv.style.width = 100;
scoreDiv.style.height = 100;
scoreDiv.style.top = 20 + 'px';
scoreDiv.style.left = 20 + 'px';
scoreDiv.style.fontFamily = 'Helvetica';
scoreDiv.style.fontSize = 28 + 'px';
scoreDiv.style.color = 'white';
document.body.appendChild(scoreDiv);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    var collisionObj = scene.findCollisions(scene.driver, scene.collidableMeshList);
    if (collisionObj !== undefined && collisionObj.name === 'coin') {
      if (!collisionObj.collected) score += 1; // only collect object if not already collected
      document.getElementById('score').innerHTML = 'Score: ' + score;
      collisionObj.onCollision();
    }
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

// Collision handler
// const collisionHandler = (scene) => {
//   console.log('BAM!');
//   scene.score += 1;
//   document.getElementById('score').innerHTML = scene.score;
// };
// collisionHandler();

// scene.addEventListener('collision', collisionHandler(scene));
