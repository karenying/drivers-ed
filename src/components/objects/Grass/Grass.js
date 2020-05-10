import {
    Group,
    CubeGeometry,
    PlaneGeometry,
    Mesh,
    DoubleSide,
    TextureLoader,
    RepeatWrapping,
    MeshStandardMaterial,
} from 'three';

class Grass extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position
            // gameSpeed: parent.gameSpeed,
        };

        // const loader = new TextureLoader();
        // loader.load(grassImg, (texture) => {
        //     texture.wrapS = RepeatWrapping;
        //     texture.wrapT = RepeatWrapping;
        //
        //     texture.repeat.set(100, 100);
        //     let material = new MeshStandardMaterial({
        //         map: texture,
        //         side: DoubleSide,
        //     });
        //   const planeGeometry = new PlaneGeometry(100, 100, 100, 120);
        //
        //   // Move the vertices by random.
        //   planeGeometry.vertices.map(function (vertex) {
        //     vertex.x += -.5 + Math.random() / 5;
        //     vertex.y += -.5 + Math.random() / 5;
        //     vertex.z = -.5 + Math.random() / 2;
        //     return vertex;
        //   });
        //
        //   // Update geometry.
        //   planeGeometry.computeFaceNormals();
        //
        //   // Create plane
        //   const plane = new Mesh(planeGeometry, material);
        //   plane.rotation.x = Math.PI / 2;
        //   plane.position.set(0, -0.5, 0);
        //   this.add(plane);
        //   parent.addToUpdateList(this);
        // });
        //
        let planeMaterial = new MeshStandardMaterial({
          color: 0x3c6b42,
          flatShading: true,
          side: DoubleSide,
        });
        // Create a geometry with N segments.
        const planeGeometry = new PlaneGeometry(100, 500, 100, 25);
        planeGeometry.vertices.map(function (vertex) {
          vertex.x += -.5 + Math.random() / 2;
          vertex.y += -.5 + Math.random() / 2;
          vertex.z = -.5 + Math.random() / 2;
          return vertex;
        });

        // Update geometry.
        planeGeometry.computeFaceNormals();

        // Create plane
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;
        plane.position.set(0, -0.5, 0);
        this.add(plane);
        parent.addToUpdateList(this);
    }

    update() {
        const { cameraPosition } = this.state;
        this.position.z += this.parent.gameSpeed;

        if (this.position.z > cameraPosition.z + 50) {
            this.position.z -= 300;
        }
    }
}

export default Grass;
