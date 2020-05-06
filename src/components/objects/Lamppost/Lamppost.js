import { Group,
  Mesh,
  MeshLambertMaterial,
  MeshBasicMaterial,
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

const bulbMat = new MeshBasicMaterial({
  color: Colors.white,
  flatShading: true,
});

const lampMat = new MeshLambertMaterial({
  color: Colors.white,
  flatShading: true,
  transparent: true,
  opacity: 0.6,
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

    this.state = {
      night: parent.night,
      cameraPosition: parent.camera.position,
      gameSpeed: parent.gameSpeed,
      timeElapsed: -1,
      lightsOn: false,
      startTime: null,
      threshold: 10,
    }
    this.init();
    this.name = 'lamppost';
    parent.addToUpdateList(this);
  }

  init() {
    let postGeo = new CylinderGeometry(0.05, 0.1, 2, 8);
    let post = makeMesh(postGeo, postMat, 0, 0, 0);

    let bulbGeo = new SphereGeometry(0.15, 8, 6);
    let bulb = makeMesh(bulbGeo, bulbMat, 0, 0.7, 0);
    this.add(post, bulb);

    let lampGeo = new SphereGeometry(0.25, 8, 6);
    let lamp = makeMesh(lampGeo, lampMat, 0, 0.7, 0);
    this.add(lamp);

    let light = new PointLight(0xf5cc00);
    light.intensity = 0;
    light.position.set(0.05, 1, 8);
    this.add(light);

    this.scale.set(2, 2, 2);
    this.position.set(-2.6, 0.8, 0);
  }

  update(timestamp) {
      const { startTime, cameraPosition, gameSpeed, lightsOn } = this.state;

      // figures out time elapsed since beginning
      if (startTime == null) {
        this.state.startTime = Date.now() / 1000;
      } else {
        const currentTime = Date.now() / 1000;
        this.state.timeElapsed = currentTime - this.state.startTime;
      }

      if (this.state.timeElapsed > this.state.threshold) {
        this.state.night = !this.state.night;
        this.state.startTime = Date.now() / 1000;
        this.state.threshold = 20;
      }

      this.position.z += gameSpeed;

      if (this.position.z > cameraPosition.z) {
          this.position.z -= 200;
      }

      // night mode
      // turns lights on
      if (!lightsOn && this.state.night) {
        this.children[1].material.color.setHex( Colors.yellow );
        this.children[3].intensity = 0.1;
        this.children[3].decay = 2;
        this.state.lightsOn = true;
      }

      // turns lights off
      if (lightsOn && !this.state.night) {
        this.children[1].material.color.setHex( Colors.white );
        this.children[3].intensity = 0.0;
        this.state.lightsOn = false;
      }
  }

}

export default Lamppost;
