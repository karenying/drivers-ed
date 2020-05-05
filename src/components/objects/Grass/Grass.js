import {
    Group,
    PlaneGeometry,
    Mesh,
    DoubleSide,
    TextureLoader,
    RepeatWrapping,
    MeshLambertMaterial,
} from 'three';

class Grass extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
        };

        const loader = new TextureLoader();
        loader.load('./src/components/objects/Grass/grass.png', (texture) => {
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;

            texture.repeat.set(100, 200);
            let material = new MeshLambertMaterial({
                map: texture,
                side: DoubleSide,
            });
            const geometry = new PlaneGeometry(100, 200);
            let plane = new Mesh(geometry, material);
            plane.rotation.x = Math.PI / 2;
            plane.position.set(0, -0.05, 0);

            this.add(plane);
            parent.addToUpdateList(this);
        });
    }

    update(timestamp) {
        const { cameraPosition } = this.state;

        // this.position.z += 0.5;

        // if (this.position.z > cameraPosition.z + 10) {
        //     this.position.z -= 200;
        // }
    }
}

export default Grass;
