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

// Add key controls for car
function setupKeyControls() {
    window.addEventListener('keydown', handleKeyDown, true);
    const car = scene.getObjectByName('car');

    function handleKeyDown(event) {
        switch (event.keyCode) {
            case 37:
                if (car.position.x - 0.25 > -car.maxPos) {
                    car.position.x -= 0.25;
                }
                break;
            case 39:
                if (car.position.x + 0.25 < car.maxPos) {
                    car.position.x += 0.25;
                }
                break;
        }
    }
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

// Set up lives
var lives = 3;

var lifeDiv = document.createElement('div');
lifeDiv.id = 'lives';
lifeDiv.style.position = 'absolute';
lifeDiv.innerHTML = 'Lives: ' + lives;
lifeDiv.style.width = 100;
lifeDiv.style.height = 100;
lifeDiv.style.top = 60 + 'px';
lifeDiv.style.left = 20 + 'px';
lifeDiv.style.fontFamily = 'Helvetica';
lifeDiv.style.fontSize = 28 + 'px';
lifeDiv.style.color = 'white';
document.body.appendChild(lifeDiv);

// Set special items reporter
var itemDiv = document.createElement('div');
itemDiv.id = 'item';
itemDiv.style.position = 'absolute';
itemDiv.style.width = 100;
itemDiv.style.height = 100;
itemDiv.style.top = 20 + 'px';
itemDiv.style.right = 20 + 'px';
itemDiv.style.fontFamily = 'Helvetica';
itemDiv.style.fontSize = 28 + 'px';
itemDiv.style.color = 'white';
document.body.appendChild(itemDiv);

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    // controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    var collisionObj = scene.findCollisions(
        scene.driver,
        scene.collidableMeshList
    );
    if (collisionObj !== undefined) {
      // console.log(collisionObj.name);
      if (collisionObj.name === 'coin') {
        if (!collisionObj.collected) score += 1; // only collect object if not already collected
        document.getElementById('score').innerHTML = 'Score: ' + score;
        collisionObj.onCollision();
      }
      else if (collisionObj.name === 'fox') {
        if (!collisionObj.collected) score -= 5;
        if (!collisionObj.collected) lives -= 1;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        document.getElementById('lives').innerHTML = 'Lives: ' + lives;
        document.getElementById('item').innerHTML = 'You hit a fox!';
        collisionObj.onCollision();
      }
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
