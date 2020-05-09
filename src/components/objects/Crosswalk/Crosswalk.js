import {
    Group,
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    DoubleSide,
} from 'three';

class Crosswalk extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
            // gameSpeed: parent.gameSpeed,
            pause: false,
        };

        const stripeMaterial = new MeshStandardMaterial({
            color: 0xe0e0e0,
            side: DoubleSide,
        });
        
        // horizontal stripes
        const hozStripeGeometry = new PlaneGeometry(0.5, 5);
        let hoz1 = new Mesh(hozStripeGeometry, stripeMaterial);
        hoz1.position.set(0, 0.056, -34);
        hoz1.rotation.z = Math.PI/2;
        hoz1.rotation.x = Math.PI/2;
        this.add(hoz1);

        let hoz2 = new Mesh(hozStripeGeometry, stripeMaterial);
        hoz2.position.set(0, 0.056, -26);
        hoz2.rotation.z = Math.PI/2;
        hoz2.rotation.x = Math.PI/2;
        this.add(hoz2);

        // center crosswalk stripe to cover yellow road stripe
        const stripeGeometry = new PlaneGeometry(0.3, 8);
        let stripe = new Mesh(stripeGeometry, stripeMaterial);
        stripe.rotation.x = Math.PI / 2;
        stripe.position.set(0, 0.055, -30)
        this.add(stripe);

        // right of center crosswalk stripe
        let offset = 0.55;
        for (let i = 0; i < 4; i++) {
            let stripe = new Mesh(stripeGeometry, stripeMaterial);
            stripe.rotation.x = Math.PI / 2;
            stripe.position.set(0 + offset, 0.055, -30)
            this.add(stripe);
            offset += 0.55;
        }
        
        // left of center crosswalk stripe
        offset = 0.55;
        for (let i = 0; i < 4; i++) {
            let stripe = new Mesh(stripeGeometry, stripeMaterial);
            stripe.rotation.x = Math.PI / 2;
            stripe.position.set(0 - offset, 0.055, -30)
            this.add(stripe);
            offset += 0.55;
        }
        parent.addToUpdateList(this);
    }

    update() {
        const { cameraPosition } = this.state;
        this.position.z += this.parent.gameSpeed;

        if (this.position.z > cameraPosition.z + 50) {
            this.position.z -= 270;
        }
    }
}

export default Crosswalk;
