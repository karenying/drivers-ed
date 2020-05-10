import { Group, 
    SphereGeometry, 
    Mesh, 
    MeshPhongMaterial,
    BufferGeometry,
    Geometry,
} from 'three';

class Star extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        let starGeo = new SphereGeometry( 0.1, 32, 32 );
        let geo = new Geometry();
        for ( var i = 0; i < 20; i ++ ) {
            var geometry = starGeo.clone();
            geometry.translate(
                90 * Math.random() - 45,
                15 * Math.random() + 10,
                -50
            )
            geo.merge(geometry)
        }
    
        // now we got 1 mega big mesh with 10 000 cubes in it
        var mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo), 
            new MeshPhongMaterial( {
                color: 0xffffff, 
                opacity: 0, 
                transparent: true,
        } ));

        this.add(mesh);
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