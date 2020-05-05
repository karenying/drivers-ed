import { Group,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  DoubleSide,
  PointLight,
  SpotLight,
  CylinderGeometry } from 'three';

var Colors = {
  black: 0x000000,
  white: 0xffffff,
  yellow: 0xf5cc00,
  lightYellow: 0xfae789,
};

const postMat = new MeshLambertMaterial ({
  color: Colors.black,
  flatShading: true,
});

const lampMat = new MeshStandardMaterial({
  color: Colors.white,
  flatShading: true,
  transparent: true,
  opacity: 0.8,
});

const lampNightMat = new MeshStandardMaterial({
  color: Colors.lightYellow,
  flatShading: true,
  transparent: true,
  opacity: 0.8,
});

function makeMesh(geo, mat, dx, dy, dz) {
  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(dx, dy, dz);
  return mesh;
}

class Lamppost extends Group {
  constructor(parent) {
    super();
    // debugger;
    this.state = {
      night: parent.night,
      startTime: parent.startTime,
      cameraPosition: parent.camera.position,
      gameSpeed: parent.gameSpeed,
      lightsOn: false,
    }

    this.init();
    this.name = 'lamppost';
    parent.addToUpdateList(this);
  }

  init() {
    let postGeo = new CylinderGeometry(0.05, 0.1, 2, 8);
    let post = makeMesh(postGeo, postMat, 0, 0, 0);

    let lampGeo = new SphereGeometry(0.25, 8, 6);
    let lamp = makeMesh(lampGeo, lampMat, 0, 0.6, 0);
    post.add(lamp);

    let light = new SpotLight(0xf5cc00);
    light.intensity = 0;
    light.position.set(0, 0.8, 0);
    this.add(light);

    this.add(post);
    this.scale.set(2, 2, 2);
    this.position.set(-2.6, 0.8, 0);
  }

  update(timestamp) {
      const { cameraPosition, startTime, gameSpeed, lightsOn } = this.state;
      const currentTime = Date.now() / 1000;

      if ((currentTime - startTime > 20) && !this.state.night) {
        this.state.night = true;
      }

      this.position.z += gameSpeed;

      if (this.position.z > cameraPosition.z) {
          this.position.z -= 200;
      }

      if (!lightsOn && this.state.night) {
        this.children[0].intensity = 0.075;
        this.children[0].decay = 5;
      }
  }

}

export default Lamppost;
