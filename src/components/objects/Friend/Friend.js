import { Group, BoxGeometry, Geometry, BufferGeometry, VertexColors, MeshToonMaterial, Mesh} from "three";

function createBox(x, y, z, materials) {
    var boxGeometry = new BoxGeometry(x, y, z);
    var box = new Mesh(boxGeometry, materials);
    return box;
}

class Friend extends Group {
    constructor() {
        super();

        let colors = {
            stone: 0xbdb9aa,
            window: 0x445b5c,
            gray: 0xe8e3d1,
        };

        const geo = new Geometry();

        // main building
        const mainBuilding = new BoxGeometry(45, 15, 80);
        mainBuilding.faces.forEach(f => f.color.set(colors.stone));
        geo.merge(mainBuilding);

        // main building overhead
        const mainBuildingOverhead = new BoxGeometry(10, 5, 80);
        mainBuildingOverhead.faces.forEach(f => f.color.set(colors.stone));
        mainBuildingOverhead.translate(-23, 5, 0);
        geo.merge(mainBuildingOverhead)

        // upper building
        const upperBuilding = new BoxGeometry(50, 20, 70);
        upperBuilding.faces.forEach(f => f.color.set(colors.window));
        upperBuilding.translate(-2.5, 17.5, 5);
        geo.merge(upperBuilding)

        let offset = 0;
        let line1 = new BoxGeometry(50.5, 0.5, 70.5);
        line1.faces.forEach(f => f.color.set(colors.gray));
        for (var i = 0; i < 7; i++) {
            let line = line1.clone();
            line.translate(-2.5, 7.5 + offset, 5)
            geo.merge(line)
            offset += 3;
        }

        offset = 0;
        let line2 = new BoxGeometry(50.5, 19.5, 0.5);
        line2.faces.forEach(f => f.color.set(colors.gray));
        for (var i = 0; i < 11; i++) {
            let line = line2.clone();
            line.translate(-2.5, 17.5, -25 + offset)
            geo.merge(line)
            offset += 6;
        }

        offset = 0;
        let line3 = new BoxGeometry(0.5, 19.5, 70.5);
        line3.faces.forEach(f => f.color.set(colors.gray));
        for (var i = 0; i < 6; i++) {
            let line = line3.clone();
            line.translate(-19.5 + offset, 17.5, 5)
            geo.merge(line)
            offset += 7;
        }

        // entrance
        const entrance = new BoxGeometry(10, 10, 30);
        entrance.faces.forEach(f => f.color.set(colors.window));
        entrance.translate(-21, -2.5, -10);
        geo.merge(entrance);

        offset = 0;
        let line4 = new BoxGeometry(5, 10.5, 0.5);
        for (var i = 0; i < 5; i++) {
            let line = line4.clone();
            line.translate(-24, -2.25, -20 + offset);
            geo.merge(line);
            offset += 5;
        }

        // entrance side windows
        const entranceWindows = new BoxGeometry(10, 4, 25);
        entranceWindows.faces.forEach(f => f.color.set(colors.window));
        entranceWindows.translate(-22.75, 1, 25);
        geo.merge(entranceWindows);

        offset = 0;
        let line5 = new BoxGeometry(5, 4, 0.5);
        line5.faces.forEach(f => f.color.set(colors.gray));
        for (var i = 0; i < 5; i++) {
            let line = line5.clone();
            line.translate(-25.75, 0.5, 15 + offset)
            geo.merge(line)
            offset += 5;
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

export default Friend;