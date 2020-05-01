import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './gem.glb';

class Coin extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            spin: true,
        };

        const loader = new GLTFLoader();

        this.name = 'gem';
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if (this.state.spin) {
            this.rotation.y = (5 * timeStamp) / 10000;
        }

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Coin;