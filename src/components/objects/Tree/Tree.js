import {
    Group,
    Mesh,
    MeshToonMaterial,
    CylinderGeometry,
    BufferGeometry,
    VertexColors,
    Geometry
} from 'three';

var Colors = {
  lightGreen:0x5ab856,
  darkGreen:0x00472e,
  yellowGreen:0xb4eb00,
  brown:0x4a2a0a,
};

class Tree extends Group {
  constructor(parent) {
    super(parent);

    this.state = {
      cameraPosition: parent.camera.position,
      type: 0,
      offset: 290,
    }

    parent.addToUpdateList(this);
    this.name = 'tree';
    this.scale.set(1.25, 1.25, 1.25);
  }

  create() {
    const geo = new Geometry();

    if (this.state.type == 0) {
      let leaves = new CylinderGeometry(0, 0.5, 1, 5);
      leaves.faces.forEach(f => f.color.set(Colors.darkGreen));
      leaves.translate(0, 0, 0);
      geo.merge(leaves);

      let row2 = new CylinderGeometry(0, 0.7, 1, 5);
      row2.faces.forEach(f => f.color.set(Colors.darkGreen));
      row2.rotateX(Math.PI / 24);
      row2.translate(0, 0.3, 0);
      geo.merge(row2);

      let row3 = new CylinderGeometry(0, 0.8, 0.8, 5);
      row3.faces.forEach(f => f.color.set(Colors.darkGreen));
      row3.rotateX(-Math.PI / 24);
      row3.translate(0, 0.6, 0);
      geo.merge(row3);

      let row4 = new CylinderGeometry(0, 0.6, 0.7, 5);
      row4.faces.forEach(f => f.color.set(Colors.darkGreen));
      row4.translate(0, 1, 0);
      geo.merge(row4);

      let row5 = new CylinderGeometry(0, 0.3, 0.6, 5);
      row5.faces.forEach(f => f.color.set(Colors.darkGreen));
      row5.rotateX(Math.PI / 24);
      row5.translate(0, 1.4, 0);

      let trunk = new CylinderGeometry(0.1, 0.1, 0.9, 18);
      trunk.faces.forEach(f => f.color.set(Colors.brown));
      trunk.translate( 0, -0.8, 0);
      geo.merge(trunk);
    }
    if (this.state.type == 1) {
      let leaves = new CylinderGeometry(0.4, 0.8, 1.5, 4);
      leaves.faces.forEach(f => f.color.set(Colors.lightGreen));
      leaves.translate(0, 0, 0);
      geo.merge(leaves);

      let leaves2 = new CylinderGeometry(0.4, 0.6, 0.7, 4);
      leaves2.faces.forEach(f => f.color.set(Colors.lightGreen));
      leaves2.translate(-0.5, -0.4, -0.5);
      geo.merge(leaves2);

      let trunk = new CylinderGeometry(0.06, 0.06, 1.4, 18);
      trunk.faces.forEach(f => f.color.set(Colors.brown));
      trunk.translate( -0.5, -0.8, -0.5);
      geo.merge(trunk);

      let trunk2 = new CylinderGeometry(0.1, 0.1, 1.4, 18);
      trunk2.faces.forEach(f => f.color.set(Colors.brown));
      trunk2.translate( -0, -0.8, -0);
      geo.merge(trunk2);
    }
    if (this.state.type == 2) {
      let trunk = new CylinderGeometry(0.15, 0.15, 1.5, 18);
      trunk.faces.forEach(f => f.color.set(Colors.brown));
      trunk.translate(-0, -0.8, -0);
      geo.merge(trunk);

      let branch = new CylinderGeometry(0.02, 0.09, 0.6, 18);
      branch.faces.forEach(f => f.color.set(Colors.brown));
      branch.rotateX(Math.PI / 4);
      branch.translate(0, -0.6, 0.3);
      geo.merge(branch);

      let leaves = new CylinderGeometry(1, 0.6, 1.2, 8);
      leaves.faces.forEach(f => f.color.set(Colors.darkGreen));
      leaves.translate(0, 0.5, 0);
      geo.merge(leaves);
    }
    const mesh = new Mesh(
      new BufferGeometry().fromGeometry(geo),
      new MeshToonMaterial({
          vertexColors: VertexColors,
      })
    )

    this.add(mesh);
  }

  update() {
    const { cameraPosition, offset } = this.state;
    this.position.z += this.parent.gameSpeed;

    if (this.position.z > cameraPosition.z) {
        this.position.z -= offset;
    }
  }
}

export default Tree;
