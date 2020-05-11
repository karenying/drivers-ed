import { Group, BufferGeometry, BoxGeometry, Geometry, VertexColors, MeshToonMaterial, Mesh} from "three";

function createWindowRow(windowGeometry, geo, offset, x, y, z, r) {
    let window1 = windowGeometry.clone();
    window1.translate(x - 1.5, y + 18 - offset, z - 8);
    window1.rotateY(r);
    geo.merge(window1);

    let window2 = windowGeometry.clone()
    window2.translate(x - 1.5, y + 18 - offset, z);
    window2.rotateY(r);
    geo.merge(window2);

    let window3 = windowGeometry.clone()
    window3.translate(x - 1.5, y + 18 - offset, z + 8);
    window3.rotateY(r);
    geo.merge(window3);
}

function createFace(x, y, z, geo, leftLeg, bottomWindow, topWindow, windowGeometry, r) {        
    const leftL = leftLeg.clone()
    leftL.translate(x - 0.5, y - 40.5, z - 11);
    leftL.rotateY(r);
    geo.merge(leftL);

    const rightL = leftLeg.clone();
    rightL.translate(x - 0.5, y - 40.5, z + 11);
    rightL.rotateY(r);
    geo.merge(rightL);

    const bottomW = bottomWindow.clone()
    bottomW.translate(x + 1, y - 40, z);
    bottomW.rotateY(r);
    geo.merge(bottomW);

    const topW = topWindow.clone()
    topW.translate(x - 1.5, y + 25, z);
    topW.rotateY(r);
    geo.merge(topW);

    var offset = 0;
    for (var i = 0; i < 9; i++) {
        createWindowRow(windowGeometry, geo, offset, x, y, z, r);
        offset += 6;
    }
}


class Fine extends Group {
    constructor() {
        super();

        let colors = {
            stone: 0x63502c,
            window: 0x406e66,
            main: 0x695735,
        };

        const geo = new Geometry();

        // main building
        const mainBuilding = new BoxGeometry(30, 80, 30);
        mainBuilding.faces.forEach(f => f.color.set(colors.main));
        geo.merge(mainBuilding);

        const face = new BoxGeometry(5, 70, 25);
        face.faces.forEach(f => f.color.set(colors.stone));
        const leftLeg = new BoxGeometry(3, 15, 3);
        leftLeg.faces.forEach(f => f.color.set(colors.stone));
        const bottomWindow = new BoxGeometry(3, 4, 15);
        bottomWindow.faces.forEach(f => f.color.set(colors.window));
        const topWindow = new BoxGeometry(3, 4, 20);
        topWindow.faces.forEach(f => f.color.set(colors.window));
        const windowGeometry = new BoxGeometry(3, 4, 5);
        windowGeometry.faces.forEach(f => f.color.set(colors.window));

        let face1 = face.clone();
        face1.translate(-16, 8, 0);
        geo.merge(face1);
        createFace(-16, 8, 0, geo, leftLeg, bottomWindow, topWindow, windowGeometry, 0);

        let face2 = face.clone();
        face2.rotateY(Math.PI/2);
        face2.translate(0, 8, 16);
        geo.merge(face2);
        createFace(-16, 8, 0, geo, leftLeg, bottomWindow, topWindow, windowGeometry, Math.PI/2);

        let face3 = face.clone();
        face3.rotateY(-Math.PI/2);
        face3.translate(0, 8, -16);
        geo.merge(face3);
        createFace(-16, 8, 0, geo, leftLeg, bottomWindow, topWindow, windowGeometry, -Math.PI/2);

        let face4 = face.clone();
        face3.rotateY(-Math.PI);
        face4.translate(16, 8, 0);
        geo.merge(face4);
        createFace(-16, 8, 0, geo, leftLeg, bottomWindow, topWindow, windowGeometry, -Math.PI);

        const mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        this.add(mesh);
    }
}

export default Fine;