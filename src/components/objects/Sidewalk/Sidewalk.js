import {
    Group,
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    DoubleSide,
} from 'three';

class Road extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
            gameSpeed: parent.gameSpeed,
            pause: false,
        };

        const planeGeometry = new PlaneGeometry(3, 200);
        const planeMaterial = new MeshStandardMaterial({
            color: 0x7d7163,
            side: DoubleSide,
        });

        let plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;

        const stripeGeometry = new PlaneGeometry(0.1, 3);
        const stripeMaterial = new MeshStandardMaterial({
            color: 0x524940,
            side: DoubleSide,
        });

        let stripe1 = new Mesh(stripeGeometry, stripeMaterial);
        stripe1.rotation.x = Math.PI / 2;
        stripe1.rotation.z = Math.PI / 2;
        stripe1.position.y = 0.01;
        stripe1.position.z = 6;

        let stripe2 = new Mesh(stripeGeometry, stripeMaterial);
        stripe2.rotation.x = Math.PI / 2;
        stripe2.rotation.z = Math.PI / 2;
        stripe2.position.y = 0.01;
        stripe2.position.z = 18;

        this.add(plane, stripe1, stripe2);
        parent.addToUpdateList(this);
    }

    update(timestamp) {
        const { cameraPosition, gameSpeed, pause } = this.state;
        this.position.z += gameSpeed;

        if (this.position.z > cameraPosition.z + 10) {
            this.position.z -= 200;
        }
    }
}

export default Road;
