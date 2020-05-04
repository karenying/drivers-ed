import {
    Group,
    Mesh,
    MeshToonMaterial,
    PlaneGeometry,
    BoxGeometry,
    CircleGeometry,
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

const woodMat = new MeshToonMaterial({
    color: Colors.wood,
    flatShading: true,
    side: DoubleSide,
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

function createCylinder(x, y, z, s, color, dx, dy, dz) {
    let geo = new CylinderGeometry(x, y, z, s);
    let mat = new MeshToonMaterial({
        color: color,
        flatShading: true,
    });
    let mesh = new Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(dx, dy, dz);
    return mesh;
}

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

class Cap extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
        };

        this.name = 'cap';

        this.init();
        this.position.set(6.5, 1.5, -50);
        this.rotation.y = Math.PI / 2;
        parent.addToUpdateList(this);
    }

    init() {
        // Cap and Gown Club
        // shapes
        let buildingGeo = new BoxGeometry(7, 3, 3);
        let building = makeMesh(buildingGeo, buildingMat, 0, 0, 0);

        // make door
        let doorFrameGeo = new BoxGeometry(1.25, 1.5, 0.1);
        let doorFrame = makeMesh(doorFrameGeo, cementMat, 0, -0.75, -1.51);
        let doorGeo = new PlaneGeometry(0.75, 0.7, 0.01);
        let doorTopGeo = new CircleGeometry(0.375, 32);
        let doorTop = makeMesh(doorTopGeo, woodMat, 0, 0.3, 0);
        let door = makeMesh(doorGeo, woodMat, 0, -0.4, -0.06);
        door.add(doorTop);
        doorFrame.add(door);

        // windows
        let topWindowFrameGeo = new PlaneGeometry(0.6, 0.8, 0.01);
        let topWindow = makeMesh(topWindowFrameGeo, cementMat, 0, 0.6, -1.51);

        // front door window
        let windowPaneGeo = new PlaneGeometry(0.25, 0.35, 0.01);
        makeWindow(0.15, 0.2, windowPaneGeo, windowMat, topWindow);

        let shift = 1.2;
        let rightWindow = makeMesh(topWindowFrameGeo, cementMat, 1, 0, 0);
        makeWindow(0.15, 0.2, windowPaneGeo, windowMat, rightWindow);
        topWindow.add(rightWindow);
        for (let i = 0; i < 3; i++) {
            let newWindow = makeMesh(
                topWindowFrameGeo,
                cementMat,
                -shift,
                0,
                0
            );
            makeWindow(0.15, 0.2, windowPaneGeo, windowMat, newWindow);
            let newWindow2 = makeMesh(
                topWindowFrameGeo,
                cementMat,
                -shift,
                -1.25,
                0
            );
            makeWindow(0.15, 0.2, windowPaneGeo, windowMat, newWindow2);
            topWindow.add(newWindow, newWindow2);
            shift += 0.9;
        }
        // side windows
        let sideWindow1 = makeMesh(topWindowFrameGeo, cementMat, 2.5, 1, -3.01);
        makeWindow(0.15, 0.2, windowPaneGeo, windowMat, sideWindow1);
        let largeWindowGeo = new PlaneGeometry(1.2, 1.2, 0.01);
        let sideWindow2 = makeMesh(largeWindowGeo, cementMat, 2.5, -0.5, -3.01);
        let squareWindowGeo = new PlaneGeometry(0.5, 0.5, 0.01);
        makeWindow(0.27, 0.27, squareWindowGeo, windowMat, sideWindow2);
        building.add(doorFrame, topWindow, sideWindow1, sideWindow2);

        // roof
        let roof1Geo = new BoxGeometry(7, 1, 3);
        //adjust roof verts
        makeRoof(roof1Geo, 1, 1);
        let chimney1Geo = new CylinderGeometry(0.3, 0.3, 2, 4);
        chimney1Geo.rotateY(Math.PI / 4);
        let chimney1 = makeMesh(chimney1Geo, buildingMat, 1.5, -0.5, -1.3);
        let roof1 = makeMesh(roof1Geo, roofMat, 0, 2, 0);
        roof1.add(chimney1);
        building.add(roof1);

        // make left annex building
        let annexGeo = new BoxGeometry(2, 3, 2);
        let annex = makeMesh(annexGeo, buildingMat, 2.5, 0, -2);
        let annexRoofGeo = new BoxGeometry(2, 1, 2);
        // fix annex roof geo
        makeTriangleRoof(annexRoofGeo, 1);
        annexRoofGeo.vertices[0].z += 0.5;
        annexRoofGeo.vertices[2].z -= 0.5;
        let annexRoof = makeMesh(annexRoofGeo, roofMat, 0, 2, 0);
        let annexRoof2Geo = new BoxGeometry(2, 1, 0.001);
        annexRoof2Geo.vertices[0].x -= 1;
        annexRoof2Geo.vertices[1].x -= 1;
        annexRoof2Geo.vertices[5].x += 1;
        annexRoof2Geo.vertices[4].x += 1;
        let annexRoof2 = makeMesh(annexRoof2Geo, buildingMat, 0, -0.01, -1.0);
        annexRoof.add(annexRoof2);
        annex.add(annexRoof);
        building.add(annex);

        // tree
        let tree = createCylinder(
            0.15,
            0.15,
            1.5,
            18,
            Colors.brown,
            0.75,
            -1.2,
            -1.7
        );
        let branch = createCylinder(
            0.02,
            0.09,
            0.6,
            18,
            Colors.brown,
            0,
            0.2,
            0.3
        );
        let leaves = createCylinder(
            1,
            0.6,
            1.2,
            8,
            Colors.darkGreen,
            0,
            1.25,
            0
        );
        branch.geometry.rotateX(Math.PI / 4);
        tree.add(branch, leaves);
        tree.rotateY(Math.PI / 4);
        tree.scale.set(0.5, 0.6, 0.5);
        this.add(building, tree);
    }

    update(timestamp) {
        const { cameraPosition } = this.state;

        this.position.z += 0.5;

        if (this.position.z > cameraPosition.z + 10) {
            this.position.z -= 90;
        }
    }
}

export default Cap;
