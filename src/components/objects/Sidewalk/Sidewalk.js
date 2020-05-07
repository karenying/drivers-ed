import {
    Group,
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    DoubleSide,
} from 'three';

class Sidewalk extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
            // gameSpeed: parent.gameSpeed,
            pause: false,
        };

        const planeGeometry = new PlaneGeometry(3, 100);
        const planeMaterial = new MeshStandardMaterial({
            color: 0x3d3c3c,
            side: DoubleSide,
        });

        let plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;

        const stripeGeometry = new PlaneGeometry(0.1, 3);
        const stripeMaterial = new MeshStandardMaterial({
            color: 0x1f1f1f,
            side: DoubleSide,
        });

        let offset = 0;
        for (let i = 0; i < 6; i++) {
            let stripe = new Mesh(stripeGeometry, stripeMaterial);
            stripe.rotation.x = Math.PI / 2;
            stripe.rotation.z = Math.PI / 2;

            stripe.position.set(0, 0.01, -30 + offset)
            this.add(stripe);
            offset += 15;
        }
        this.add(plane);
        parent.addToUpdateList(this);
    }

    update() {
        const { cameraPosition, pause } = this.state;
        this.position.z += this.parent.gameSpeed;

        if (this.position.z > cameraPosition.z + 50) {
            this.position.z -= 270;
        }
    }
}

export default Sidewalk;
