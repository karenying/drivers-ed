import * as THREE from 'three';

import { Group,
  Mesh,
  MeshToonMaterial,
  MeshStandardMaterial,
  CircleGeometry,
  DoubleSide,
  CylinderGeometry } from 'three';

var Colors = {
  yellow: 0xf7ee6d,
  darkyellow: 0xff8617,
};

class Coin extends Group {

  constructor(parent) {
    super();

    parent.addToUpdateList(this);
    this.name = 'coin';

    var bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.bb = bb;

    this.init();
  }

  init() {
    let coinGeo = new CylinderGeometry(0.4, 0.4, 0.2, 18);
    coinGeo.rotateZ(Math.PI / 2);
    let coinMat = new MeshStandardMaterial ({
      color: Colors.darkyellow,
      metalness: 0.4,
    });
    let coinMesh = new Mesh(coinGeo, coinMat);
    coinMesh.castShadow = true;
    coinMesh.receiveShadow = true;
    this.add(coinMesh);

    let insetGeo = new CylinderGeometry(0.3, 0.3, 0.22, 18);
    insetGeo.rotateZ(Math.PI / 2);
    let insetMat = new MeshStandardMaterial ({
      color: Colors.yellow,
      metalness: 0.4,
    });
    let insetMesh = new Mesh(insetGeo, insetMat);
    this.add(insetMesh);

    // compute bounding box
    for (const mesh of this.children) {
      var box = new THREE.Box3();
      box.setFromObject(mesh);
      this.bb.union(box);
    }

    // visualize bounding box
    var bbHelper = new THREE.Box3Helper(this.bb, 0xffff00);
    this.add(bbHelper);
  }

  update(timeStamp) {
    this.position.y =  0.1 + Math.abs(Math.sin(timeStamp / 110) / 18);
    this.rotation.y += 0.1;
  }

  onLeftKeyPressed() { // unsure what this is for
    this.position.x += 3;
  }

  onCollision() {
    this.position.z += 10;
  }

}

export default Coin;
