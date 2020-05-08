import { Group, Color, SpotLight, AmbientLight, HemisphereLight } from 'three';

const skyBlue = new Color(0x7ec0ee);
const nightBlue = new Color(0x11223d);

const ambiDay = 1.3;
const ambiNight = 0.5;
const hemiDay = 2;
const hemiNight = 0.5;

class BasicLights extends Group {
  constructor(parent, ...args) {
      // Invoke parent Group() constructor with our args
      super(...args);
      this.state = {
        ambiChange: 0.002,
        hemiChange: 0.002,
      }

      const ambi = new AmbientLight(0x404040, 1.3);
      const hemi = new HemisphereLight(0xffffe0, 0x080820, 2);
      this.add(ambi, hemi);

      // night mode values
      parent.addToUpdateList(this);
  }

  interpolate(start, end, percent) {
    return (start * (1 - percent)) + (end * percent);
  }

  update(timeStamp) {
    if (this.parent.night == 1) {
      let newAmbi = this.interpolate(ambiDay, ambiNight, this.parent.timeElapsed/this.parent.threshold);
      let newHemi = this.interpolate(ambiDay, hemiNight, this.parent.timeElapsed/this.parent.threshold);

      this.children[0].intensity = newAmbi;
      this.children[1].intensity = newHemi;
    } else if (this.parent.night == 3) {
      let newAmbi = this.interpolate(ambiNight, ambiDay, this.parent.timeElapsed/this.parent.threshold);
      let newHemi = this.interpolate(ambiNight, hemiDay, this.parent.timeElapsed/this.parent.threshold);

      this.children[0].intensity = newAmbi;
      this.children[1].intensity = newHemi;
    }
  }
}

export default BasicLights;
