import {
    Group,
    Mesh,
    MeshToonMaterial,
    PlaneGeometry,
    BoxGeometry,
    DoubleSide,
    CylinderGeometry,
} from 'three';

var Colors = {
    brick: 0x822e00,
    gray: 0x242424,
    white: 0xffebc4,
    cement: 0xdbca9a,
    wood: 0x4d2800,
    darkGreen: 0x00472e,
    brown: 0x4a2a0a,
    sandstone: 0x8f7d5b,
    green: 0x739c8d,
    blue: 0x27255c,
    darkgray: 0x8f8f8f,
    lightgray: 0x969696,
};

// materials
const buildingMat = new MeshToonMaterial({
    color: Colors.brick,
    flatShading: true,
});

const roofMat = new MeshToonMaterial({
    color: Colors.gray,
    flatShading: true,
});

const doorMat = new MeshToonMaterial({
    color: Colors.white,
    side: DoubleSide,
    opacity: 0.7,
    transparent: true,
});

function makeMesh(geo, mat, dx, dy, dz) {
    let mesh = new Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(dx, dy, dz);
    return mesh;
}

function makeRoof(object, x, z) {
    object.vertices[0].z -= z;
    object.vertices[0].x -= x;
    object.vertices[1].z += z;
    object.vertices[1].x -= x;
    object.vertices[5].z -= z;
    object.vertices[5].x += x;
    object.vertices[4].z += z;
    object.vertices[4].x += x;
}

class Colonial extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
<<<<<<< HEAD
=======
            gameSpeed: parent.gameSpeed,
>>>>>>> origin/master
        };

        this.name = 'colonial';

        this.init();

        this.position.set(5, 1, -70);
        this.rotation.y = Math.PI / 2;
        parent.addToUpdateList(this);
    }

    init() {
        // Colonial Club
        // base of building
        let buildingGeo = new BoxGeometry(6, 1.7, 3);
        let building = makeMesh(buildingGeo, buildingMat, 0, 0, 0);

        // doors
        let doorGeo = new PlaneGeometry(0.4, 0.7, 0.2);
        let windowGeo = new PlaneGeometry(0.2, 0.3, 0.2);

        let doors = makeMesh(doorGeo, doorMat, 0, -0.45, -1.6);
        let door2 = makeMesh(doorGeo, doorMat, 0.2, 0, 0.01);
        let door3 = makeMesh(doorGeo, doorMat, 1, 0, 0);
        let door4 = makeMesh(doorGeo, doorMat, -1, 0, 0);
        let door5 = makeMesh(doorGeo, doorMat, 2, 0, 0);
        let door6 = makeMesh(doorGeo, doorMat, -2, 0, 0);

        // make windows
        let windows = makeMesh(windowGeo, doorMat, -2.4, 0.4, -1.51);
        let xDist = 0.6;
        for (let i = 0; i < 8; i++) {
            if (xDist == 0) {
                xDist += 0.6;
                continue;
            }
            let newWindow = makeMesh(windowGeo, doorMat, xDist, 0, 0.0);
            windows.add(newWindow);
            xDist += 0.6;
        }
        doors.add(door3, door4, door5, door6);
        this.add(building, doors, windows);

        // roof
        let roofGeo = new BoxGeometry(6, 1, 3);
        makeRoof(roofGeo, 1, 1);
        let roof = makeMesh(roofGeo, roofMat, 0, 1.5, 0);
        roof.name = 'roof';

        let awningGeo = new BoxGeometry(6, 0.2, 3);
        let awningMat = new MeshToonMaterial({
            color: Colors.white,
            flatShading: true,
        });
        let awning = makeMesh(awningGeo, awningMat, 0, -0.55, 0);

        let chimneyGeo = new CylinderGeometry(0.2, 0.2, 1.8);
        let chimney = makeMesh(chimneyGeo, buildingMat, -2, 0, 1);

        roof.add(awning, chimney);
        // small white roof
        let roof2Geo = new BoxGeometry(3, 1, 0.5);
        roof2Geo.vertices[5].x += 1.5;
        roof2Geo.vertices[4].x += 1.5;
        roof2Geo.vertices[0].x -= 1.5;
        roof2Geo.vertices[1].x -= 1.5;
        let roof2Mat = new MeshToonMaterial({
            color: Colors.white,
            flatShading: true,
        });
        let roof2 = makeMesh(roof2Geo, roof2Mat, 0, 1.3, -1.7);

        let pillarGeo = new CylinderGeometry(0.1, 0.1, 1.7);
        let pillarMat = new MeshToonMaterial({
            color: Colors.white,
            flatShading: true,
        });
        let pillar = makeMesh(pillarGeo, pillarMat, 1.2, 0, -1.8);
        let pillarTwo = makeMesh(pillarGeo, pillarMat, -0.8, 0, 0);
        let pillarThree = makeMesh(pillarGeo, pillarMat, -1.6, 0, 0);
        let pillarFour = makeMesh(pillarGeo, pillarMat, -2.4, 0, 0);
        pillar.add(pillarTwo, pillarThree, pillarFour);
        this.add(roof, roof2, pillar);
    }

    update(timestamp) {
<<<<<<< HEAD
        const { cameraPosition } = this.state;

        this.position.z += 0.5;
=======
        const { cameraPosition, gameSpeed } = this.state;

        this.position.z += gameSpeed;
>>>>>>> origin/master

        if (this.position.z > cameraPosition.z + 10) {
            this.position.z -= 90;
        }
    }
}

export default Colonial;
