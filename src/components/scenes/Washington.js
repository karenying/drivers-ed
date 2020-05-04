import * as Dat from "dat.gui";
import { Scene, Color } from "three";
import {
  Road,
  Car,
  Fine,
  WoodyWoo,
  Friend,
  Cap,
  Colonial,
  Firestone,
  Frist,
  McCosh,
  Nassau,
  Fox,
  Grass,
  Lamppost,
  Coin,
} from "objects";
import { BasicLights } from "lights";
import * as THREE from "three";

class Washington extends Scene {
  constructor(camera) {
    super();

    this.state = {
      gui: new Dat.GUI(),
      updateList: [],
    };
    this.gameSpeed = 0.25;

    this.camera = camera;
    this.background = new Color(0x7ec0ee);

    this.collidableMeshList = []; // List of collidable meshes

    // Add road
    const positions = [
      0,
      -20,
      -40,
      -60,
      -80,
      -100,
      -120,
      -140,
      -160,
      -180,
      -200,
    ];

    for (let i = 0; i < 11; i++) {
      const road = new Road(this);
      const grass = new Grass(this);
      road.position.set(0, 0, positions[i]);
      grass.position.set(0, 0, positions[i]);
      this.add(road, grass);
    }

    // lampposts
    for (let i = 0; i < 5; i++) {
      const lamppostLeft = new Lamppost(this);
      const lamppostRight = new Lamppost(this);
      lamppostLeft.position.set(-2.6, 1, (positions[i] + 10) / 2);
      lamppostRight.position.set(2.6, 1, (positions[i]) / 2);
      this.add( lamppostLeft, lamppostRight);
    }

    // Add right buildings
    let fine = new Fine(this);
    let woodywoo = new WoodyWoo(this);
    let friend = new Friend(this);
    let cap = new Cap(this);
    let colonial = new Colonial(this);
    this.add(fine, woodywoo, friend, cap, colonial);

    // Add left buildings
    let firestone = new Firestone(this);
    let frist = new Frist(this);
    let mccosh = new McCosh(this);
    let nassau = new Nassau(this);
    this.add(firestone, frist, mccosh, nassau);

    const car = new Car(this);
    this.driver = car;

    // add obstacles
    // Add obstacle
    let fox = new Fox(this);
    this.add(fox);
    this.collidableMeshList.push(fox);

    const lights = new BasicLights();
    this.add(lights, car);

    // Add some coins
    for (let i = 0; i < 5; i++) {
      var coin = new Coin(this);
      coin.position.set(
        car.maxPos * Math.random() - 2,
        0,
        -(50 + 5 * i * Math.random())
      );
      this.add(coin);
      this.collidableMeshList.push(coin);
    }
  }

  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  findCollisions(obj, collidableMeshList) {
    var thisBB = new THREE.Box3().copy(obj.bb).applyMatrix4(obj.matrixWorld);
    for (const mesh of collidableMeshList) {
      var thatBB = new THREE.Box3()
        .copy(mesh.bb)
        .applyMatrix4(mesh.matrixWorld);
      if (thisBB.intersectsBox(thatBB)) return mesh;
    }
    return undefined;
  }

  update(timeStamp) {
    const { updateList } = this.state;

    for (const obj of updateList) {
      obj.update(timeStamp);
    }
  }
}

export default Washington;
//
// import * as Dat from 'dat.gui';
// import { Scene, Color } from 'three';
// import {
//     Road,
//     Car,
//     Fine,
//     WoodyWoo,
//     Friend,
//     Cap,
//     Colonial,
//     Firestone,
//     Frist,
//     McCosh,
//     Nassau,
//     Fox,
//     Grass,
//     Lamppost,
// } from 'objects';
// import { BasicLights } from 'lights';
//
// class Washington extends Scene {
//     constructor(camera) {
//         super();
//
//         this.state = {
//             gui: new Dat.GUI(),
//             gameSpeed: 1,
//             updateList: [],
//             night: false` ,
//         };
//
//         this.camera = camera;
//         this.background = new Color(0x7ec0ee);
//
//         // Add road
//         const positions = [
//             0,
//             -20,
//             -40,
//             -60,
//             -80,
//             -100,
//             -120,
//             -140,
//             -160,
//             -180,
//             -200,
//         ];
//
//         for (let i = 0; i < 11; i++) {
//             const road = new Road(this);
//             const grass = new Grass(this);
//             const lamppostLeft = new Lamppost(this);
//             const lamppostRight = new Lamppost(this);
//             road.position.set(0, 0, positions[i]);
//             grass.position.set(0, 0, positions[i]);
//             lamppostLeft.position.set(-2.6, 1, (positions[i] + 10) / 2);
//             lamppostRight.position.set(2.6, 1, (positions[i] + 10) / 2);
//             this.add(road, grass, lamppostLeft, lamppostRight);
//         }
//
//
//         // Add right buildings
//         let fine = new Fine(this);
//         let woodywoo = new WoodyWoo(this);
//         let friend = new Friend(this);
//         let cap = new Cap(this);
//         let colonial = new Colonial(this);
//         this.add(fine, woodywoo, friend, cap, colonial);
//
//         // Add left buildings
//         let firestone = new Firestone(this);
//         let frist = new Frist(this);
//         let mccosh = new McCosh(this);
//         let nassau = new Nassau(this);
//         this.add(firestone, frist, mccosh, nassau);
//
//         // Add obstacle
//         let fox = new Fox(this);
//         this.add(fox);
//
//
//         const car = new Car(this);
//         const lights = new BasicLights();
//         this.add(lights, car);
//     }
//
//     addToUpdateList(object) {
//         this.state.updateList.push(object);
//     }
//
//     update(timeStamp) {
//         const { updateList } = this.state;
//
//         for (const obj of updateList) {
//             obj.update(timeStamp);
//         }
//     }
// }
//
// export default Washington;
