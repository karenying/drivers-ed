import {
    Group,
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    DoubleSide,
    BufferGeometry
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

        // center crosswalk stripe to cover yellow road stripe
        const stripeGeometry = new BufferGeometry().fromGeometry(
          new PlaneGeometry(0.3, 8));
        let centerStripe = new Mesh(stripeGeometry, stripeMaterial);
        centerStripe.rotation.x = Math.PI / 2;
        this.add(centerStripe);

        // right of center crosswalk stripe
        let offset = 0.55;
        for (let i = 0; i < 4; i++) {
            let stripe = new Mesh(stripeGeometry, stripeMaterial);
            stripe.position.set(0 + offset, 0, 0)
            centerStripe.add(stripe);
            offset += 0.55;
        }
        
        // left of center crosswalk stripe
        offset = 0.55;
        for (let i = 0; i < 4; i++) {
            let stripe = new Mesh(stripeGeometry, stripeMaterial);
            stripe.position.set(0 - offset, 0, 0)
            centerStripe.add(stripe);
            offset += 0.55;
        }

        // horizontal stripes
        const hozStripeGeometry = new BufferGeometry().fromGeometry(
          new PlaneGeometry(0.5, 5));
        let hoz1 = new Mesh(hozStripeGeometry, stripeMaterial);
        centerStripe.add(hoz1);
        hoz1.position.set(0, -4, 0.001);
        hoz1.rotation.z = Math.PI/2;

        let hoz2 = new Mesh(hozStripeGeometry, stripeMaterial);
        centerStripe.add(hoz2);
        hoz2.position.set(0, 4, 0.001);
        hoz2.rotation.z = Math.PI/2;

        parent.addToUpdateList(this);
    }

    update() {
        const { cameraPosition } = this.state;
        this.position.z += this.parent.gameSpeed;

        if (this.position.z > cameraPosition.z) {
            this.position.z = this.parent.currCrosswalkPos;
        }
    }
}

export default Crosswalk;
