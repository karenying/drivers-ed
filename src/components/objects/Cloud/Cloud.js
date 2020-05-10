import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cloud.glb';

const hidden = -200;
const halfHidden = -170;
const visible = -140;

class Cloud extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'cloud';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        parent.addToUpdateList(this);
    }

    interpolate(start, end, percent) {
        return (start * (1 - percent)) + (end * percent);
    }

    update(timeStamp) {
        this.rotation.z = 0.01 * Math.sin(timeStamp / 200);

        this.position.x -= 0.2;
        if (this.position.x < -120) {
            this.position.x = 120;
        }

        // night
        if (this.parent.night == 2) {
            this.position.z = this.interpolate(hidden, halfHidden, this.parent.timeElapsed/this.parent.threshold);
        }
        // dawn
        else if (this.parent.night == 3) {
            this.position.z = this.interpolate(halfHidden, visible, this.parent.timeElapsed/this.parent.threshold);
        } 
        // day
        else if (this.parent.night == 0) {
            this.position.z = this.interpolate(visible, halfHidden, this.parent.timeElapsed/this.parent.threshold);
        }
        // dusk
        else if (this.parent.night == 1) {
            this.position.z = this.interpolate(halfHidden, hidden, this.parent.timeElapsed/this.parent.threshold);
        }
    }
}

export default Cloud;