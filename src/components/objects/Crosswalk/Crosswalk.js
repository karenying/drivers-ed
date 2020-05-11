import {
    Group,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    BufferGeometry,
    Geometry
} from 'three';

class Crosswalk extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
            // gameSpeed: parent.gameSpeed,
            pause: false,
        };

        const geo = new Geometry();

        // center crosswalk stripe to cover yellow road stripe
        const stripeGeometry = new PlaneGeometry(0.3, 8);
        stripeGeometry.rotateX(Math.PI / 2);

        let centerStripe = stripeGeometry.clone();
        geo.merge(centerStripe);

        // right of center crosswalk stripe
        let offset = 0.55;
        for (let i = 0; i < 4; i++) {
            let stripe = stripeGeometry.clone();
            stripe.translate(0 + offset, 0, 0);
            geo.merge(stripe);
            offset += 0.55;
        }
        
        // left of center crosswalk stripe
        offset = 0.55;
        for (let i = 0; i < 4; i++) {
            let stripe = stripeGeometry.clone();
            stripe.translate(0 - offset, 0, 0);
            geo.merge(stripe)
            offset += 0.55;
        }

        // horizontal stripes
        const hozStripeGeometry = new PlaneGeometry(0.5, 5);
        const hozStripeGeometry2 = hozStripeGeometry.clone();
        hozStripeGeometry.rotateZ(Math.PI/2);
        hozStripeGeometry.rotateX(Math.PI/2);
        hozStripeGeometry.translate(0, 0.001, 4);
        geo.merge(hozStripeGeometry);
        hozStripeGeometry2.rotateZ(Math.PI/2);
        hozStripeGeometry2.rotateX(Math.PI/2);
        hozStripeGeometry2.translate(0, 0.001, -4);

        geo.merge(hozStripeGeometry2);

        const mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new  MeshBasicMaterial({
                color: 0xe0e0e0,
                side: DoubleSide,
            })
        )

        this.add(mesh);

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
