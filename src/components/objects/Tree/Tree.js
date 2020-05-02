import {
    Group,
    Mesh,
    CircleGeometry,
    MeshToonMaterial,
    CylinderGeometry,
    DoubleSide,
    SphereGeometry,
    BoxGeometry,
} from 'three';

var Colors = {
  lightGreen:0x5ab856,
  darkGreen:0x00472e,
  yellowGreen:0xb4eb00,
  brown:0x4a2a0a,
};

function createCylinder(x, y, z, s, color, dx, dy, dz) {
  let geo = new CylinderGeometry(x, y, z, s);
  let mat = new MeshToonMaterial({
    color: color,
    flatShading: true,
  });
  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.set(dx, dy, dz);
  return mesh;
}

class Tree extends Group {
  constructor() {
    super(parent);

    this.state = {
      type: 0,
    }

    this.name = 'tree';
  }

  create() {
    if (this.state.type == 0) {
      let leaves = createCylinder(0, 0.5, 1, 5, Colors.darkGreen, 0, 0, 0);
      let row2 = createCylinder(0, 0.7, 1, 5, Colors.darkGreen, 0, 0.3, 0);
      row2.geometry.rotateX(Math.PI / 24);
      let row3 = createCylinder(0, 0.8, 0.8, 5, Colors.darkGreen, 0, 0.6, 0);
      row3.geometry.rotateX(-Math.PI / 24);
      let row4 = createCylinder(0, 0.6, 0.7, 5, Colors.darkGreen, 0, 1, 0);
      let row5 = createCylinder(0, 0.3, 0.6, 5, Colors.darkGreen, 0, 1.4, 0);
      row5.geometry.rotateX(Math.PI / 24);
      leaves.add(row2, row3, row4, row5);

      let trunk = createCylinder(0.1, 0.1, 0.9, 18, Colors.brown, 0, -0.8, 0);
      this.add(leaves, trunk);
    }
    if (this.state.type == 1) {
      let leaves = createCylinder(0.4, 0.8, 1.5, 4, Colors.lightGreen, 0, 0, 0);
      let leaves2 = createCylinder(0.4, 0.6, 0.7, 4, Colors.lightGreen, -0.5, -0.4, -0.5);
      let trunk = createCylinder(0.06, 0.06, 1.4, 18, Colors.brown, -0.5, -0.8, -0.5);
      let trunk2 = createCylinder(0.1, 0.1, 1.4, 18, Colors.brown, -0, -0.8, -0);
      this.add(leaves, leaves2, trunk, trunk2);
    }
    if (this.state.type == 2) {
      let trunk = createCylinder(0.15, 0.15, 1.5, 18, Colors.brown, -0, -0.8, -0);
      let branch = createCylinder(0.02, 0.09, 0.6, 18, Colors.brown, 0, -0.6, 0.3);
      let leaves = createCylinder(1, 0.6, 1.2, 8, Colors.darkGreen, 0, 0.5, 0);
      branch.geometry.rotateX(Math.PI / 4);
      this.add(trunk, branch, leaves);
    }
  }

}

export default Tree;
