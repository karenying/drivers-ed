import { Group, SpotLight, AmbientLight, HemisphereLight } from 'three';

class BasicLights extends Group {
    constructor(parent, ...args) {
        // Invoke parent Group() constructor with our args
        super(...args);


        // const dir = new SpotLight(0xffffff, 1.6, 7, 0.8, 1, 1);
        const ambi = new AmbientLight(0x404040, 1.32);
        const hemi = new HemisphereLight(0xffffe0, 0x080820, 2.3);
        this.add(ambi, hemi);

        // night mode values
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
      // edit ambient light
      if (this.children[0].intensity >= 0.2) {
        this.children[0].intensity -= 0.001;
      }

      // edit hemi light
      if (this.children[1].intensity >= 0.15) {
        this.children[1].intensity -= 0.005;
      }
      // const ambi = new AmbientLight(0x404040, 0.2);
      // const hemi = new HemisphereLight(0x404040, 0x080820, 0.15);
      // this.add(ambi, hemi);
    }
}

export default BasicLights;
