import { Group, 
    BoxGeometry, 
    MeshToonMaterial,
    Mesh, 
    VertexColors,
    BufferGeometry,
    Geometry} from "three";

function createBox(x, y, z, materials) {
    var boxGeometry = new BufferGeometry().fromGeometry(
      new BoxGeometry(x, y, z));
    var box = new Mesh(boxGeometry, materials);
    return box;
}

class OvalStatue extends Group {
    constructor(parent) {
        super();

        this.state = {
            cameraPosition: parent.camera.position
            // gameSpeed: parent.gameSpeed,
        }

        let colors = {
            stone: 0x41929e,
            blue: 0x41969e,
            base: 0x2f3634,
        };

        const geo = new Geometry();

        const top = new BoxGeometry(8.5, 8, 8);
        top.faces.forEach(f => f.color.set(colors.blue));
        geo.merge(top);

        const topLeft = new BoxGeometry(8, 8, 6);
        const topRight = topLeft.clone();
        topLeft.faces.forEach(f => f.color.set(colors.stone));
        topLeft.translate(0, -0.5, -5);
        geo.merge(topLeft);
        topRight.faces.forEach(f => f.color.set(colors.stone));
        topRight.translate(0, -0.5, 5);
        geo.merge(topRight);

        const topLeftCorner = new BoxGeometry(7.5, 8, 6);
        const topRightCorner = topLeftCorner.clone();
        topLeftCorner.faces.forEach(f => f.color.set(colors.blue));
        topLeftCorner.translate(0, -1, -10);
        geo.merge(topLeftCorner);
        topRightCorner.faces.forEach(f => f.color.set(colors.blue));
        topRightCorner.translate(0, -1, 10);
        geo.merge(topRightCorner);

        const middleLeft = new BoxGeometry(8.5, 10, 10);
        const middleRight = middleLeft.clone();
        middleLeft.faces.forEach(f => f.color.set(colors.stone));
        middleLeft.translate(0, -8, -11);
        geo.merge(middleLeft);
        middleRight.faces.forEach(f => f.color.set(colors.stone));
        middleRight.translate(0, -8, 11);
        geo.merge(middleRight);

        const leftTip = new BoxGeometry(8, 5, 5);
        const rightTip = leftTip.clone();
        leftTip.faces.forEach(f => f.color.set(colors.stone));
        leftTip.translate(0, -13, -6);
        geo.merge(leftTip);
        rightTip.faces.forEach(f => f.color.set(colors.stone));
        rightTip.translate(0, -13, 6);
        geo.merge(rightTip);

        const leftInnerTip = new BoxGeometry(7.5, 3, 3);
        const rightInnerTip = leftInnerTip.clone();
        leftInnerTip.faces.forEach(f => f.color.set(colors.blue));
        leftInnerTip.translate(0, -13, -3);
        geo.merge(leftInnerTip);
        rightInnerTip.faces.forEach(f => f.color.set(colors.blue));
        rightInnerTip.translate(0, -13, 3);
        geo.merge(rightInnerTip);

        const leftInnerPoint = new BoxGeometry(8, 1, 1);
        const rightInnerPoint = leftInnerPoint.clone();
        leftInnerPoint.faces.forEach(f => f.color.set(colors.stone));
        leftInnerPoint.translate(0, -13, -1);
        geo.merge(leftInnerPoint);
        rightInnerPoint.faces.forEach(f => f.color.set(colors.stone));
        rightInnerPoint.translate(0, -13, 1);
        geo.merge(rightInnerPoint);

        const bottomLeftCorner = new BoxGeometry(9, 16, 8);
        const bottomRightCorner = bottomLeftCorner.clone();
        bottomLeftCorner.faces.forEach(f => f.color.set(colors.blue));
        bottomLeftCorner.translate(0, -18, -11);
        geo.merge(bottomLeftCorner);
        bottomRightCorner.faces.forEach(f => f.color.set(colors.blue));
        bottomRightCorner.translate(0, -18, 11);
        geo.merge(bottomRightCorner);
        
        const bottomLeft = new BoxGeometry(8, 10, 10);
        const bottomRight = bottomLeft.clone();
        bottomLeft.faces.forEach(f => f.color.set(colors.stone));
        bottomLeft.translate(0, -29, -8);
        geo.merge(bottomLeft);
        bottomRight.faces.forEach(f => f.color.set(colors.stone));
        bottomRight.translate(0, -29, 8);
        geo.merge(bottomRight);

        const bottom = new BoxGeometry(8.5, 8, 12);
        bottom.faces.forEach(f => f.color.set(colors.blue));
        bottom.translate(0, -30, 0);
        geo.merge(bottom);

        const base = new BoxGeometry(20, 1, 40);
        base.faces.forEach(f => f.color.set(colors.base));
        base.translate(0, -34.5, 0);
        geo.merge(base);

        const mesh = new Mesh(
            new BufferGeometry().fromGeometry(geo),
            new MeshToonMaterial({
                vertexColors: VertexColors,
            })
        )

        this.add(mesh);

        // this.add(top);
        parent.addToUpdateList(this);
        this.position.set(-13, 3.5, -150);
        this.rotation.y = Math.PI/2
        this.scale.set(0.1, 0.1, 0.1);
    }

    update(timestamp) {
        const { cameraPosition } = this.state;
        this.position.z += this.parent.gameSpeed;

        if (this.position.z > cameraPosition.z) {
            this.position.z -= 200;
        }
    }
}

export default OvalStatue;