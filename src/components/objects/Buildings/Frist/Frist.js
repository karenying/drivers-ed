import { Group, BoxGeometry, MeshLambertMaterial, Mesh } from 'three';

function createWindow(x, y, z, materials) {
    var windowGeometry = new BoxGeometry(x, y, z);
    var window = new Mesh(windowGeometry, materials.window);

    var windowDividerGeometryVert = new BoxGeometry(x + 1, y + 0.5, 0.5);
    var windowDividerVert = new Mesh(
        windowDividerGeometryVert,
        materials.black
    );

    var windowDividerGeometryHoz = new BoxGeometry(x + 1, 0.5, z + 0.5);
    var windowDividerHoz = new Mesh(windowDividerGeometryHoz, materials.black);

    window.add(windowDividerVert);
    window.add(windowDividerHoz);

    return window;
}

function createPillar(x, y, z, materials) {
    var pillarGeometry = new BoxGeometry(x, y, z);
    var pillar = new Mesh(pillarGeometry, materials.stone);
    return pillar;
}

class Frist extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position,
<<<<<<< HEAD
=======
            gameSpeed: parent.gameSpeed,
>>>>>>> origin/master
        };

        var materials = {
            brick: new MeshLambertMaterial({
                color: 0x401704,
                flatShading: true,
            }),
            stone: new MeshLambertMaterial({
                color: 0x5e5d5c,
                flatShading: true,
            }),
            window: new MeshLambertMaterial({
                color: 0x9c9898,
                flatShading: true,
            }),
            door: new MeshLambertMaterial({
                color: 0x4f2a04,
                flatShading: true,
            }),
            black: new MeshLambertMaterial({
                color: 0x000000,
                flatShading: true,
            }),
        };

        // main building
        var mainBuildingGeometry = new BoxGeometry(30, 30, 80);
        var mainBuilding = new Mesh(mainBuildingGeometry, materials.brick);
        mainBuilding.name = 'main building';

        var window1 = createWindow(10, 10, 5, materials);
        mainBuilding.add(window1);
        window1.name = 'window 1';
        window1.position.set(-11, 0, -35);

        var window2 = createWindow(10, 10, 5, materials);
        mainBuilding.add(window2);
        window2.name = 'window 2';
        window2.position.set(-11, 0, -25);

        var window3 = createWindow(10, 10, 5, materials);
        mainBuilding.add(window3);
        window3.name = 'window 3';
        window3.position.set(-11, 0, -15);

        var window4 = createWindow(10, 10, 5, materials);
        mainBuilding.add(window4);
        window4.name = 'window 4';
        window4.position.set(-11, 0, 35);

        var window5 = createWindow(10, 10, 5, materials);
        mainBuilding.add(window5);
        window5.name = 'window 5';
        window5.position.set(-11, 0, 25);

        var window6 = createWindow(10, 10, 5, materials);
        mainBuilding.add(window6);
        window6.name = 'window 6';
        window6.position.set(-11, 0, 15);

        // entrance building
        var entranceBuildingGeometry = new BoxGeometry(20, 40, 20);
        var entranceBuilding = new Mesh(
            entranceBuildingGeometry,
            materials.brick
        );
        mainBuilding.add(entranceBuilding);
        entranceBuilding.position.set(-10, 5, 0);
        entranceBuilding.name = 'entrance building';

        var entranceBuildingRoofGeometry = new BoxGeometry(20, 5, 5);
        var entranceBuildingRoof = new Mesh(
            entranceBuildingRoofGeometry,
            materials.brick
        );
        entranceBuilding.add(entranceBuildingRoof);
        entranceBuildingRoof.position.set(0, 20, 0);
        entranceBuildingRoof.name = 'entrance building roof';

        var leftEntranceRoofGeometry = new BoxGeometry(25, 20, 5);
        var leftEntranceRoof = new Mesh(
            leftEntranceRoofGeometry,
            materials.stone
        );
        entranceBuilding.add(leftEntranceRoof);
        leftEntranceRoof.name = 'left entrance roof';
        leftEntranceRoof.position.set(0, 20, -7);
        leftEntranceRoof.rotation.x = 56 * (Math.PI / 180);

        var rightEntranceRoofGeometry = new BoxGeometry(25, 20, 5);
        var rightEntranceRoof = new Mesh(
            rightEntranceRoofGeometry,
            materials.stone
        );
        entranceBuilding.add(rightEntranceRoof);
        rightEntranceRoof.name = 'right entrance roof';
        rightEntranceRoof.position.set(0, 20, 7);
        rightEntranceRoof.rotation.x = -56 * (Math.PI / 180);

        var entranceBuildingStoneGeometry = new BoxGeometry(10, 30, 10);
        var entranceBuildingStone = new Mesh(
            entranceBuildingStoneGeometry,
            materials.stone
        );
        entranceBuilding.add(entranceBuildingStone);
        entranceBuildingStone.name = 'entrance building stone';
        entranceBuildingStone.position.set(-6, -5, 0);

        var entranceBuildingDoorGeometry = new BoxGeometry(10, 10, 5);
        var entranceBuildingDoor = new Mesh(
            entranceBuildingDoorGeometry,
            materials.door
        );
        entranceBuilding.add(entranceBuildingDoor);
        entranceBuilding.name = 'entrance building door';
        entranceBuildingDoor.position.set(-7, -15, 0);

        var entranceBuildingWindow = createWindow(10, 10, 8, materials);
        entranceBuildingWindow.name = 'entrance building window';
        entranceBuilding.add(entranceBuildingWindow);
        entranceBuildingWindow.position.set(-7, 0, 0);

        // left building
        var leftBuildingGeometry = new BoxGeometry(70, 40, 20);
        var leftBuilding = new Mesh(leftBuildingGeometry, materials.brick);
        mainBuilding.add(leftBuilding);
        leftBuilding.position.set(10, 5, -50);
        leftBuilding.name = 'left building';

        var leftBuildingRoofGeometry = new BoxGeometry(70, 5, 5);
        var leftBuildingRoof = new Mesh(
            leftBuildingRoofGeometry,
            materials.brick
        );
        leftBuilding.add(leftBuildingRoof);
        leftBuildingRoof.position.set(0, 20, 0);
        leftBuildingRoof.name = 'left building roof';

        var leftBuildingLeftRoofGeometry = new BoxGeometry(75, 20, 5);
        var leftBuildingLeftRoof = new Mesh(
            leftBuildingLeftRoofGeometry,
            materials.stone
        );
        leftBuilding.add(leftBuildingLeftRoof);
        leftBuildingLeftRoof.name = 'left building left roof';
        leftBuildingLeftRoof.position.set(0, 20, -7);
        leftBuildingLeftRoof.rotation.x = 56 * (Math.PI / 180);

        var leftBuildingRightRoofGeometry = new BoxGeometry(75, 20, 5);
        var leftBuildingRightRoof = new Mesh(
            leftBuildingRightRoofGeometry,
            materials.stone
        );
        leftBuilding.add(leftBuildingRightRoof);
        leftBuildingRightRoof.name = 'left building right roof';
        leftBuildingRightRoof.position.set(0, 20, 7);
        leftBuildingRightRoof.rotation.x = -56 * (Math.PI / 180);

        var leftWindow = createWindow(10, 10, 10, materials);
        leftBuilding.add(leftWindow);
        leftWindow.name = 'left building window';
        leftWindow.position.set(-31, 0, 0);

        // right building
        var rightBuildingGeometry = new BoxGeometry(70, 40, 20);
        var rightBuilding = new Mesh(rightBuildingGeometry, materials.brick);
        mainBuilding.add(rightBuilding);
        rightBuilding.position.set(10, 5, 50);
        rightBuilding.name = 'right building';

        var rightBuildingRoofGeometry = new BoxGeometry(70, 5, 5);
        var rightBuildingRoof = new Mesh(
            rightBuildingRoofGeometry,
            materials.brick
        );
        rightBuilding.add(rightBuildingRoof);
        rightBuildingRoof.position.set(0, 20, 0);
        rightBuildingRoof.name = 'right building roof';

        var rightBuildingLeftRoofGeometry = new BoxGeometry(75, 20, 5);
        var rightBuildingLeftRoof = new Mesh(
            rightBuildingLeftRoofGeometry,
            materials.stone
        );
        rightBuilding.add(rightBuildingLeftRoof);
        rightBuildingLeftRoof.name = 'right building left roof';
        rightBuildingLeftRoof.position.set(0, 20, -7);
        rightBuildingLeftRoof.rotation.x = 56 * (Math.PI / 180);

        var rightBuildingRightRoofGeometry = new BoxGeometry(75, 20, 5);
        var rightBuildingRightRoof = new Mesh(
            rightBuildingRightRoofGeometry,
            materials.stone
        );
        rightBuilding.add(rightBuildingRightRoof);
        rightBuildingRightRoof.name = 'right building right roof';
        rightBuildingRightRoof.position.set(0, 20, 7);
        rightBuildingRightRoof.rotation.x = -56 * (Math.PI / 180);

        var rightWindow = createWindow(10, 10, 10, materials);
        rightBuilding.add(rightWindow);
        rightWindow.name = 'right building window';
        rightWindow.position.set(-31, 0, 0);

        // pillars
        var mainPillar = createPillar(2, 2, 100, materials);
        mainBuilding.add(mainPillar);
        mainPillar.position.set(-40, 0, 0);

        var pillar1 = createPillar(2, 15, 10, materials);
        mainPillar.add(pillar1);
        pillar1.position.set(0, -8, -45);

        var pillar2 = createPillar(2, 15, 5, materials);
        mainPillar.add(pillar2);
        pillar2.position.set(0, -8, -33);

        var pillar3 = createPillar(2, 15, 5, materials);
        mainPillar.add(pillar3);
        pillar3.position.set(0, -8, -22);

        var pillar4 = createPillar(2, 15, 10, materials);
        mainPillar.add(pillar4);
        pillar4.position.set(0, -8, -10);

        var pillar5 = createPillar(2, 15, 10, materials);
        mainPillar.add(pillar5);
        pillar5.position.set(0, -8, 45);

        var pillar6 = createPillar(2, 15, 5, materials);
        mainPillar.add(pillar6);
        pillar6.position.set(0, -8, 33);

        var pillar7 = createPillar(2, 15, 5, materials);
        mainPillar.add(pillar7);
        pillar7.position.set(0, -8, 22);

        var pillar8 = createPillar(2, 15, 10, materials);
        mainPillar.add(pillar8);
        pillar8.position.set(0, -8, 10);

        this.add(mainBuilding);

        this.scale.set(0.07, 0.07, 0.07);
        this.position.set(-6.5, 1, -10);
        this.rotation.y = Math.PI;
        parent.addToUpdateList(this);
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
            this.position.z -= 60;
        }
    }
}

export default Frist;
