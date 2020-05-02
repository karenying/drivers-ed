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

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    const maxSpeed = 10; // maximum speed in any direction
    const maxPos = 4; // furthest displacement in any direction
    const accDelayFactor = 200; // tween delay for acceleration
    const velDelayFactor = 100; // tween delay for velocity
    
    if (!this.inMotion) {
      const xDecelerate = new TWEEN.Tween(this.velocity)
        .to({ x: 0 }, accDelayFactor * (1 - this.velocity.x / maxSpeed));
      const zDecelerate = new TWEEN.Tween(this.velocity)
        .to({ z: 0 }, accDelayFactor * (1 - this.velocity.x / maxSpeed));
        
      if (Math.abs(this.velocity.x) > 10e-3) xDecelerate.start();
      if (Math.abs(this.velocity.z) > 10e-3) zDecelerate.start();
    }
    
    var newX = this.position.x + this.velocity.x;
    if (newX > maxPos) newX = maxPos;
    if (newX < -maxPos) newX = -maxPos;
    
    var newZ = this.position.z + this.velocity.z;
    if (newZ > maxPos) newZ = maxPos;
    if (newZ < -maxPos) newZ = -maxPos;
    
    const xShift = new TWEEN.Tween(this.position)
        .to({ x: newX }, velDelayFactor * (1 - this.velocity.x / maxSpeed));
    const zShift = new TWEEN.Tween(this.position)
        .to({ z: newZ }, velDelayFactor * (1 - this.velocity.z / maxSpeed));

    xShift.start();
    zShift.start();
    
    TWEEN.update();
  }
}

export default Driver;

