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


        const planeGeometry = new PlaneGeometry(5, 100);
        const planeMaterial = new MeshStandardMaterial({
            color: 0x1f1f1f,
            side: DoubleSide,
        });

        let plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;
        this.add(plane);

        let offset = 0;
        for (let i = 0; i < 6; i++) {
            const stripeGeometry = new PlaneGeometry(0.2, 3);
            const stripeMaterial = new MeshStandardMaterial({
                color: 0xfad201,
                side: DoubleSide,
            });

            let stripe = new Mesh(stripeGeometry, stripeMaterial);
            stripe.rotation.x = Math.PI / 2;
            stripe.position.set(0, 0.05, -30 + offset)
            this.add(stripe);
            offset += 15;
        }
        parent.addToUpdateList(this);
    }

    update() {
        const { cameraPosition, gameSpeed, pause } = this.state;
        this.position.z += gameSpeed;

        if (this.position.z > cameraPosition.z + 50) {
            this.position.z -= 270;
        }
    }
}

export default Road;
