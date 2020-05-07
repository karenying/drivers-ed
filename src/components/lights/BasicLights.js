import { Group, Color, SpotLight, AmbientLight, HemisphereLight } from 'three';

const skyBlue = new Color(0x7ec0ee);
const nightBlue = new Color(0x345063);

class BasicLights extends Group {
    constructor(parent, ...args) {
        // Invoke parent Group() constructor with our args
        super(...args);
        this.state = {
          ambiChange: 0.002,
          hemiChange: 0.002,
          darken: true,
          first: true,
        }

        const ambi = new AmbientLight(0x404040, 1.3);
        const hemi = new HemisphereLight(0xffffe0, 0x080820, 2);
        this.add(ambi, hemi);

        // night mode values
        parent.addToUpdateList(this);
    }

    update(timeStamp) {

      if (!this.parent.night) {

        // background color normal
        this.parent.background = skyBlue;
        this.parent.fog.color = skyBlue;

        if (this.state.darken) {
          this.children[0].intensity -= this.state.ambiChange;
          this.children[1].intensity -= this.state.hemiChange;
        } else {
          this.children[0].intensity += this.state.ambiChange;
          this.children[1].intensity += this.state.hemiChange;
        }
        this.children[0].intensity = Math.max(0.2, this.children[0].intensity);
        this.children[0].intensity = Math.min(1.3, this.children[0].intensity);

        this.children[1].intensity = Math.max(0.15, this.children[1].intensity);
        this.children[1].intensity = Math.min(2, this.children[1].intensity);

        if (!this.state.first && this.parent.timeElapsed >= 0.5 * this.parent.threshold) {
          this.state.darken = true;
        }
      }

      // during night
      else {
        this.parent.background = nightBlue;
        this.parent.fog.color = nightBlue;
        this.state.darken = false;
        if (this.state.first) {
          this.state.first = false;
        }
      }
    }
}

export default BasicLights;
