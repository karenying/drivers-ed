import { Group, VertexColors, BufferGeometry, BoxGeometry, MeshToonMaterial, Mesh, Geometry} from "three";

function createBox(x, y, z, materials) {
    var boxGeometry = new BoxGeometry(x, y, z);
    var box = new Mesh(boxGeometry, materials);
    return box;
}

function createWindow(x, y, z, geo, windowGeometry, windowVertDividerGeometry, windowHozDividerGeometry, r) {
    let window = windowGeometry.clone();
    window.rotateY(r);
    window.translate(x, y, z);
    geo.merge(window);

    let windowDividerGeometryVert = windowVertDividerGeometry.clone();
    windowDividerGeometryVert.rotateY(r);
    windowDividerGeometryVert.translate(x, y, z);
    geo.merge(windowDividerGeometryVert);

    let windowDividerGeometryHoz = windowHozDividerGeometry.clone();
    windowDividerGeometryHoz.rotateY(r);
    windowDividerGeometryHoz.translate(x, y, z);
    geo.merge(windowDividerGeometryHoz);
}

class Firestone extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position
            // gameSpeed: parent.gameSpeed,
        };

        var colors = {
            stone: 0x5e5e5e,
            window: 0xadadad,
            gray: 0x474747,
            door: 0x333333,
            black: 0x000000,
        };

        const geo = new Geometry();

        // main building
        const mainBuilding = new BoxGeometry(30, 15, 70);
        mainBuilding.faces.forEach(f => f.color.set(colors.gray));
        geo.merge(mainBuilding);

        const windowGeometry1 = new BoxGeometry(4, 8, 5);
        windowGeometry1.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry1 = new BoxGeometry(4.25, 8.1, 0.1);
        windowVertDividerGeometry1.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry1 = new BoxGeometry(4.25, 0.1, 5.1);
        windowHozDividerGeometry1.faces.forEach(f => f.color.set(colors.black));

        let offset = 1;
        for (var i = 0; i < 7; i++) {
            createWindow(-13.5, 0, -30 + offset, geo, windowGeometry1, windowVertDividerGeometry1, windowHozDividerGeometry1, 0);
            offset += 6;
        }

        const sideWindow1 = new BoxGeometry(4, 10, 8);
        sideWindow1.faces.forEach(f => f.color.set(colors.window));
        const sideWindowVertDividerGeometry1 = new BoxGeometry(4.25, 10.1, 0.1);
        sideWindowVertDividerGeometry1.faces.forEach(f => f.color.set(colors.black));
        const sideWindowHozDividerGeometry1 = new BoxGeometry(4.25, 0.1, 8.1);
        sideWindowHozDividerGeometry1.faces.forEach(f => f.color.set(colors.black));

        createWindow(0, 0, -33.5, geo, sideWindow1, sideWindowVertDividerGeometry1, sideWindowHozDividerGeometry1, Math.PI/2);

        // lobby building 1
        const lobbyBuilding1 = new BoxGeometry(20, 20, 20);
        lobbyBuilding1.faces.forEach(f => f.color.set(colors.gray));
        lobbyBuilding1.translate(-10, 2.5, 20);
        geo.merge(lobbyBuilding1);

        const windowGeometry2 = new BoxGeometry(4, 2, 2);
        windowGeometry2.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry2 = new BoxGeometry(4.25, 2.1, 0.1);
        windowVertDividerGeometry2.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry2 = new BoxGeometry(4.25, 0.1, 2.1);
        windowHozDividerGeometry2.faces.forEach(f => f.color.set(colors.black));

        offset = 1;
        for (var i = 0; i < 3; i++) {
            createWindow(-18.5, 7.5 - offset, 15, geo, windowGeometry2, windowVertDividerGeometry2, windowHozDividerGeometry2, 0);
            offset += 3;
        }

        // lobby building 2
        const lobbyBuilding2 = new BoxGeometry(70, 30, 20);
        lobbyBuilding2.faces.forEach(f => f.color.set(colors.stone));
        lobbyBuilding2.translate(13, 7.5, 30);
        geo.merge(lobbyBuilding2)

        const windowGeometry3 = new BoxGeometry(4, 10, 2);
        windowGeometry3.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry3 = new BoxGeometry(4.25, 10.1, 0.1);
        windowVertDividerGeometry3.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry3 = new BoxGeometry(4.25, 0.1, 2.1);
        windowHozDividerGeometry3.faces.forEach(f => f.color.set(colors.black));

        offset = 1;
        for (var i = 0; i < 4; i++) {
            createWindow(-20.5, 12.5, 23 + offset, geo, windowGeometry3, windowVertDividerGeometry3, windowHozDividerGeometry3, 0);
            offset += 3;
        }

        // entrance
        const entrance = new BoxGeometry(10, 10, 20);
        entrance.faces.forEach(f => f.color.set(colors.stone));
        entrance.translate(-25, -2.5, 38);
        geo.merge(entrance)

        const door1 = new BoxGeometry(3, 7, 6);
        const door2 = door1.clone();
        door1.faces.forEach(f => f.color.set(colors.door));
        door1.translate(-29, -4, 43);
        geo.merge(door1)
        door2.faces.forEach(f => f.color.set(colors.door));
        door2.translate(-29, -4, 33);
        geo.merge(door2)

        // tower
        const tower = new BoxGeometry(15, 50, 15);
        tower.faces.forEach(f => f.color.set(colors.gray));
        tower.translate(-15, 17.5, 45)
        geo.merge(tower)

        const towerTip1 = new BoxGeometry(2, 4, 2);
        const towerTip2 = towerTip1.clone();
        const towerTip3 = towerTip1.clone();
        const towerTip4 = towerTip1.clone();
        towerTip1.faces.forEach(f => f.color.set(colors.stone));
        towerTip1.translate(-22, 43.5, 38);
        geo.merge(towerTip1)
        towerTip2.faces.forEach(f => f.color.set(colors.stone));
        towerTip2.translate(-8, 43.5, 53);
        geo.merge(towerTip2)
        towerTip3.faces.forEach(f => f.color.set(colors.stone));
        towerTip3.translate(-22, 43.5, 53);
        geo.merge(towerTip3)
        towerTip4.faces.forEach(f => f.color.set(colors.stone));
        towerTip4.translate(-8, 43.5, 38);
        geo.merge(towerTip4)

        const windowGeometry4 = new BoxGeometry(4, 5, 5);
        windowGeometry4.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry4 = new BoxGeometry(4.25, 5.1, 0.1);
        windowVertDividerGeometry4.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry4 = new BoxGeometry(4.25, 0.1, 5.1);
        windowHozDividerGeometry4.faces.forEach(f => f.color.set(colors.black));

        createWindow(-21, 22.5, 45, geo, windowGeometry4, windowVertDividerGeometry4, windowHozDividerGeometry4, 0);
        createWindow(-21, 12.5, 45, geo, windowGeometry4, windowVertDividerGeometry4, windowHozDividerGeometry4, 0);

        const windowGeometry5 = new BoxGeometry(4, 10, 4);
        windowGeometry5.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry5 = new BoxGeometry(4.25, 10.1, 0.1);
        windowVertDividerGeometry5.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry5 = new BoxGeometry(4.25, 0.1, 4.1);
        windowHozDividerGeometry5.faces.forEach(f => f.color.set(colors.black));

        createWindow(-21, 32.5, 45, geo, windowGeometry5, windowVertDividerGeometry5, windowHozDividerGeometry5, 0);
        createWindow(-15, 32.5, 39, geo, windowGeometry5, windowVertDividerGeometry5, windowHozDividerGeometry5, Math.PI/2);

        const mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        this.add(mesh);

        this.scale.set(0.25, 0.25, 0.25);
        this.position.set(-17, 2, 12);
        this.rotation.y = Math.PI;
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

export default Firestone;
