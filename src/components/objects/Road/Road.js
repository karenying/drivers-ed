import { Group, BoxGeometry, ConeGeometry, Mesh, MeshLambertMaterial } from 'three';

class Road extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        var material = new MeshLambertMaterial({
            color: 0x3b3b3b,
            flatShading: true,
        });

        var coneGeometry = new ConeGeometry(2, 100, 40);
        var road = new Mesh(coneGeometry, material);

        this.add(road);
    }
}

export default Road;