import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from 'three';

class Tester extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();
    
    this.name = 'tester';

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial( { color: 0xffff00 } );
    const tester = new THREE.Mesh(geometry, material);
    this.add(tester);
        
    this.inMotion = false;
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.deltaT = 0.1;

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    const maxSpeed = 10;
    const accDelayFactor = 200;
    const velDelayFactor = 100;
    
    if (!this.inMotion) {
      const xDecelerate = new TWEEN.Tween(this.velocity)
        .to({ x: 0 }, accDelayFactor * (1 - this.velocity.x / maxSpeed))
        .easing(TWEEN.Easing.Quadratic.Out);
      const zDecelerate = new TWEEN.Tween(this.velocity)
        .to({ z: 0 }, accDelayFactor * (1 - this.velocity.x / maxSpeed))
        .easing(TWEEN.Easing.Quadratic.Out);
        
      if (Math.abs(this.velocity.x) > 10e-3) xDecelerate.start();
      if (Math.abs(this.velocity.z) > 10e-3) zDecelerate.start();
    }
    
    const xShift = new TWEEN.Tween(this.position)
        .to({ x: Math.min(maxSpeed, this.position.x + this.velocity.x) }, 
              velDelayFactor * (1 - this.velocity.x / maxSpeed));
    const zShift = new TWEEN.Tween(this.position)
        .to({ z: Math.min(maxSpeed, this.position.z + this.velocity.z) }, 
              velDelayFactor * (1 - this.velocity.z / maxSpeed));

    xShift.start();
    zShift.start();
    
    TWEEN.update();
  }
}

export default Tester;

