import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from 'three';

class Ground extends Group {
  constructor(parent, width, height, color, noise) {
    // Call parent Group() constructor
    super();
    
    this.name = 'ground';
    
    this.width = width;
    this.height = height;
    this.speed = 0.1;
    this.minPos = -12;
    this.maxPos = 50;

    // Create plane geometry
    var geometry = new THREE.PlaneGeometry(this.width, this.height, this.width, this.height);
    geometry.lookAt(new THREE.Vector3(0, 1, 0));
        
    var material = new THREE.MeshStandardMaterial({color: color});
    var ground = new THREE.Mesh(geometry, material);
    this.add(ground);
    
    // assign vert data from the canvas
    if (noise === true) {
      for (let j = 1; j < this.height - 1; j++) {
        for (let i = 1; i < this.width - 1; i++) {
          const n = (j * this.height + i)
          const nn = (j * (this.height + 1) + i)
          const v1 = geometry.vertices[nn];
          v1.y += Math.random();
        }
      }
    }
    
    // Add self to parent's update list
    parent.addToUpdateList(this);
  }
  
  update(timeStamp) {
    var newZ = this.position.z - this.speed;
    if (newZ < this.minPos) newZ = this.maxPos;
    this.position.z = newZ;
    // const zShift = new TWEEN.Tween(this.position)
    //     .to({ z: newZ }, 300);
    // zShift.start();

    TWEEN.update();
  }
}

export default Ground;
