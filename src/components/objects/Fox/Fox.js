import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

import {
    Group,
    Mesh,
    CircleGeometry,
    MeshToonMaterial,
    CylinderGeometry,
    DoubleSide,
    SphereGeometry,
    BoxGeometry,
} from 'three';

var Colors = {
  russet: 0xc44500,
  black: 0x000000,
  white: 0xffffff,

};

function makeBox(x, y, z, modify, color, dx, dy, dz) {
  let geo = new BoxGeometry(x, y, z);
  if (modify){
    geo.vertices[4].y -= 0.2;
    geo.vertices[5].y -= 0.2;
  }
  let mat = new MeshToonMaterial({
    color: color,
    flatShading: true,
  });
  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(dx, dy, dz);
  return mesh;
};

function makeLeg(x, y, z, color, dx, dy, dz) {
  let geo = new CylinderGeometry(x, y, z, 4);
  geo.rotateY(Math.PI / 4);
  let mat = new MeshToonMaterial({
    color: color,
    flatShading: true,
  });
  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(dx, dy, dz);
  return mesh;
}

class Fox extends Group {
  constructor(parent) {
    super();

    this.state = {
      walking: true,
      bob: true,
      // gameSpeed: parent.gameSpeed,
      cameraPosition: parent.camera.position,
    }
    parent.addToUpdateList(this);
    this.name = 'fox';

    // Create bounding box
    var bb = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
    this.bb = bb;
    this.position.y = 1;
    // this.speed = 0.01 + Math.random() * 0.05;
    this.speed = 0.03;
    this.collected = false;

    this.init();
  }

  init() {
    let body = makeBox(1.98, 0.6, 0.7, true, Colors.russet, 0, 0, 0);
    let whiteBody = makeBox(1.5, 0.15, 0.72, false,Colors.white, 0, -0.22, 0);
    body.add(whiteBody);
    let tail = makeLeg(0.1, 0.2, 0.65, Colors.russet, -1.2, -0.2, 0);
    tail.geometry.rotateZ(Math.PI / 1.5);
    this.add(body);
    this.add(tail);

    // creates legs
    let legOne = makeLeg(0.1, 0.05, 0.65, Colors.russet, 0.8, -0.5, 0.25);
    this.add(legOne);

    let legTwo = makeLeg(0.1, 0.05, 0.65, Colors.russet, -0.8, -0.5, 0.25);
    this.add(legTwo);

    let legThree = makeLeg(0.1, 0.05, 0.65, Colors.russet, 0.8, -0.5, -0.25);
    this.add(legThree);

    let legFour= makeLeg(0.1, 0.05, 0.65, Colors.russet, -0.8, -0.5, -0.25);
    this.add(legFour);

    // creates fox face
    let faceGeo = new BoxGeometry(0.5, 0.7, 0.7);
    faceGeo.vertices[1].y -= 0.2;
    faceGeo.vertices[0].y -= 0.2;
    faceGeo.vertices[7].y -= 0.1;
    faceGeo.vertices[6].y -= 0.1;
    let orangeMat = new MeshToonMaterial({
      color: Colors.russet,
      flatShading: true,
    });
    let face = new Mesh(faceGeo, orangeMat);
    face.position.set(1, 0.5, 0);
    face.name = "face";

    // create snout on face
    let snoutMesh = new CylinderGeometry(0.05, 0.25, 0.4, 4);
    snoutMesh.rotateZ(3 * Math.PI/2);
    snoutMesh.rotateX(Math.PI / 4);
    let snout = new Mesh(snoutMesh, orangeMat);
    snout.name = "snout";
    snout.position.set(0.4, -0.1, 0);

    let noseMesh = new SphereGeometry(0.05, 4);
    let noseMat = new MeshToonMaterial({
      color: Colors.black,
      flatShading: true,
    });
    let nose = new Mesh(noseMesh, noseMat);
    nose.position.set(0.2, 0, 0);
    nose.name = "nose";
    snout.add(nose);
    face.add(snout);

    // make ears
    let earGeo = new CylinderGeometry(0, 0.15, 0.4, 4);
    earGeo.rotateY(Math.PI / 4);
    let rightEar = new Mesh(earGeo, orangeMat);
    let leftEar = new Mesh(earGeo, orangeMat);
    rightEar.position.set(-0.1, 0.4, 0.2);
    leftEar.position.set(-0.1, 0.4, -0.2)
    rightEar.name = "right ear";
    leftEar.name = "left ear";
    face.add(rightEar, leftEar);

    // make eyes
    let eyeMesh = new SphereGeometry(0.05, 8);
    let eyeMat = new MeshToonMaterial({
      color: Colors.black,
      flatShading: true,
    });
    let eyeRight = new Mesh(eyeMesh, eyeMat);
    eyeRight.position.set(0.25, 0, -0.35);
    eyeRight.name = "right eye";

    let eyeLeft = new Mesh(eyeMesh, eyeMat);
    eyeLeft.position.set(0.25, 0, 0.35);
    eyeLeft.name = "left eye";

    let eyeHighlightMesh = new CircleGeometry(0.015, 8);
    eyeHighlightMesh.vertices[1] =+ 0.2;
    let eyeHighlightMat = new MeshToonMaterial({
      color: Colors.white,
      side: DoubleSide,
    });

    let eyeRightHighlight = new Mesh(eyeHighlightMesh, eyeHighlightMat);
    eyeRightHighlight.position.set(0, 0, -0.05);
    eyeRight.add(eyeRightHighlight);

    let eyeLeftHighlight = new Mesh(eyeHighlightMesh, eyeHighlightMat);
    eyeLeftHighlight.position.set(0, 0, 0.05);
    eyeLeft.add(eyeLeftHighlight);

    face.add(eyeRight, eyeLeft);

    this.add(face);

    // visualize bounding box
    var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
    // this.add(bbHelper);
    this.scale.set(0.5, 0.5, 0.5);
  }

