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

    this.init();
    parent.addToUpdateList(this);
    this.name = 'coin';
  }

  init() {
    let coinGeo = new CylinderGeometry(0.4, 0.4, 0.2, 18);
    coinGeo.rotateZ(Math.PI / 2);
    let coinMat = new MeshStandardMaterial ({
      color: Colors.darkyellow,
      metalness: 0.4,
    });
    let mesh = new Mesh(coinGeo, coinMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(-1, 4, 2);
    this.add(mesh);

    let insetGeo = new CylinderGeometry(0.3, 0.3, 0.22, 18);
    insetGeo.rotateZ(Math.PI / 2);
    //insetGeo.rotateZ(Math.PI / 2);
    let insetMat = new MeshStandardMaterial ({
      color: Colors.yellow,
      metalness: 0.4,
    });
    let insetMesh = new Mesh(insetGeo, insetMat);
    insetMesh.position.set(-1, 4, 2);
    this.add(insetMesh);

  }

  update(timeStamp) {
    this.position.y =  0.1 + Math.abs(Math.sin(timeStamp / 110) / 18) ;
  }

  onLeftKeyPressed() {
    this.position.x += 3;
  }

}

export default Coin;
