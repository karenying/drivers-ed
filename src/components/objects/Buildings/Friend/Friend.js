import { Group, BoxGeometry, MeshLambertMaterial, Mesh } from 'three';

function createBox(x, y, z, materials) {
    var boxGeometry = new BoxGeometry(x, y, z);
    var box = new Mesh(boxGeometry, materials);
    return box;
}

class Friend extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position
            // gameSpeed: parent.gameSpeed,
        };

        var materials = {
            stone: new MeshLambertMaterial({
                color: 0xbdb9aa,
                flatShading: true,
            }),
            window: new MeshLambertMaterial({
                color: 0x445b5c,
                flatShading: true,
            }),
            gray: new MeshLambertMaterial({
                color: 0xe8e3d1,
                flatShading: true,
            }),
        };

        // main building
        var mainBuilding = createBox(45, 15, 80, materials.stone);
        mainBuilding.name = 'main building';

        // main building overhead
        var mainBuildingOverhead = createBox(10, 5, 80, materials.stone);
        mainBuilding.add(mainBuildingOverhead);
        mainBuildingOverhead.position.set(-23, 5, 0);

        // upper building
        var upperBuilding = createBox(50, 20, 70, materials.window);
        mainBuilding.add(upperBuilding);
        upperBuilding.position.set(-2.5, 17.5, 5);

        var offset = 0;
        for (var i = 0; i < 7; i++) {
            var line = createBox(50.5, 0.5, 70.5, materials.gray);
            upperBuilding.add(line);
            line.position.set(0, -10 + offset, 0);
            offset += 3;
        }

        var offset = 0;
        for (var i = 0; i < 11; i++) {
            var line = createBox(50.5, 19.5, 0.5, materials.gray);
            upperBuilding.add(line);
            line.position.set(0, 0, -30 + offset);
            offset += 6;
        }

        var offset = 0;
        for (var i = 0; i < 6; i++) {
            var line = createBox(0.5, 19.5, 70.5, materials.gray);
            upperBuilding.add(line);
            line.position.set(-17 + offset, 0, 0);
            offset += 7;
        }

        // entrance
        var entrance = createBox(10, 10, 30, materials.window);
        mainBuilding.add(entrance);
        entrance.position.set(-21, -2.5, -10);

        var offset = 0;
        for (var i = 0; i < 5; i++) {
            var line = createBox(5, 10.5, 0.5, materials.gray);
            entrance.add(line);
            line.position.set(-3, 0.25, -10 + offset);
            offset += 5;
        }

        // entrance side windows
        var entranceWindows = createBox(10, 4, 25, materials.window);
        mainBuildingOverhead.add(entranceWindows);
        entranceWindows.position.set(0.25, -4, 25);

        var offset = 0;
        for (var i = 0; i < 5; i++) {
            var line = createBox(5, 4, 0.5, materials.gray);
            entranceWindows.add(line);
            line.position.set(-3, -0.5, -10 + offset);
            offset += 5;
        }

        this.add(mainBuilding);

        this.scale.set(0.25, 0.25, 0.25);
        this.position.set(17, 1.75, -60);
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

export default Friend;
