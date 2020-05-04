import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from 'three';

class Driver extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();

    this.name = 'driver';

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial(); // { color: 0xffff00 }
    const driver = new THREE.Mesh(geometry, material);
    this.add(driver);

    this.inMotion = false; // whether the car is being actively controlled
    this.velocity = new THREE.Vector3(); // current velocity of car
    this.acceleration = new THREE.Vector3(); // current acceleration of car
    this.deltaT = 0.1;

    this.maxSpeed = 7; // maximum speed in any direction
    this.maxPos = 5; // furthest displacement in any direction

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    const accDelayFactor = 150; // tween delay for acceleration
    const velDelayFactor = 150; // tween delay for velocity

    if (!this.inMotion) {
      const xDecelerate = new TWEEN.Tween(this.velocity)
        .to({ x: 0 }, accDelayFactor * (1 - this.velocity.x / this.maxSpeed));
      const zDecelerate = new TWEEN.Tween(this.velocity)
        .to({ z: 0 }, accDelayFactor * (1 - this.velocity.x / this.maxSpeed));

      if (Math.abs(this.velocity.x) > 10e-3) xDecelerate.start();
      if (Math.abs(this.velocity.z) > 10e-3) zDecelerate.start();
    }

    var newX = this.position.x + this.velocity.x;
    if (newX > this.maxPos) newX = this.maxPos;
    if (newX < -this.maxPos) newX = -this.maxPos;

    var newZ = this.position.z + this.velocity.z;
    if (newZ > this.maxPos) newZ = this.maxPos;
    if (newZ < -this.maxPos) newZ = -this.maxPos;

    const xShift = new TWEEN.Tween(this.position)
        .to({ x: newX }, velDelayFactor * (1 - this.velocity.x / this.maxSpeed));
    const zShift = new TWEEN.Tween(this.position)
        .to({ z: newZ }, velDelayFactor * (1 - this.velocity.z / this.maxSpeed));

    xShift.start();
    zShift.start();

    TWEEN.update();
  }
}

export default Driver;
