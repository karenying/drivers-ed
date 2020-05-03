import {
    Group,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    BoxGeometry,
} from 'three';

class Road extends Group {
    constructor(parent, color) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
        };
        const planeGeometry = new PlaneGeometry(3, 20, 30);
        const planeMaterial = new MeshBasicMaterial({
            color,
            side: DoubleSide,
        });

        let plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;

        this.add(plane);

        parent.addToUpdateList(this);
        // console.log(typeof this);
    }

    update(timeStamp) {
        const { cameraPosition } = this.state;

        if (this.position.z > cameraPosition.z) {
            this.position.z -= 80;
        }
    }
}

export default Road;
