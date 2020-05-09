import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './moon.glb';

const moonMax = 20.0;
const moonMin = -5.0;

class Moon extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'moon';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        this.rotation.y = Math.PI/2;

        parent.addToUpdateList(this);
    }

    interpolate(start, end, percent) {
        return (start * (1 - percent)) + (end * percent);
    }

    update(timeStamp) {
        // night
        if (this.parent.night == 2) {
            // from pi/2 to pi
            let theta = this.interpolate(Math.PI/4, 3 * Math.PI / 4,this.parent.timeElapsed/this.parent.threshold);
            let newYPos = 30 * Math.sin(theta);
            this.position.y =  newYPos;
            let newXPos = 30 * Math.cos(theta);            
            this.position.x =  newXPos;
        } 
        // day
        else if (this.parent.night == 0) {
            let theta = -Math.PI/4;
            this.position.set(30 * Math.cos(theta), 30 * Math.sin(theta), -80);
        }
        // dusk
        else if (this.parent.night == 1) {
             // from 0 to pi/2
             let theta = this.interpolate(-Math.PI/4, Math.PI/4,this.parent.timeElapsed/this.parent.threshold);
             let newYPos = 30 * Math.sin(theta);
             this.position.y =  newYPos;
             let newXPos = 30 * Math.cos(theta);            
             this.position.x =  newXPos;
        } 
        // dawn
        else if (this.parent.night == 3) {
            let theta = this.interpolate(3 * Math.PI / 4, 5 *Math.PI/4,this.parent.timeElapsed/this.parent.threshold);
            let newYPos = 30 * Math.sin(theta);
            this.position.y =  newYPos;
            let newXPos = 30 * Math.cos(theta);            
            this.position.x =  newXPos;
        }
    }
}

export default Moon;