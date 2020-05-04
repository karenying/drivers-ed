import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from 'three';

class Pedestrian extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();
    
    this.name = 'pedestrian';

    var geometry = new THREE.TetrahedronGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial(); // { color: 0xffff00 }
    const pedestrian = new THREE.Mesh(geometry, material);
    this.add(pedestrian);
    
    this.speed = Math.random();
    this.maxPos = 6;
    
    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    var newX = this.position.x + 1;
    if (newX < this.maxPos) {
      const zShift = new TWEEN.Tween(this.position)
          .to({ x: newX }, this.speed * 1000);
      zShift.start();
    }
    TWEEN.update();
  }
}

export default Pedestrian;

