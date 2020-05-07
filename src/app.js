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
import './app.css';
import link from './writeup.html';
import dingLink from './sounds/ding.wav';
import loseLink from './sounds/lose.wav';
import hitLink from './sounds/hit.wav';

// Add sounds
const ding = new Audio(dingLink);
ding.load();
const lose = new Audio(loseLink);
const hit = new Audio(hitLink);

// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const scene = new Washington(camera);
const renderer = new WebGLRenderer({ antialias: true /*alpha: true */ });

// game control variables
let gameOver = false;
let paused = false;
let newGameStarted = false;

// Add fog
scene.fog = new Fog(new Color(0x7ec0ee), 1, 200);

// Set up camera
camera.position.set(0, 5, 30);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enablePan = false;
// controls.minDistance = 4;
// controls.maxDistance = 5000;
// controls.update();

// Pause the scene
function pause() {
    paused = true;
    scene.state.pause = true;
    return true;
}

// Add key controls for car
function setupKeyControls() {
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    const car = scene.getObjectByName('car');

    function handleKeyDown(event) {
        if (event.keyCode === 80 && !gameOver && newGameStarted) {
            paused = !paused;
            scene.state.pause = !scene.state.pause;
        }

        if (!gameOver && newGameStarted && !paused) {
            switch (event.keyCode) {
                // left
                case 37:
                    car.state.bobbing = false;
                    if (car.position.x - 0.25 > -car.maxPos) {
                        car.position.x -= 0.25;
                        car.rotation.z = Math.PI / 80;
                    }
                    break;
                // right
                case 39:
                    car.state.bobbing = false;
                    if (car.position.x + 0.25 < car.maxPos) {
                        car.position.x += 0.25;
                        car.rotation.z = -Math.PI / 80;
                    }
                    break;
                // up
                case 38:
                    scene.accelerating = true;
                    break;
                // space bar (stop)
                case 32:
                    console.log(scene.stopped);
                    if (scene.stopped) scene.stopped = false;
                    else scene.stopped = true;
                    break;
            }
        }
    }

    function handleKeyUp(event) {
        if (!gameOver && newGameStarted && !paused) {
            switch (event.keyCode) {
                // left
                case 37:
                    car.rotation.z = 0;
                    car.state.bobbing = true;
                    break;
                // right
                case 39:
                    car.rotation.z = 0;
                    car.state.bobbing = true;
                    break;
                // up
                case 38:
                    scene.accelerating = false;
                    break;
            }
        }
    }
}

setupKeyControls();

// Set up intro screen
let beginContainer = document.createElement('div');
beginContainer.id = 'begin-container';
document.body.appendChild(beginContainer);

let beginContent = document.createElement('div');
beginContent.id = 'begin-content';
beginContainer.appendChild(beginContent);

let beginContentText = document.createElement('div');
beginContentText.id = 'begin-text';
beginContent.appendChild(beginContentText);

let beginContentTitleText = document.createElement('h1');
beginContentTitleText.innerText = "DRIVER'S ED";
beginContentText.appendChild(beginContentTitleText);

let beginContentDescription = document.createElement('p');
beginContentDescription.innerHTML =
    "Princeton is offering a new course this fall, DRI 101 (Driver's Ed)! In this class, you are a driver driving down Washington Road. How long can you last?" +
    '<br />' +
    '<br />' +
    'Use the arrow keys to drive. Avoid the fox and pedestrians. Collect coins.';
beginContentText.appendChild(beginContentDescription);

let beginContentButton = document.createElement('div');
beginContentButton.id = 'begin-button';
beginContentButton.innerHTML = 'BEGIN';
beginContent.appendChild(beginContentButton);

// Set up writeup link
let writeupContainer = document.createElement('div');
writeupContainer.id = 'writeup-container';
document.body.appendChild(writeupContainer);

let writeupLink = document.createElement('a');
writeupLink.innerHTML = 'Writeup';
writeupContainer.append(writeupLink);
writeupLink.href = link;

// Begin game
beginContentButton.onclick = function () {
    beginContainer.style.display = 'none';
    // writeupContainer.style.display = 'none';
    scene.state.newGameStarted = true;
    newGameStarted = true;
};

// Set up score
var score = 0;

var scoreDiv = document.createElement('div');
scoreDiv.id = 'score';
scoreDiv.innerHTML = 'Score: ' + score;
document.body.appendChild(scoreDiv);

// Set up lives
var lives = 3;

var lifeDiv = document.createElement('div');
lifeDiv.id = 'lives';
lifeDiv.innerHTML = 'Lives: ' + lives;
document.body.appendChild(lifeDiv);

// Set special items reporter
var itemDiv = document.createElement('div');
itemDiv.id = 'item';
document.body.appendChild(itemDiv);

// Set up outro screen
let endContainer = document.createElement('div');
endContainer.id = 'end-container';
document.body.appendChild(endContainer);

let endContent = document.createElement('div');
endContent.id = 'end-content';
endContainer.appendChild(endContent);

let endContentText = document.createElement('div');
endContentText.id = 'end-text';
endContent.appendChild(endContentText);

let endContentTitleText = document.createElement('h1');
endContentTitleText.innerText = 'GAME OVER';
endContentText.appendChild(endContentTitleText);

let endContentDescription = document.createElement('p');
endContentDescription.innerHTML = 'Your score:';
endContentText.appendChild(endContentDescription);

let endContentScore = document.createElement('h1');
endContentScore.id = 'end-score';
endContentText.appendChild(endContentScore);

let endContentButton = document.createElement('div');
endContentButton.id = 'end-button';
endContentButton.innerHTML = 'PLAY AGAIN';
endContent.appendChild(endContentButton);

// End game and reset
endContentButton.onclick = function () {
    endContainer.style.display = 'none';
    scene.state.pause = false;
    paused = false;
    score = 0;
    lives = 3;
    gameOver = false;
};

endContainer.style.display = 'none';

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
            if (!collisionObj.collected) {
                score += 1; // only collect object if not already collected      
                let dingClone = ding.cloneNode();
                dingClone.play();
            }
            document.getElementById('score').innerHTML = 'Score: ' + score;
            collisionObj.onCollision();
        } else if (collisionObj.name === 'fox') {
            if (!collisionObj.collected) lives -= 1;
            if (!gameOver) {
                hit.play();
            }
            document.getElementById('lives').innerHTML = 'Lives: ' + lives;
            collisionObj.onCollision();
        } else if (collisionObj.name === 'pedestrian') {
            if (!collisionObj.collected) lives -= 1;
            if (!gameOver) {
                hit.play();
            }
            document.getElementById('lives').innerHTML = 'Lives: ' + lives;
            collisionObj.onCollision();
        }
    }
    // game over if lives are 0
    if (lives <= 0) {
        if (!gameOver) {
            lose.play();
        }
        gameOver = pause();
        endContainer.style.display = 'flex';
        endContentScore.innerText = score;
    }
    document.getElementById('score').innerHTML = 'Score: ' + score;
    document.getElementById('lives').innerHTML = 'Lives: ' + lives;
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
