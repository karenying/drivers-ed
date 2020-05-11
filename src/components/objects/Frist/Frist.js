import { Group, VertexColors, BufferGeometry, BoxGeometry, MeshToonMaterial, Mesh, Geometry} from "three";

function createWindow(x, y, z, geo, windowGeometry, windowVertDividerGeometry, windowHozDividerGeometry) {
    let window = windowGeometry.clone();
    window.translate(x, y, z);
    geo.merge(window);

    let windowDividerGeometryVert = windowVertDividerGeometry.clone();
    windowDividerGeometryVert.translate(x, y, z);
    geo.merge(windowDividerGeometryVert);

    let windowDividerGeometryHoz = windowHozDividerGeometry.clone();
    windowDividerGeometryHoz.translate(x, y, z);
    geo.merge(windowDividerGeometryHoz);
}

function createPillar(x, y, z, geo, pillarGeometry) {
    let pillar = pillarGeometry.clone();
    pillar.translate(x, y, z);
    geo.merge(pillar);
}

class Frist extends Group {
    constructor() {
        super();

        var colors = {
            brick: 0x401704,
            stone: 0x5e5d5c,
            window: 0x9c9898,
            door: 0x4f2a04,
            black: 0x000000,
        };

        const geo = new Geometry();

        // main building
        const mainBuilding = new BoxGeometry(30, 30, 80);
        mainBuilding.faces.forEach(f => f.color.set(colors.brick));
        geo.merge(mainBuilding);

        const windowGeometry1 = new BoxGeometry(10, 10, 5);
        windowGeometry1.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry1 = new BoxGeometry(10.25, 10.1, 0.1);
        windowVertDividerGeometry1.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry1 = new BoxGeometry(10.25, 0.1, 5.1);
        windowHozDividerGeometry1.faces.forEach(f => f.color.set(colors.black));

        createWindow(-10.25, 0, -35, geo, windowGeometry1, windowVertDividerGeometry1, windowHozDividerGeometry1);
        createWindow(-10.25, 0, -25, geo, windowGeometry1, windowVertDividerGeometry1, windowHozDividerGeometry1);
        createWindow(-10.25, 0, -15, geo, windowGeometry1, windowVertDividerGeometry1, windowHozDividerGeometry1);
        createWindow(-10.25, 0, 35, geo, windowGeometry1, windowVertDividerGeometry1, windowHozDividerGeometry1);
        createWindow(-10.25, 0, 25, geo, windowGeometry1, windowVertDividerGeometry1, windowHozDividerGeometry1);
        createWindow(-10.25, 0, 15, geo, windowGeometry1, windowVertDividerGeometry1, windowHozDividerGeometry1);

        // entrance building
        const entranceBuildingGeometry = new BoxGeometry(20, 40, 20);
        entranceBuildingGeometry.faces.forEach(f => f.color.set(colors.brick));
        entranceBuildingGeometry.translate(-10, 5, 0);
        geo.merge(entranceBuildingGeometry)

        const entranceBuildingRoofGeometry = new BoxGeometry(20, 5, 5);
        entranceBuildingRoofGeometry.faces.forEach(f => f.color.set(colors.brick));
        entranceBuildingRoofGeometry.translate(-10, 25, 0);
        geo.merge(entranceBuildingRoofGeometry)

        const leftEntranceRoofGeometry = new BoxGeometry(25, 20, 5);
        const rightEntranceRoofGeometry = leftEntranceRoofGeometry.clone();
        leftEntranceRoofGeometry.faces.forEach(f => f.color.set(colors.stone));
        leftEntranceRoofGeometry.rotateX(56 * (Math.PI/180));
        leftEntranceRoofGeometry.translate(-10, 25, -7);
        geo.merge(leftEntranceRoofGeometry);
        rightEntranceRoofGeometry.faces.forEach(f => f.color.set(colors.stone));
        rightEntranceRoofGeometry.rotateX(-56 * (Math.PI/180));
        rightEntranceRoofGeometry.translate(-10, 25, 7);
        geo.merge(rightEntranceRoofGeometry);

        const entranceBuildingStoneGeometry = new BoxGeometry(10, 30, 10);
        entranceBuildingStoneGeometry.faces.forEach(f => f.color.set(colors.stone));
        entranceBuildingStoneGeometry.translate(-16, 0, 0);
        geo.merge(entranceBuildingStoneGeometry);

        const entranceBuildingDoorGeometry = new BoxGeometry(10, 10, 5);
        entranceBuildingDoorGeometry.faces.forEach(f => f.color.set(colors.door));
        entranceBuildingDoorGeometry.translate(-17, -10, 0);
        geo.merge(entranceBuildingDoorGeometry);

        const windowGeometry2 = new BoxGeometry(10, 10, 8);
        windowGeometry2.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry2 = new BoxGeometry(10.25, 10.1, 0.1);
        windowVertDividerGeometry2.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry2 = new BoxGeometry(10.25, 0.1, 8.1);
        windowHozDividerGeometry2.faces.forEach(f => f.color.set(colors.black));
        createWindow(-16.25, 5, 0, geo, windowGeometry2, windowVertDividerGeometry2, windowHozDividerGeometry2);

        // left building & right building
        const leftBuildingGeometry = new BoxGeometry(70, 40, 20);
        const rightBuildingGeometry = leftBuildingGeometry.clone();
        leftBuildingGeometry.faces.forEach(f => f.color.set(colors.brick));
        leftBuildingGeometry.translate(10, 5, -50);
        geo.merge(leftBuildingGeometry)
        rightBuildingGeometry.faces.forEach(f => f.color.set(colors.brick));
        rightBuildingGeometry.translate(10, 5, 50);
        geo.merge(rightBuildingGeometry)

        const leftBuildingRoofGeometry = new BoxGeometry(70, 5, 5);
        const rightBuildingRoofGeometry = leftBuildingRoofGeometry.clone();
        leftBuildingRoofGeometry.faces.forEach(f => f.color.set(colors.brick));
        leftBuildingRoofGeometry.translate(10, 25, -50);
        geo.merge(leftBuildingRoofGeometry)
        rightBuildingRoofGeometry.faces.forEach(f => f.color.set(colors.brick));
        rightBuildingRoofGeometry.translate(10, 25, 50);
        geo.merge(rightBuildingRoofGeometry)

        const leftBuildingLeftRoofGeometry = new BoxGeometry(75, 20, 5);
        const leftBuildingRightRoofGeometry = leftBuildingLeftRoofGeometry.clone();
        const rightBuildingLeftRoofGeometry = leftBuildingLeftRoofGeometry.clone();
        const rightBuildingRightRoofGeometry = leftBuildingLeftRoofGeometry.clone();

        leftBuildingLeftRoofGeometry.faces.forEach(f => f.color.set(colors.stone));
        leftBuildingLeftRoofGeometry.rotateX(56 * (Math.PI/180));
        leftBuildingLeftRoofGeometry.translate(10, 25, -57);
        geo.merge(leftBuildingLeftRoofGeometry);
        leftBuildingRightRoofGeometry.faces.forEach(f => f.color.set(colors.stone));
        leftBuildingRightRoofGeometry.rotateX(-56 * (Math.PI/180));
        leftBuildingRightRoofGeometry.translate(10, 25, -43);
        geo.merge(leftBuildingRightRoofGeometry);

        rightBuildingLeftRoofGeometry.faces.forEach(f => f.color.set(colors.stone));
        rightBuildingLeftRoofGeometry.rotateX(56 * (Math.PI/180));
        rightBuildingLeftRoofGeometry.translate(10, 25, 43);
        geo.merge(rightBuildingLeftRoofGeometry);
        rightBuildingRightRoofGeometry.faces.forEach(f => f.color.set(colors.stone));
        rightBuildingRightRoofGeometry.rotateX(-56 * (Math.PI/180));
        rightBuildingRightRoofGeometry.translate(10, 25, 57);
        geo.merge(rightBuildingRightRoofGeometry);

        const windowGeometry3 = new BoxGeometry(10, 10, 10);
        windowGeometry3.faces.forEach(f => f.color.set(colors.window));
        const windowVertDividerGeometry3 = new BoxGeometry(10.25, 10.1, 0.1);
        windowVertDividerGeometry3.faces.forEach(f => f.color.set(colors.black));
        const windowHozDividerGeometry3 = new BoxGeometry(10.25, 0.1, 10.1);
        windowHozDividerGeometry3.faces.forEach(f => f.color.set(colors.black));
        createWindow(-20.25, 5, -50, geo, windowGeometry3, windowVertDividerGeometry3, windowHozDividerGeometry3);
        createWindow(-20.25, 5, 50, geo, windowGeometry3, windowVertDividerGeometry3, windowHozDividerGeometry3);

        // pillars
        const mainPillar = new BoxGeometry(2, 2, 100);
        mainPillar.faces.forEach(f => f.color.set(colors.stone));
        mainPillar.translate(-40, 0, 0);
        geo.merge(mainPillar);

        const widePillar = new BoxGeometry(2, 15, 10);
        widePillar.faces.forEach(f => f.color.set(colors.stone));

        const thinPillar = new BoxGeometry(2, 15, 5);
        thinPillar.faces.forEach(f => f.color.set(colors.stone));
        
        createPillar(-40, -8, -45, geo, widePillar);
        createPillar(-40, -8, -33, geo, thinPillar);
        createPillar(-40, -8, -22, geo, thinPillar);
        createPillar(-40, -8, -10, geo, widePillar);
        createPillar(-40, -8, 45, geo, widePillar);
        createPillar(-40, -8, 33, geo, thinPillar);
        createPillar(-40, -8, 22, geo, thinPillar);
        createPillar(-40, -8, 10, geo, widePillar);

        const mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        this.add(mesh);
    }
}

export default Frist;