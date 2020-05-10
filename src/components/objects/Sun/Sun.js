import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './sun.glb';

const sunYMax = 30.0;
const sunYMin = 0.0;
const sunXMax = 30.0;
const sunXMin = -30.0;

class Sun extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'sun';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });

        this.rotation.x = Math.PI/2;

        parent.addToUpdateList(this);
    }

    interpolate(start, end, percent) {
        return (start * (1 - percent)) + (end * percent);
    }

    update(timeStamp) {
        // day
        if (this.parent.night == 0) {
            // from pi/2 to pi
            let theta = this.interpolate(Math.PI/4, 3 * Math.PI / 4,this.parent.timeElapsed/this.parent.threshold);
            let newYPos = 30 * Math.sin(theta);
            this.position.y =  newYPos;
            let newXPos = 30 * Math.cos(theta);            
            this.position.x =  newXPos;
        } 
        // night
        else if (this.parent.night == 2) {
            let theta = -Math.PI/4;
            this.position.set(30 * Math.cos(theta), 30 * Math.sin(theta), -80);
        }
        // dawn
        else if (this.parent.night == 3) {
             // from 0 to pi/2
             let theta = this.interpolate(-Math.PI/4, Math.PI/4, this.parent.timeElapsed/this.parent.threshold);
             let newYPos = 30 * Math.sin(theta);
             this.position.y =  newYPos;
             let newXPos = 30 * Math.cos(theta);            
             this.position.x =  newXPos;
        } 
        // dusk
        else if (this.parent.night == 1) {
            let theta = this.interpolate(3 * Math.PI / 4, 5 * Math.PI/4, this.parent.timeElapsed/this.parent.threshold);
            let newYPos = 30 * Math.sin(theta);
            this.position.y =  newYPos;
            let newXPos = 30 * Math.cos(theta);            
            this.position.x =  newXPos;
        }
    }
}

export default Sun;