import { Group, SpotLight, AmbientLight, HemisphereLight } from 'three';

class BasicLights extends Group {
    constructor(parent, ...args) {
        // Invoke parent Group() constructor with our args
        super(...args);
        this.state = {
          ambiChange: 0.01,
          hemiChange: 0.01,
          timeElapsed: -1,
          startTime: null,
        }

        const ambi = new AmbientLight(0x404040, 1.3);
        const hemi = new HemisphereLight(0xffffe0, 0x080820, 2);
        this.add(ambi, hemi);

        // night mode values
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
      const { startTime } = this.state;
      // figures out time elapsed since beginning
      if (startTime == null) {
        this.state.startTime = Date.now() / 1000;
      } else {
        const currentTime = Date.now() / 1000;
        this.state.timeElapsed = currentTime - this.state.startTime;
      }

      if (this.state.timeElapsed > 10) {
        this.state.ambiChange = -this.state.ambiChange;
        this.state.hemiChange = -this.state.hemiChange;
        this.state.startTime = Date.now() / 1000;
      }


      // edit lights
      this.children[0].intensity -= this.state.ambiChange;
      this.children[1].intensity -= this.state.hemiChange;
      // const ambi = new AmbientLight(0x404040, 0.2);
      // const hemi = new HemisphereLight(0x404040, 0x080820, 0.15);
      // this.add(ambi, hemi);
    }
}

export default BasicLights;
