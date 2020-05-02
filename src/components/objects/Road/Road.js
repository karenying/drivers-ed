import {
    Group,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    BoxGeometry,
} from 'three';

class Road extends Group {
    constructor(parent) {
        super();

        const planeGeometry = new PlaneGeometry(3, 20, 30);
        const planeMaterial = new MeshBasicMaterial({
            color: 0x808080,
            side: DoubleSide,
        });

        let plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;
        plane.rotation.z = Math.PI / 6;

        const cubeGeometry = new BoxGeometry(0.5, 0.5, 0.5);
        const cubeMaterial = new MeshBasicMaterial({ color: 0xffffff });
        let cube = new Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(1, 0.25, 0);
        cube.rotation.x = Math.PI / 2;
        cube.rotation.z = Math.PI / 6;

        this.add(plane, cube);

        parent.addToUpdateList(this);
    }
}

export default Road;
