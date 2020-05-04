import { Group, BoxGeometry, MeshLambertMaterial, Mesh } from 'three';

function createPillar(x, y, z, materials) {
    var pillarGeometry = new BoxGeometry(x, y, z);
    var pillar = new Mesh(pillarGeometry, materials.pillar);
    return pillar;
}

function createBox(x, y, z, materials) {
    var boxGeometry = new BoxGeometry(x, y, z);
    var box = new Mesh(boxGeometry, materials.stone);
    return box;
}

class WoodyWoo extends Group {
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
            stone: new MeshLambertMaterial({
                color: 0xbdb9aa,
                flatShading: true,
            }),
            pillar: new MeshLambertMaterial({
                color: 0x9c988c,
                flatShading: true,
            }),
        };

        // main building
        var mainBuilding = createBox(50, 30, 80, materials);
        mainBuilding.name = 'main building';

        var roofTop = createBox(60, 2, 90, materials);
        mainBuilding.add(roofTop);
        roofTop.name = 'roof top';
        roofTop.position.set(0, 15, 0);

        // front top pillars
        var offset = 0;
        for (var i = 0; i < 44; i++) {
            var pillar = createPillar(1, 8, 1, materials);
            roofTop.add(pillar);
            pillar.position.set(-28, -5, -43 + offset);
            offset += 2;
        }

        // back top pillars
        var offset = 0;
        for (var i = 0; i < 44; i++) {
            var pillar = createPillar(1, 8, 1, materials);
            roofTop.add(pillar);
            pillar.position.set(28, -5, -43 + offset);
            offset += 2;
        }

        // left top pillars
        var offset = 2;
        for (var i = 0; i < 27; i++) {
            var pillar = createPillar(1, 8, 1, materials);
            roofTop.add(pillar);
            pillar.position.set(28 - offset, -5, -43);
            offset += 2;
        }

        // right top pillars
        var offset = 2;
        for (var i = 0; i < 27; i++) {
            var pillar = createPillar(1, 8, 1, materials);
            roofTop.add(pillar);
            pillar.position.set(28 - offset, -5, 43);
            offset += 2;
        }

        var roofBottom = createBox(60, 2, 90, materials);
        mainBuilding.add(roofBottom);
        roofBottom.name = 'roof bottom';
        roofBottom.position.set(0, 5, 0);

        // front bottom pillars
        var offset = 0;
        for (var i = 0; i < 18; i++) {
            var pillar = createPillar(2, 19, 2, materials);
            roofBottom.add(pillar);
            pillar.position.set(-28, -10, -43 + offset);
            offset += 5.05;
        }

        // back bottom pillars
        var offset = 0;
        for (var i = 0; i < 18; i++) {
            var pillar = createPillar(2, 19, 2, materials);
            roofBottom.add(pillar);
            pillar.position.set(28, -10, -43 + offset);
            offset += 5.05;
        }

        // left bottom pillars
        var offset = 5.05;
        for (var i = 0; i < 10; i++) {
            var pillar = createPillar(2, 19, 2, materials);
            roofBottom.add(pillar);
            pillar.position.set(28 - offset, -10, -43);
            offset += 5.05;
        }

        // right bottom pillars
        var offset = 5.05;
        for (var i = 0; i < 10; i++) {
            var pillar = createPillar(2, 19, 2, materials);
            roofBottom.add(pillar);
            pillar.position.set(28 - offset, -10, 43);
            offset += 5.05;
        }

        this.add(mainBuilding);

        this.scale.set(0.1, 0.1, 0.1);
        this.position.set(6.5, 1.5, -10);
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
            this.position.z -= 90;
        }
    }
}

export default WoodyWoo;