  update(timeStamp) {
    const { cameraPosition, walking, bob, pause } = this.state;

    var Pulse = function(hertz,fn) {
      if (!fn) fn = Math.sin;
      return function (min,max) {
          if (!min) min = 0;
          if (!max) max = 1;
          return min+(0.5*(1+fn(2*Math.PI*hertz*new Date()/1000))*(max-min));
      };
    }

    const pulseSingle = new Pulse(0.5);

    if (!this.collected) {
      if (bob) {
        // Bob back and forth
        this.rotation.x = 0.1 * Math.sin(timeStamp / 200);
        this.children[1].rotation.x = pulseSingle(-5, 5) * (Math.PI/180);
      }
      if (walking) {
        // front left leg
        this.children[2].rotation.z = pulseSingle(-25,25) * -1 * (Math.PI/180);
        // back left leg
        this.children[3].rotation.z = pulseSingle(-25,25) * -1 * (Math.PI/180);
        // front right leg
        this.children[4].rotation.z = pulseSingle(-25,25) * (Math.PI/180);
        // back right leg
        this.children[5].rotation.z = pulseSingle(-25,25) * (Math.PI/180);
      }

      // if fox is done crossing road or no longer visible in scene
      var newX = this.position.x + this.speed;
      if (newX > this.parent.edge) {
        newZ = -(this.parent.fog.far + 70 * Math.random());
        newX = -1 * (Math.floor(Math.random() * this.parent.edge) + this.parent.edge / 2);
        this.resetParams();
      }
      this.position.x = newX;
    }

    // update positions (cross road and move towards car)
    var newZ = this.position.z + this.parent.gameSpeed;
    if (newZ > cameraPosition.z) {
      newZ = -(this.parent.fog.far + 70 * Math.random());
    }
    this.position.z = newZ;

    // Advance tween animations, if any exist
    TWEEN.update();
  }

  resetParams() {
    this.position.y = 0.5;
    this.collected = false;
  }

  onCollision() {
    if (!this.collected) {
      this.collected = true;
      const spin = new TWEEN.Tween(this.rotation)
          .to({ y: this.rotation.y + 2 * Math.PI }, 200);
      const jumpUp = new TWEEN.Tween(this.position)
          .to({ y: this.position.y + 2 }, 200)
          .easing(TWEEN.Easing.Quadratic.Out);
      const fallDown = new TWEEN.Tween(this.position)
          .to({ y: -1 }, 300)
          .easing(TWEEN.Easing.Quadratic.In);
      const resetPos = new TWEEN.Tween(this.position)
          .to({ z: -(this.parent.fog.far + 50 * Math.random()) }, 0);

      // Reset position after jumping up and down
      jumpUp.onComplete(() => fallDown.start());
      fallDown.onComplete(() => resetPos.start());
      resetPos.onComplete(() => this.resetParams());

      // Start animation
      jumpUp.start();
      spin.start();
    }
  }
}

export default Fox;
