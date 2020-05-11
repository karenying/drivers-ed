import { Group, BoxGeometry, MeshToonMaterial, Mesh, BufferGeometry } from 'three';

function createBox(x, y, z, materials) {
    var boxGeometry = new BufferGeometry().fromGeometry(new BoxGeometry(x, y, z));
    var box = new Mesh(boxGeometry, materials);
    return box;
}

function createWindowRow(windowGeometry, materials, face, offset) {
    // var windowGeometry = new BufferGeometry().fromGeometry(new BoxGeometry(x, y, z));
    var window1 = new Mesh(windowGeometry, materials.window);
    window1.position.set(-1.5, 18 - offset, -8);
    face.add(window1);

    var window2 = new Mesh(windowGeometry, materials.window);
    window2.position.set(-1.5, 18 - offset, 0);
    face.add(window2);

    var window3 = new Mesh(windowGeometry, materials.window);
    window3.position.set(-1.5, 18 - offset, 8);
    face.add(window3);
}

function createFace(materials) {
    var face = createBox(5, 70, 25, materials.stone);

    var leftLeg = createBox(3, 15, 3, materials.stone);
    face.add(leftLeg);
    leftLeg.position.set(-0.5, -40.5, -11);

    var rightLeg = createBox(3, 15, 3, materials.stone);
    face.add(rightLeg);
    rightLeg.position.set(-0.5, -40.5, 11);

    var bottomWindow = createBox(3, 4, 15, materials.window);
    face.add(bottomWindow);
    bottomWindow.position.set(1, -40, 0);

    var topWindows = createBox(3, 4, 20, materials.window);
    face.add(topWindows);
    topWindows.position.set(-1.5, 25, 0);

    var offset = 0;
    var windowGeometry = new BufferGeometry().fromGeometry(new BoxGeometry(3, 4, 5));
    for (var i = 0; i < 9; i++) {
        createWindowRow(windowGeometry, materials, face, offset);
        offset += 6;
    }

    return face;
}

class Fine extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position
            // gameSpeed: parent.gameSpeed,
        };

        var materials = {
            stone: new MeshToonMaterial({
                color: 0x63502c,
                flatShading: true,
            }),
            window: new MeshToonMaterial({
                color: 0x406e66,
                flatShading: true,
            }),
            main: new MeshToonMaterial({
                color: 0x695735,
                flatShading: true,
            }),
        };

        // main building
        var mainBuilding = createBox(30, 80, 30, materials.main);
        mainBuilding.name = 'main building';

        var face1 = createFace(materials);
        face1.position.set(-16, 8, 0);
        mainBuilding.add(face1);

        var face2 = createFace(materials);
        face2.rotation.y = Math.PI / 2;
        mainBuilding.add(face2);
        face2.position.set(0, 8, 16);

        var face3 = createFace(materials);
        face3.rotation.y = -(Math.PI / 2);
        mainBuilding.add(face3);
        face3.position.set(0, 8, -16);

        var face4 = createFace(materials);
        face4.rotation.y = Math.PI;
        mainBuilding.add(face4);
        face4.position.set(16, 8, 0);

        this.add(mainBuilding);

        this.scale.set(0.15, 0.15, 0.15);
        this.position.set(12, 6, 15);
        parent.addToUpdateList(this);
    }

    update(timestamp) {
        const { cameraPosition } = this.state;
        this.position.z += this.parent.gameSpeed;


        if (this.position.z > cameraPosition.z) {
            this.position.z -= 200;
        }
    }
}

export default Fine;
