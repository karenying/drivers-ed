import { Group,
  Mesh,
  MeshToonMaterial,
  MeshBasicMaterial,
  SphereGeometry,
  DoubleSide,
  PointLight,
  SpotLight,
  Color,
  CylinderGeometry } from 'three';

var Colors = {
  black: 0x000000,
  white: 0xffffff,
  yellow: 0xffcc00,
  lightYellow: 0xfae789,
};

let currColor = '#ffffff';

const postMat = new MeshToonMaterial ({
  color: Colors.black,
  flatShading: true,
});

const bulbMat = new MeshBasicMaterial({
  color: Colors.white,
  flatShading: true,
});

const lampMat = new MeshToonMaterial({
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
      cameraPosition: parent.camera.position,
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
    light.decay = 2;
    this.add(light);

    this.scale.set(2, 2, 2);
    this.position.set(-2.6, 0.8, 0);
  }

  interpolate(start, end, percent) {
    return (start * (1 - percent)) + (end * percent);
  }

  update(timestamp) {
      const { cameraPosition, lightsOn } = this.state;

      this.position.z += this.parent.gameSpeed;

      if (this.position.z > cameraPosition.z) {
          this.position.z -= 200;
      }

      // night mode
      // turns lights on
      // turns lights off
      if (lightsOn && this.parent.night == 0) {
        this.children[1].material.color.setHex( Colors.white );
        this.children[3].intensity = 0.0;
        this.state.lightsOn = false;
      } else if (this.parent.night == 1) {
        let newIntensity = this.interpolate(0, 0.05, this.parent.timeElapsed/this.parent.threshold);
        let newColor = this.parent.getGradientColor('#ffffff', '#ffcc00', this.parent.timeElapsed/this.parent.threshold);
        if (newColor !== currColor) {
            currColor = newColor;
            this.children[1].material.color = new Color(currColor);
        }
        this.children[3].intensity = newIntensity;
      } else if (!lightsOn && this.parent.night == 2) {
        this.children[1].material.color.setHex( Colors.yellow );
        this.children[3].intensity = 0.05;
        this.state.lightsOn = true;
      } else if (this.parent.night == 3) {
        let newIntensity = this.interpolate(0.05, 0, this.parent.timeElapsed/this.parent.threshold);
        let newColor = this.parent.getGradientColor('#ffcc00', '#ffffff', this.parent.timeElapsed/this.parent.threshold);
        if (newColor !== currColor) {
            currColor = newColor;
            this.children[1].material.color = new Color(currColor);
        }
        this.children[3].intensity = newIntensity;
      }
  }
}

export default Lamppost;
