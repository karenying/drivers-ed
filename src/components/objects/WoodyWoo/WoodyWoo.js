import { Group, VertexColors, BufferGeometry, BoxGeometry, MeshToonMaterial, Mesh, Geometry} from "three";

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
    constructor() {
        super();

        let colors = {
            stone: 0xbdb9aa,
            pillar: 0x9c988c,
        }

        const geo = new Geometry();

        // main building
        const mainBuilding = new BoxGeometry(50, 30, 80);
        mainBuilding.faces.forEach(f => f.color.set(colors.stone));
        geo.merge(mainBuilding);

        const roofTop = new BoxGeometry(60, 2, 90);
        const roofBottom = roofTop.clone();
        roofTop.faces.forEach(f => f.color.set(colors.stone));
        roofTop.translate(0, 15, 0);
        geo.merge(roofTop);
        roofBottom.faces.forEach(f => f.color.set(colors.stone));
        roofBottom.translate(0, 5, 0)
        geo.merge(roofBottom);

        // front top pillars
        let smallPillar = new BoxGeometry(1, 8, 1);
        smallPillar.faces.forEach(f => f.color.set(colors.pillar));
        let offset = 0;
        for (var i = 0; i < 44; i++) {
            let pillar = smallPillar.clone();
            pillar.translate(-28, 10, -43 + offset);
            geo.merge(pillar);
            offset += 2;
        }

        // back top pillars
        offset = 0;
        for (var i = 0; i < 44; i++) {
            let pillar = smallPillar.clone();
            pillar.translate(28, 10, -43 + offset);
            geo.merge(pillar);
            offset += 2;
        }

        // left top pillars
        offset = 2;
        for (var i = 0; i < 27; i++) {
            let pillar = smallPillar.clone();
            pillar.translate(28 - offset, 10, -43);
            geo.merge(pillar);
            offset += 2;
        }       

        // right top pillars
        offset = 2;
        for (var i = 0; i < 27; i++) {
            let pillar = smallPillar.clone();
            pillar.translate(28 - offset, 10, 43);
            geo.merge(pillar);
            offset += 2;
        }  

        // front bottom pillars
        let bigPillar = new BoxGeometry(2, 19, 2);
        bigPillar.faces.forEach(f => f.color.set(colors.pillar));
        offset = 0;
        for (var i = 0; i < 18; i++) {
            let pillar = bigPillar.clone();
            pillar.translate(-28, -5, -43 + offset);
            geo.merge(pillar);
            offset += 5.05;
        }

        // back bottom pillars
        offset = 0;
        for (var i = 0; i < 18; i++) {
            let pillar = bigPillar.clone();
            pillar.translate(28, -5, -43 + offset);
            geo.merge(pillar);
            offset += 5.05;
        }

        // left bottom pillars
        offset = 5.05;
        for (var i = 0; i < 10; i++) {
            let pillar = bigPillar.clone();
            pillar.translate(28 - offset, -5, -43);
            geo.merge(pillar);
            offset += 5.05;
        }        

        // right bottom pillars
        offset = 5.05;
        for (var i = 0; i < 10; i++) {
            let pillar = bigPillar.clone();
            pillar.translate(28 - offset, -5, 43);
            geo.merge(pillar);
            offset += 5.05;
        }  

        const mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        this.add(mesh);
    }
}

export default WoodyWoo;