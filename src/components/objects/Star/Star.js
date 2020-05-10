import { Group, SphereGeometry, Mesh, MeshPhongMaterial } from 'three';

class Star extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        let geometry = new SphereGeometry( 0.1, 32, 32 );
        let material = new MeshPhongMaterial( {
            color: 0xffffff, 
            opacity: 0, 
            transparent: true,
        } );
        let sphere = new Mesh( geometry, material );
        
        this.add(sphere);
        parent.addToUpdateList(this);
    }

    interpolate(start, end, percent) {
        return (start * (1 - percent)) + (end * percent);
    }

    update(timeStamp) {
        // night
        if (this.parent.night == 2) {
            this.children[0].material.opacity = this.interpolate(1, 0.1, this.parent.timeElapsed/this.parent.threshold);
        } 
        // dusk
        else if (this.parent.night == 1) {
            this.children[0].material.opacity = this.interpolate(0, 1, this.parent.timeElapsed/this.parent.threshold);
        }
        // dawn
        else if (this.night == 3) {       
            this.children[0].material.opacity = this.interpolate(0.1, 0, (2 * this.parent.timeElapsed)/ this.parent.threshold);
        } else {
            this.children[0].material.opacity = 0;
        }

    }
}

export default Star;