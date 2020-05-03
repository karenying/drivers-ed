import { Group, BoxGeometry, MeshLambertMaterial, Mesh} from "three";

function createBox(x, y, z, materials) {
    var boxGeometry = new BoxGeometry(x, y, z);
    var box = new Mesh(boxGeometry, materials);
    return box;
}

function createWindow(x, y, z, materials) {
    var windowGeometry = new BoxGeometry(x, y, z);
    var window = new Mesh(windowGeometry, materials.window);

    var windowDividerGeometryVert = new BoxGeometry(x + 1, y + 0.5, 0.5);
    var windowDividerVert = new Mesh(windowDividerGeometryVert, materials.black);

    var windowDividerGeometryHoz = new BoxGeometry(x + 1, 0.5, z + 0.5);
    var windowDividerHoz = new Mesh(windowDividerGeometryHoz, materials.black);

    window.add(windowDividerVert);
    window.add(windowDividerHoz);

    return window;
}

class Firestone extends Group {
    constructor() {
        super();

        var materials = {
            stone: new MeshLambertMaterial({
                color: 0x5e5e5e,
                flatShading: true
            }),
            window: new MeshLambertMaterial({
                color: 0xadadad,
                flatShading: true
            }),
            gray: new MeshLambertMaterial({
                color: 0x474747,
                flatShading: true
            }),
            door: new MeshLambertMaterial({
                color: 0x333333,
                flatShading: true
            }),
            black: new MeshLambertMaterial({
                color: 0x000000,
                flatShading: true
            })
        };

        // main building
        var mainBuilding = createBox(30, 15, 70, materials.gray);
        mainBuilding.name = "main building"

        var offset = 1;
        for (var i = 0; i < 7; i++) {
            var window = createWindow(4, 8, 3, materials);
            mainBuilding.add(window);
            window.position.set(-13.5, 0, -30 + offset);
            offset += 6;
        }

        var sideWindow1 = createWindow(4, 10, 8, materials);
        mainBuilding.add(sideWindow1);
        sideWindow1.position.set(0, 0, -33.5)
        sideWindow1.rotation.y = (Math.PI/2);

        // lobby building 1
        var lobbyBuilding1 = createBox(20, 20, 20, materials.gray);
        mainBuilding.add(lobbyBuilding1);
        lobbyBuilding1.position.set(-10, 2.5, 20)

        var offset = 1;
        for (var i = 0; i < 3; i++) {
            var window = createWindow(4, 2, 2, materials);
            lobbyBuilding1.add(window);
            window.position.set(-8.5, 5 - offset, -5);
            offset += 3;
        }

        // lobby building 2
        var lobbyBuilding2 = createBox(70, 30, 20, materials.stone);
        mainBuilding.add(lobbyBuilding2);
        lobbyBuilding2.position.set(13, 7.5, 30)

        var offset = 1;
        for (var i = 0; i < 4; i++) {
            var window = createWindow(4, 10, 2, materials);
            lobbyBuilding2.add(window);
            window.position.set(-33.5, 5, -7 + offset);
            offset += 3;
        }

        // entrance
        var entrance = createBox(10, 10, 20, materials.stone);
        mainBuilding.add(entrance);
        entrance.position.set(-25, -2.5, 38)

        var door1 = createBox(3, 7, 6, materials.door)
        entrance.add(door1);
        door1.position.set(-4, -1.5, 5);

        var door2 = createBox(3, 7, 6, materials.door)
        entrance.add(door2);
        door2.position.set(-4, -1.5, -5);

        // tower
        var tower = createBox(15, 50, 15, materials.gray);
        mainBuilding.add(tower);
        tower.position.set(-15, 17.5, 45)

        var towerTip1 = createBox(2, 4, 2, materials.stone);
        tower.add(towerTip1);
        towerTip1.position.set(-7, 26, -7);

        var towerTip2 = createBox(2, 4, 2, materials.stone);
        tower.add(towerTip2);
        towerTip2.position.set(7, 26, 7);

        var towerTip3 = createBox(2, 4, 2, materials.stone);
        tower.add(towerTip3);
        towerTip3.position.set(-7, 26, 7);

        var towerTip4 = createBox(2, 4, 2, materials.stone);
        tower.add(towerTip4);
        towerTip4.position.set(7, 26, -7);

        var towerWindow1 = createWindow(4, 10, 4, materials);
        tower.add(towerWindow1);
        towerWindow1.position.set(-6, 15, 0)

        var towerWindow2 = createWindow(4, 5, 5, materials);
        tower.add(towerWindow2);
        towerWindow2.position.set(-6, 5, 0)

        var towerWindow3 = createWindow(4, 5, 5, materials);
        tower.add(towerWindow3);
        towerWindow3.position.set(-6, -5, 0)

        var towerWindow4 = createWindow(4, 10, 4, materials);
        tower.add(towerWindow4);
        towerWindow4.position.set(0, 15, -6)
        towerWindow4.rotation.y = (Math.PI/2);

        this.add(mainBuilding);
    }
}

export default Firestone;