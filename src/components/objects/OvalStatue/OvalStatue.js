import { Group, BoxGeometry, MeshToonMaterial, Mesh, BufferGeometry} from "three";

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
        };

        var materials = {
            stone: new MeshToonMaterial({
                color: 0x41929e,
                flatShading: true
            }),
            blue: new MeshToonMaterial({
                color: 0x41969e,
                flatShading: true
            }),
            base: new MeshToonMaterial({
                color: 0x2f3634,
                flatShading: true
            }),
        };

        var top = createBox(8.5, 8, 8, materials.blue);

        var topLeft = createBox(8, 8, 6, materials.stone);
        top.add(topLeft);
        topLeft.position.set(0, -0.5, -5)

        var topLeftCorner = createBox(7.5, 8, 6, materials.blue);
        topLeft.add(topLeftCorner);
        topLeftCorner.position.set(0, -0.5, -5)

        var middleLeft = createBox(8.5, 10, 10, materials.stone);
        topLeftCorner.add(middleLeft);
        middleLeft.position.set(0, -7, -1)

        var leftTip = createBox(8, 5, 5, materials.stone);
        middleLeft.add(leftTip);
        leftTip.position.set(0, -5, 5)

        var leftInnerTip = createBox(7.5, 3, 3, materials.blue);
        leftTip.add(leftInnerTip);
        leftInnerTip.position.set(0, 0, 3);

        var leftInnerPoint = createBox(8, 1, 1, materials.stone);
        leftInnerTip.add(leftInnerPoint);
        leftInnerPoint.position.set(0, 0, 2);

        var bottomLeftCorner = createBox(9, 16, 8, materials.blue);
        middleLeft.add(bottomLeftCorner);
        bottomLeftCorner.position.set(0, -10, 0);
        
        var bottomLeft = createBox(8, 10, 10, materials.stone);
        bottomLeftCorner.add(bottomLeft);
        bottomLeft.position.set(0, -11, 3);

        var bottom = createBox(8.5, 8, 12, materials.blue);
        bottomLeft.add(bottom);
        bottom.position.set(0, -1, 8);

        var topRight = createBox(8, 8, 6, materials.stone);
        top.add(topRight);
        topRight.position.set(0, -0.5, 5)

        var topRightCorner = createBox(7.5, 8, 6, materials.blue);
        topRight.add(topRightCorner);
        topRightCorner.position.set(0, -0.5, 5)

        var middleRight = createBox(8.5, 10, 10, materials.stone);
        topRightCorner.add(middleRight);
        middleRight.position.set(0, -7, 1)

        var rightTip = createBox(8, 5, 5, materials.stone);
        middleRight.add(rightTip);
        rightTip.position.set(0, -5, -5)

        var rightInnerTip = createBox(7.5, 2, 2, materials.blue);
        rightTip.add(rightInnerTip);
        rightInnerTip.position.set(0, 0, -3);

        var rightInnerPoint = createBox(8, 0.5, 0.5, materials.stone);
        rightInnerTip.add(rightInnerPoint);
        rightInnerPoint.position.set(0, 0, -1.25);

        var bottomRightCorner = createBox(9, 16, 8, materials.blue);
        middleRight.add(bottomRightCorner);
        bottomRightCorner.position.set(0, -10, 0);
        
        var bottomRight = createBox(8, 10, 10, materials.stone);
        bottomRightCorner.add(bottomRight);
        bottomRight.position.set(0, -11, -3);

        var base = createBox(20, 1, 40, materials.base);
        bottom.add(base);
        base.position.set(0, -4.5, 0)

        this.add(top);
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