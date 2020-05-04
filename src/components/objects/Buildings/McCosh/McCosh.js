import {
    Group,
    Mesh,
    MeshToonMaterial,
    PlaneGeometry,
    BoxGeometry,
    DoubleSide,
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

const stoneMat = new MeshToonMaterial({
    color: Colors.darkgray,
    flatShading: true,
});

const stone2Mat = new MeshToonMaterial({
    color: Colors.lightgray,
    flatShading: true,
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

class McCosh extends Group {
    constructor(parent) {
        super();

        this.name = 'mccosh';

        this.init();
    }

    init() {
        let buildingGeo = new BoxGeometry(10, 3, 3);
        let building = makeMesh(buildingGeo, stone2Mat, 0, 0, 0);
        let topGeo = new BoxGeometry(10, 0.5, 3);
        let top = makeMesh(topGeo, stoneMat, 0, 1.75, 0);

        let turretGeo = new BoxGeometry(0.5, 0.5, 0.5);
        let turret = makeMesh(turretGeo, stoneMat, 4.75, 0.5, -1.25);
        let turret2 = makeMesh(turretGeo, stoneMat, 0, 0, 2.5);
        turret.add(turret2);
        let x = -0.8625;
        for (let i = 0; i < 11; i++) {
            let newTurret = makeMesh(turretGeo, stoneMat, x, 0, 0);
            turret.add(newTurret);
            newTurret = makeMesh(turretGeo, stoneMat, x, 0, 2.5);
            turret.add(newTurret);
            x -= 0.8625;
        }

        top.add(turret);
        building.add(top);

        // window
        let windowFrameGeo = new PlaneGeometry(0.5, 1, 0.01);
        let smallWindowGeo = new PlaneGeometry(0.5, 0.5, 0.01);
        let windows = makeMesh(windowFrameGeo, windowMat, 4, 0.75, -1.51);
        let smallWindow = makeMesh(smallWindowGeo, windowMat, 0, -1.25, 0);
        let windowPaneGeo = new PlaneGeometry(0.15, 0.4, 0.01);
        let smallPaneGeo = new PlaneGeometry(0.15, 0.15, 0.01);
        makeWindow(0.1, 0.225, windowPaneGeo, cementMat, windows);
        makeWindow(0.1, 0.1, smallPaneGeo, cementMat, smallWindow);
        windows.add(smallWindow);
        x = 1;
        for (let i = 0; i < 8; i++) {
            let newWindow = makeMesh(windowFrameGeo, windowMat, -x, 0, 0);
            makeWindow(0.1, 0.225, windowPaneGeo, cementMat, newWindow);
            windows.add(newWindow);
            let newSmall = makeMesh(smallWindowGeo, windowMat, -x, 0, 0);
            makeWindow(0.1, 0.1, smallPaneGeo, cementMat, newSmall);
            smallWindow.add(newSmall);
            x += 1;
        }

        let bigWindowGeo = new PlaneGeometry(1, 2, 0.01);
        let bigWindow1 = makeMesh(bigWindowGeo, windowMat, 5.01, 0, 0);
        let bigWindow2 = makeMesh(bigWindowGeo, windowMat, -5.01, 0, 0);
        let bigPaneGeo = new PlaneGeometry(0.4, 0.9, 0.01);
        makeWindow(0.25, 0.5, bigPaneGeo, cementMat, bigWindow1);
        makeWindow(0.25, 0.5, bigPaneGeo, cementMat, bigWindow2);
        bigWindow1.rotateY((3 * Math.PI) / 2);
        bigWindow2.rotateY(Math.PI / 2);
        building.add(windows, bigWindow1, bigWindow2);
        this.add(building);
    }
}

export default McCosh;
