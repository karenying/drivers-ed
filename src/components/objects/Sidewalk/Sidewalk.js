import {
    Group,
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    DoubleSide,
    Geometry,
} from 'three';

class Sidewalk extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
            // gameSpeed: parent.gameSpeed,
            pause: false,
        };

        const geoSidewalk = new Geometry();

        const leftGeometry = new PlaneGeometry(3, 350);
        leftGeometry.rotateX(Math.PI / 2);
        leftGeometry.translate(-4, 0, 0);
        geoSidewalk.merge(leftGeometry);

        const rightGeometry = new PlaneGeometry(3, 350);
        rightGeometry.rotateX(Math.PI / 2);
        rightGeometry.translate(4, 0, 0);
        geoSidewalk.merge(rightGeometry);

        const sidewalkMesh = new Mesh(
            geoSidewalk,
            new  MeshStandardMaterial({
                color: 0x3d3c3c,
                side: DoubleSide,
            })
        )
        this.add(sidewalkMesh);

        const geo = new Geometry();

        let offset = 0;
        for (let i = 0; i < 15; i++) {
            const leftStripeGeometry = new PlaneGeometry(0.1, 3);
            leftStripeGeometry.rotateX(Math.PI / 2);
            leftStripeGeometry.rotateY(Math.PI / 2);
            leftStripeGeometry.translate(4, 0.01, 30 - offset);

            const rightStripeGeometry = new PlaneGeometry(0.1, 3);
            rightStripeGeometry.rotateX(Math.PI / 2);
            rightStripeGeometry.rotateY(Math.PI / 2);
            rightStripeGeometry.translate(-4, 0.01, 30 - offset);

            geo.merge(leftStripeGeometry);
            geo.merge(rightStripeGeometry);
            offset += 15;
        }

        const stripeMesh1 = new Mesh(
            geo,
            new  MeshStandardMaterial({
                color: 0x1f1f1f,
                side: DoubleSide,
            })
        )
        const stripeMesh2 = new Mesh(
            geo,
            new  MeshStandardMaterial({
                color: 0x1f1f1f,
                side: DoubleSide,
            })
        )
        stripeMesh2.position.set(0, 0, -120);

        this.add(
            stripeMesh1,
            stripeMesh2
        );

        parent.addToUpdateList(this);
    }

    update() {
        const { cameraPosition, pause } = this.state;
        this.children[1].position.z += this.parent.gameSpeed;
        this.children[2].position.z += this.parent.gameSpeed;

        if (this.children[1].position.z > cameraPosition.z + 120) {
            this.children[1].position.z = -120;
        }

        if (this.children[2].position.z > cameraPosition.z + 120) {
            this.children[2].position.z = -120;
        }
    }
}

export default Sidewalk;
