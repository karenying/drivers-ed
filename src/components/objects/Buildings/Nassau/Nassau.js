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

const roofMat = new MeshToonMaterial({
    color: Colors.gray,
    flatShading: true,
});

const sandstoneMat = new MeshToonMaterial({
    color: Colors.sandstone,
    flatShading: true,
});

const cementMat = new MeshToonMaterial({
    color: Colors.cement,
    flatShading: true,
    side: DoubleSide,
});

const windowMat = new MeshToonMaterial({
    color: Colors.gray,
    transparent: true,
    opacity: 0.6,
    side: DoubleSide,
});

const greenMat = new MeshToonMaterial({
    color: Colors.green,
    flatShading: true,
});

const blueMat = new MeshToonMaterial({
    color: Colors.blue,
    flatShading: true,
    side: DoubleSide,
});

function makeMesh(geo, mat, dx, dy, dz) {
    let mesh = new Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(dx, dy, dz);
    return mesh;
}

function makeWindow(x, y, geo, mat, object) {
    for (let i = 0; i < 4; i++) {
        let xCoord;
        let yCoord = y;
        if (i % 2 == 1) {
            xCoord = -x;
        } else {
            xCoord = x;
        }
        if (i >= 2) {
            yCoord = -y;
        }
        let pane = makeMesh(geo, mat, xCoord, yCoord, -0.01);
        object.add(pane);
    }
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

function makeTriangleRoof(object, x) {
    object.vertices[5].x += x;
    object.vertices[4].x += x;
    object.vertices[0].x -= x;
    object.vertices[1].x -= x;
}
class Nassau extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
        };

        this.name = 'nassau';

        this.init();

        this.position.set(-6.5, 1, -50);
        this.rotation.y = -Math.PI / 2;
        parent.addToUpdateList(this);
    }

    init() {
        // Nassau Hall

        // main building
        let buildingGeo = new BoxGeometry(8, 2, 3);
        let building = makeMesh(buildingGeo, sandstoneMat, 0, 0, 0);
        let building2Geo = new BoxGeometry(2, 2, 0.5);
        let building2 = makeMesh(building2Geo, sandstoneMat, 0, 0, -1.75);

        // roof
        let roofGeo = new BoxGeometry(8, 0.5, 3);
        makeRoof(roofGeo, 1, 1);
        let roof = makeMesh(roofGeo, roofMat, 0, 1.25, 0);
        let roof2Geo = new BoxGeometry(2, 0.5, 0.5);
        makeTriangleRoof(roof2Geo, 1);
        let roof2 = makeMesh(roof2Geo, roofMat, 0, 1.25, 0);
        let roof2ColorGeo = new BoxGeometry(2, 0.5, 0.001);
        roof2ColorGeo.vertices[0].x -= 1;
        roof2ColorGeo.vertices[1].x -= 1;
        roof2ColorGeo.vertices[5].x += 1;
        roof2ColorGeo.vertices[4].x += 1;
        let roof2Color = makeMesh(roof2ColorGeo, sandstoneMat, 0, 0, -0.25);
        roof2.add(roof2Color);
        building2.add(roof2);
        building.add(roof, building2);

        // tower
        let towerGeo = new BoxGeometry(1.5, 1.5, 2);
        makeTriangleRoof(towerGeo, 0.3);
        let tower = makeMesh(towerGeo, cementMat, 0, 1.25, 0);
        let shaftGeo = new CylinderGeometry(0.1, 0.1, 1.5, 5);
        let shaft = makeMesh(shaftGeo, cementMat, 0.25, 1.25, 0);
        let shaft2 = makeMesh(shaftGeo, cementMat, -0.25, 1.25, 0);
        let shaft3 = makeMesh(shaftGeo, cementMat, 0, 1.25, -0.3);
        let shaft4 = makeMesh(shaftGeo, cementMat, 0, 1.25, 0.3);
        let topBoxGeo = new BoxGeometry(0.75, 0.2, 1);
        let topBox = makeMesh(topBoxGeo, cementMat, 0, 2, 0);
        let topGeo = new BoxGeometry(0.75, 0.75, 1);
        makeTriangleRoof(topGeo, 0.2);
        let top = makeMesh(topGeo, greenMat, 0, 2.45, 0);
        tower.add(shaft, shaft2, shaft3, shaft4, topBox, top);
        building.add(tower);

        // door
        let doorGeo = new PlaneGeometry(0.5, 1, 0.01);
        let door = makeMesh(doorGeo, blueMat, 0, -0.5, -2.01);
        building.add(door);

        // window
        let windowGeo = new PlaneGeometry(0.2, 0.3, 0.01);
        let windowPaneGeo = new PlaneGeometry(0.08, 0.1, 0.01);
        let x = 3.75;
        for (let i = 0; i < 8; i++) {
            let topWindow = makeMesh(windowGeo, cementMat, x, 0.6, -1.51);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, topWindow);
            let middleWindow = makeMesh(windowGeo, cementMat, x, 0, -1.51);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, middleWindow);
            let bottomWindow = makeMesh(windowGeo, cementMat, x, -0.6, -1.51);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, bottomWindow);
            building.add(topWindow, middleWindow, bottomWindow);
            x -= 0.35;
        }
        x = 0.8;
        for (let i = 0; i < 2; i++) {
            let topWindow = makeMesh(windowGeo, cementMat, x, 0.6, -2.01);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, topWindow);
            let middleWindow = makeMesh(windowGeo, cementMat, x, 0, -2.01);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, middleWindow);
            let bottomWindow = makeMesh(windowGeo, cementMat, x, -0.6, -2.01);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, bottomWindow);
            building.add(topWindow, middleWindow, bottomWindow);
            x -= 0.35;
        }

        x = -3.75;
        for (let i = 0; i < 8; i++) {
            let topWindow = makeMesh(windowGeo, cementMat, x, 0.6, -1.51);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, topWindow);
            let middleWindow = makeMesh(windowGeo, cementMat, x, 0, -1.51);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, middleWindow);
            let bottomWindow = makeMesh(windowGeo, cementMat, x, -0.6, -1.51);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, bottomWindow);
            building.add(topWindow, middleWindow, bottomWindow);
            x += 0.35;
        }

        x = -0.8;
        for (let i = 0; i < 2; i++) {
            let topWindow = makeMesh(windowGeo, cementMat, x, 0.6, -2.01);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, topWindow);
            let middleWindow = makeMesh(windowGeo, cementMat, x, 0, -2.01);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, middleWindow);
            let bottomWindow = makeMesh(windowGeo, cementMat, x, -0.6, -2.01);
            makeWindow(0.05, 0.06, windowPaneGeo, windowMat, bottomWindow);
            building.add(topWindow, middleWindow, bottomWindow);
            x += 0.35;
        }

        let bigWindowGeo = new PlaneGeometry(0.5, 0.7, 0.01);
        let bigWindow = makeMesh(bigWindowGeo, cementMat, 0, 0.5, -2.01);
        let bigPlaneGeo = new PlaneGeometry(0.2, 0.3, 0.01);
        makeWindow(0.125, 0.175, bigPlaneGeo, windowMat, bigWindow);
        building.add(bigWindow);
        this.add(building);
    }

    update(timestamp) {
        const { cameraPosition } = this.state;

        this.position.z++;

        if (this.position.z > cameraPosition.z + 10) {
            this.position.z -= 60;
        }
    }
}

export default Nassau;
