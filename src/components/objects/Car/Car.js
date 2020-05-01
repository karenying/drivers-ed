import { Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshToonMaterial,
  PlaneGeometry,
  BoxGeometry,
  DoubleSide,
  CircleGeometry,
  CylinderGeometry } from 'three';

var Colors = {
  red: 0xcf4f48,
  black: 0x211f1f,
  gray: 0x83939c,
  yellow: 0xf7ee6d,
  darkyellow: 0xff8617,
  gray1: 0x5c6061,
};

function createCylinder(x, y, z, s, r, color, dx, dy, dz) {
  let geo = new CylinderGeometry(x, y, z, s);
  geo.rotateX( r );
  let mat = new MeshToonMaterial({
    color:color,
    flatShading: true,
  })
  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(dx, dy, dz);
  return mesh;
}

function createCylinderTwo(x, y, z, s, r, color, dx, dy, dz) {
  let geo = new CylinderGeometry(x, y, z, s);
  geo.rotateZ( r );
  let mat = new MeshToonMaterial({
    color:color,
    flatShading: true,
  })
  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(dx, dy, dz);
  return mesh;
}

function createWindshield (x, y, z, dx, dy, dz) {
  let geo = new CylinderGeometry( 0.8 / Math.sqrt( 2 ), 0.93 / Math.sqrt( 2 ), 1, 4, 1 );
  geo.rotateY( Math.PI / 4 );
  geo.computeFlatVertexNormals();
  let mat = new MeshToonMaterial({
      color: Colors.gray,
  });
  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(dx, dy, dz);
  mesh.scale.set(x, y, z);
  return mesh
}

class Car extends Group {

  constructor(parent) {
    super();

    this.init();

    this.name = 'car';
  }

  init() {
    let body = new BoxGeometry(4, 0.5, 2.5);
    let bodyMat = new MeshToonMaterial({
        color: Colors.red,
    });
    let carBody = new Mesh(body, bodyMat);
    carBody.castShadow = true;
    carBody.receiveShadow = true;
    carBody.position.set(0, 1, 0);
    this.add(carBody);

    // // creates the top of the car
    let top = new CylinderGeometry( 0.8 / Math.sqrt( 2 ), 1 / Math.sqrt( 2 ), 1, 4, 1 );
    top.rotateY( Math.PI / 4 );
    top.computeFlatVertexNormals();
    let topMat = new MeshToonMaterial({
        color: Colors.red,
        flatShading: true
    });
    let carTop = new Mesh(top, topMat);
    carTop.scale.set(2, 2, 2.5);
    carTop.castShadow = true;
    carTop.receiveShadow = true;
    carTop.position.set(0, 2, 0);
    this.add(carTop);

    let windshield = createWindshield(2.1, 1.4, 2, 0, 2.2, 0);
    this.add(windshield);
    // let windshieldTwo = createWindshield(1.77, 1.4, 1.7,5,5,5);
    // this.add(windshieldTwo);

    // creates the wheel
    let wheelOne = createCylinder(0.4, 0.4, 0.2, 16, Math.PI / 2, Colors.black, 1.2, 0.6, -1.2);
    let wheelTwo = createCylinder(0.4, 0.4, 0.2, 16, Math.PI / 2, Colors.black, -1.2, 0.6, -1.2);
    let wheelThree = createCylinder(0.4, 0.4, 0.2, 16, Math.PI / 2, Colors.black, 1.2, 0.6, 1.2);
    let wheelFour = createCylinder(0.4, 0.4, 0.2, 16, Math.PI / 2, Colors.black, -1.2, 0.6, 1.2);
    this.add(wheelOne);
    this.add(wheelTwo);
    this.add(wheelThree);
    this.add(wheelFour);

    // creates license plate
    let licenseGeo = new PlaneGeometry(0.6, 0.3, 0.6);
    let licenseMaterial = new MeshToonMaterial( {
      color: Colors.yellow,
      side: DoubleSide
    });
    let license = new Mesh(licenseGeo, licenseMaterial);
    license.rotateY(Math.PI / 2);
    license.position.set(-2.01,1,0);
    this.add(license);

    // creates headlights
    let headLightGeo = new CircleGeometry(0.15, 32);
    let headLightMaterial = new MeshToonMaterial( {
      color: Colors.darkyellow,
      side: DoubleSide,
    });
    let headLightOne = new Mesh(headLightGeo, headLightMaterial);
    let headLightTwo = new Mesh(headLightGeo, headLightMaterial);
    headLightOne.rotateY(Math.PI / 2);
    headLightOne.position.set(-2.01, 1, -1);
    headLightTwo.rotateY(Math.PI / 2);
    headLightTwo.position.set(-2.01, 1, 1);
    this.add(headLightOne);
    this.add(headLightTwo);

    // create exhaust pipe
    let pipe = createCylinderTwo(0.08, 0.01, 0.4, 16, Math.PI / 2, Colors.black, -2, 0.78, -0.8);
    this.add(pipe);

    let geo = new BoxGeometry(0.2, 0.2, 0.2);
    let mat = new MeshToonMaterial({
        color: Colors.gray1,
    });
    let exhaust = new Mesh(geo, mat);
    exhaust.castShadow = true;
    exhaust.receiveShadow = true;
    exhaust.position.set(-2.5, 1, -0.75);
    this.add(exhaust);
  }


}

export default Car;
