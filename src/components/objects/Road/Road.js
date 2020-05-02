import { Group, BoxGeometry, ConeGeometry, Mesh, MeshLambertMaterial } from 'three';

class Road extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        var material = new MeshLambertMaterial({
            color: 0x1f1e1e,
            flatShading: true,
        });

        var boxGeometry = new BoxGeometry(500, 2, 15);
        var road = new Mesh(boxGeometry, material);
        this.add(road);
    }
}

export default Road;