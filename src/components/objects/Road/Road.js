import {
    Group,
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    DoubleSide,
    Geometry,
    VertexColors
} from 'three';

class Road extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
            // gameSpeed: parent.gameSpeed,
            pause: false,
        };


        const planeGeometry = new PlaneGeometry(5, 350);
        const planeMaterial = new MeshStandardMaterial({
            color: 0x1f1f1f,
            side: DoubleSide,
        });

        let plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;
        this.add(plane);

        const geo = new Geometry();

        let offset = 0;
        for (let i = 0; i < 15; i++) {
            const stripeGeometry = new PlaneGeometry(0.2, 3);
            stripeGeometry.rotateX(Math.PI / 2);
            stripeGeometry.translate(0, 0.05, 30 - offset);
            geo.merge(stripeGeometry);
            offset += 15;
        }

        const stripeMesh1 = new Mesh(
            geo,
            new  MeshStandardMaterial({
                color: 0xfad201,
                side: DoubleSide,
            })
        )

        const stripeMesh2 = new Mesh(
            geo,
            new  MeshStandardMaterial({
                color: 0xfad201,
                side: DoubleSide,
            })
        )
        stripeMesh2.position.set(0, 0, -195)

        this.add(
            stripeMesh1,
            stripeMesh2
        );

        parent.addToUpdateList(this);
    }

    update() {
        const { cameraPosition } = this.state;
        this.children[1].position.z += this.parent.gameSpeed;
        this.children[2].position.z += this.parent.gameSpeed;

        if (this.children[1].position.z > cameraPosition.z) {
            this.children[1].position.z -= 30;
        }

        if (this.children[2].position.z > cameraPosition.z) {
            this.children[2].position.z -= 30;
        }
    }
}

export default Road;
