import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Bus.glb';

import {
    Group,
    Mesh,
    MeshToonMaterial,
    PlaneGeometry,
    BoxGeometry,
    DoubleSide,
    CircleGeometry,
    SpotLight,
    CylinderGeometry,
    AxesHelper,
} from 'three';

var Colors = {
    black: 0x211f1f,
    gray: 0x83939c,
    yellow: 0xf7ee6d,
    darkyellow: 0xff8617,
    gray1: 0x5c6061,
};

class Bus extends Group {
    constructor(parent) {
        super();
        this.state = {
          lightsOn: false,
          threshold: 10,
          bobbing: true
        }
        this.idle = false;
        this.parent = parent;
        this.speed = 0.25;

        const loader = new GLTFLoader();

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Create bounding box
        this.idle = false;
        this.collected = false;

        this.name = 'bus';
        this.lightTarget = new THREE.Object3D();
        this.lightTarget.position.x = 0;
        this.lightTarget.position.z = 10;
        this.lightTarget.position.y = 1;
        this.add(this.lightTarget);

        this.init();

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    init() {

      // create night mode headlights
      let beamerOne = new SpotLight(0xffffff, 0);
      beamerOne.position.set(5, 1, 12);
      beamerOne.angle = 0.5;
      beamerOne.distance = 30;
      beamerOne.name = "beamer1";
      let beamerTwo= new SpotLight(0xffffff, 0);
      beamerTwo.position.set(-5, 1, 12);
      beamerTwo.angle = 0.5;
      beamerTwo.distance = 30;
      beamerTwo.name = "beamer2";
      beamerOne.target = this.lightTarget;
      beamerTwo.target = this.lightTarget;
      this.add(beamerOne, beamerTwo);

      this.bb = new THREE.Box3(
        new THREE.Vector3(-5, -10, -15),
        new THREE.Vector3(5, 10, 15)
      );
      var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);

      this.fbb = new THREE.Box3(
        new THREE.Vector3(-5, -10, 15),
        new THREE.Vector3(5, 10, 17)
      );
      var fbbHelper = new THREE.Box3Helper(this.fbb, 0xffff00);
      // this.add(bbHelper);
    }

    update(timeStamp) {
        const { lightsOn, idle } = this.state;

        // turns lights on
        if (!lightsOn && this.parent.night == 2) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.intensity = 1;
          beamer = this.getObjectByName("beamer2", true);
          beamer.intensity = 1;
          this.state.lightsOn = true;
        }

        // turns lights off
        if (lightsOn && this.parent.night != 2) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.intensity = 0;
          beamer = this.getObjectByName("beamer2", true);
          beamer.intensity = 0;
          this.state.lightsOn = false;
        }

        if (lightsOn) {
          let beamer = this.getObjectByName("beamer1", true);
          beamer.target.updateMatrixWorld();
          beamer = this.getObjectByName("beamer2", true);
          beamer.target.updateMatrixWorld();
        }

        if (this.state.bobbing) {
            // Bob car and exhaust back and forth
            this.rotation.x = 0.03 * Math.sin(timeStamp / 200);
        }

        if (this.idle) {
          if (this.parent.stopped) var newZ = this.position.z;
          else var newZ = this.position.z + this.parent.gameSpeed;
        } else {
          if (this.parent.stopped) var newZ = this.position.z + this.speed;
          else var newZ = this.position.z + this.parent.gameSpeed + this.speed;
        }

        if (newZ > this.parent.camera.position.z) {
          newZ = -(this.parent.fog.far + 70 * Math.random());
          while (newZ > this.parent.camera.position.z - 50) {
            newZ = -(this.parent.fog.far + 70 * Math.random());
          }
        }
        this.position.z = newZ;

        // Advance tween animations, if any exist
        TWEEN.update();
    }

    bobble(timeStamp) {
        if (this.state.bobbing) {
            // Bob car and exhaust back and forth
            this.rotation.x = 0.03 * Math.sin(timeStamp / 200);
        }
    }

    resetParams() {
      this.collected = false;
      this.position.y = 0.5;
    }

    onCollision() {
      if (!this.collected) {
        this.collected = true;
        const spin = new TWEEN.Tween(this.rotation)
            .to({ y: this.rotation.y + 2 * Math.PI }, 200);
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 3 }, 200)
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

export default Bus;
