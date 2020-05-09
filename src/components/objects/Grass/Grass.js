import {
    Group,
    PlaneGeometry,
    Mesh,
    DoubleSide,
    TextureLoader,
    RepeatWrapping,
    MeshStandardMaterial,
} from 'three';

import grassImg from './grass.png';

class Grass extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position
            // gameSpeed: parent.gameSpeed,
        };

        const loader = new TextureLoader();
        loader.load(grassImg, (texture) => {
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;

            texture.repeat.set(100, 100);
            let material = new MeshStandardMaterial({
                map: texture,
                side: DoubleSide,
            });
            const geometry = new PlaneGeometry(100, 100);
            let plane = new Mesh(geometry, material);
            plane.rotation.x = Math.PI / 2;
            plane.position.set(0, -0.05, 0);

            this.add(plane);
            parent.addToUpdateList(this);
        });
    }

    update() {
        const { cameraPosition } = this.state;
        this.position.z += this.parent.gameSpeed;

        if (this.position.z > cameraPosition.z + 50) {
            this.position.z -= 270;
        }
    }
}

export default Grass;
