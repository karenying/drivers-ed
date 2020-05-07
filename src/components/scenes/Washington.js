import { Scene, Color, MeshToonMaterial } from 'three';
import {
    Sidewalk,
    OvalStatue,
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
    MalePedestrianShorts,
    MalePedestrianJeans,
    FemalePedestrianDress,
    FemalePedestrianJeans,
    Tree
} from 'objects';
import { BasicLights } from 'lights';
import * as THREE from 'three';

const backgroundColors = [
  0x7ec0ee, 0x659abe, 0x517b98, 0x41627A, 0x344E62,
  0x41627A, 0x517b98, 0x659abe, 0x7ec0ee, 0x89CDF1];
class Washington extends Scene {
    constructor(camera) {
        super();

        this.state = {
            updateList: [],
            pause: false,
            startTime: null,
            newGameStarted: false,
        };

        this.gameSpeed = 1;
        this.maxGameSpeed = 3;
        this.minGameSpeed = 1;
        this.accelerating = false;
        this.stopped = false;

        this.camera = camera;
        this.background = new Color(0x7ec0ee);
        this.night = false;
        this.timeElapsed = -1;
        this.threshold = 25;
        this.edge = 7;
        this.collidableMeshList = []; // List of collidable meshes

        // Add road
        const positions = [
            0,
            -90,
            -180,
        ];

        // lampPositions
        const lampPositions = [
            0,
            -40,
            -80,
            -120,
            -160,
            -200,
        ];

        // treePositions
        const treePositions = [
            10,
            -40,
            -90,
            -140,
            -190,
            -240,
        ];

        for (let i = 0; i < 3; i++) {
            const road = new Road(this);
            const leftSidewalk = new Sidewalk(this);
            const rightSidewalk = new Sidewalk(this);
            const grass = new Grass(this);
            road.position.set(0, 0, positions[i]);
            leftSidewalk.position.set(-4, 0, positions[i]);
            rightSidewalk.position.set(4, 0, positions[i]);
            grass.position.set(0, 0, positions[i]);
            this.add(road, grass, leftSidewalk, rightSidewalk);
        }

        // add lamppost
        for (let i = 0; i < 6; i++) {
          const lamppostLeft = new Lamppost(this);
          const lamppostRight = new Lamppost(this);
          lamppostLeft.position.set(-5.6, 1.5, lampPositions[i]);
          lamppostRight.position.set(5.6, 1.5, lampPositions[i] + 20);
          this.add(lamppostLeft, lamppostRight);
        }

        // add some random trees
        for (let i = 0; i < 6; i++) {
            const rightTree = new Tree(this);
            const leftTree = new Tree(this);
            rightTree.state.type = Math.floor(Math.random() * 3);
            leftTree.state.type = Math.floor(Math.random() * 3);
            rightTree.create();
            leftTree.create();
            rightTree.position.set(7, 1.75, treePositions[i]);
            leftTree.position.set(-7, 1.75, treePositions[i] + 20);
            this.add(rightTree);
            this.add(leftTree);
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
        let ovalStatue = new OvalStatue(this);
        this.add(firestone, frist, mccosh, nassau, ovalStatue);

        const car = new Car(this);
        this.driver = car;

        // PEDESTRIAN/FOX OBSTACLES
        // Add fox
        let fox = new Fox(this);
        fox.position.set(
          2 * Math.random() * this.edge - this.edge / 2,
          0.5,
          -(50 * Math.random() + 200)
        );
        this.add(fox);
        this.collidableMeshList.push(fox);

        // Add chad
        let chadMaterials = {
            eye: new MeshToonMaterial({
                color: 0x36699c,
                flatShading: true,
            }),
            hair: new MeshToonMaterial({
                color: 0xd1c569,
                flatShading: true,
            }),
            skin: new MeshToonMaterial({
                color: 0xb48a78,
                flatShading: true,
            }),
            shorts: new MeshToonMaterial({
                color: 0xed7490,
                flatShading: true,
            }),
            shirt: new MeshToonMaterial({
                color: 0x72afed,
                flatShading: true,
            }),
            shoes: new MeshToonMaterial({
                color: 0x3b2403,
                flatShading: true,
            }),
        };
        let chad = new MalePedestrianShorts(this, chadMaterials);
        chad.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(50 * Math.random() + 50)
        );
        this.add(chad);
        this.collidableMeshList.push(chad);

        // Add vanessa
        let vanessaMaterials = {
            eye: new MeshToonMaterial({
                color: 0x3b2606,
                flatShading: true
            }),
            hair: new MeshToonMaterial({
                color: 0x000000,
                flatShading: true
            }),
            skin: new MeshToonMaterial({
                color: 0xb48A78,
                flatShading: true
            }),
            dress: new MeshToonMaterial({
                color: 0x7015d1,
                flatShading: true
            }),
            shoes: new MeshToonMaterial({
                color: 0xd8d1e0,
                flatShading: true
            })
        };
        let vanessa = new FemalePedestrianDress(this, vanessaMaterials);
        vanessa.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(50 * Math.random() + 100)
            );
        this.collidableMeshList.push(vanessa);
        this.add(vanessa);

        // add labib
        let labibMaterials = {
            eye: new MeshToonMaterial({
                color: 0x291b06,
                flatShading: true
            }),
            hair: new MeshToonMaterial({
                color: 0x000000,
                flatShading: true
            }),
            skin: new MeshToonMaterial({
                color: 0x573502,
                flatShading: true
            }),
            jeans: new MeshToonMaterial({
                color: 0x0d1459,
                flatShading: true
            }),
            shirt: new MeshToonMaterial({
                color: 0x245734,
                flatShading: true
            }),
            shoes: new MeshToonMaterial({
                color: 0x470722,
                flatShading: true
            })
        };
        let labib= new MalePedestrianJeans(this, labibMaterials);
        labib.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(50 * Math.random() + 150)
            );
        this.collidableMeshList.push(labib);
        this.add(labib);

        // add maria
        let mariaMaterials = {
            eye: new MeshToonMaterial({
                color: 0x2d5432,
                flatShading: true
            }),
            hair: new MeshToonMaterial({
                color: 0x4d3803,
                flatShading: true
            }),
            skin: new MeshToonMaterial({
                color: 0x997446,
                flatShading: true
            }),
            jeans: new MeshToonMaterial({
                color: 0x000000,
                flatShading: true
            }),
            shirt: new MeshToonMaterial({
                color: 0xd61a39,
                flatShading: true
            }),
            shoes: new MeshToonMaterial({
                color: 0x237066,
                flatShading: true
            })
        };
        let maria = new FemalePedestrianJeans(this, mariaMaterials);
        maria.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(100 * Math.random() + 100)
            );
        this.collidableMeshList.push(maria);
        this.add(maria);

        let maxMaterials = {
            eye: new MeshToonMaterial({
                color: 0x291b06,
                flatShading: true
            }),
            hair: new MeshToonMaterial({
                color: 0x2e150f,
                flatShading: true
            }),
            skin: new MeshToonMaterial({
                color: 0xb56e50,
                flatShading: true
            }),
            jeans: new MeshToonMaterial({
                color: 0x635f61,
                flatShading: true
            }),
            shirt: new MeshToonMaterial({
                color: 0xd65e9a,
                flatShading: true
            }),
            shoes: new MeshToonMaterial({
                color: 0x000000,
                flatShading: true
            })
        };
        let max = new MalePedestrianJeans(this, maxMaterials);
        max.position.set(
            2 * Math.random() * this.edge - this.edge / 2,
            0.5,
            -(100 * Math.random() + 150)
            );
        this.collidableMeshList.push(max);
        this.add(max);

        const lights = new BasicLights(this);
        this.add(lights, car);

        // Add some coins
        for (let i = 0; i < 12; i++) {
            var coin = new Coin(this);
            coin.position.set(
                2 * car.maxPos * Math.random() - 2.5,
                0,
                -(250 * Math.random())
            );
            this.add(coin);
            this.collidableMeshList.push(coin);
        }
    }

    addToUpdateList(obj) {
      this.state.updateList.push(obj);
    }

    findCollisions(obj, collidableMeshList) {
        var thisBB = new THREE.Box3()
            .copy(obj.bb)
            .applyMatrix4(obj.matrixWorld);
        for (const mesh of collidableMeshList) {
            var thatBB = new THREE.Box3()
                .copy(mesh.bb)
                .applyMatrix4(mesh.matrixWorld);
            if (thisBB.intersectsBox(thatBB)) return mesh;
        }
        return undefined;
    }

    update(timeStamp) {
        const { startTime, updateList, pause, newGameStarted } = this.state;
        if (this.stopped) {
          this.gameSpeed = Math.max(0, this.gameSpeed - 0.25);
          // return;
        }

        if (!newGameStarted) {
            // car continues bobbling even when paused
            // updateList[31].bobble(timeStamp);
        }


        if (!pause && newGameStarted){
          // accelerate or decelerate if appropriate
          if (this.accelerating)
            this.gameSpeed = Math.min(this.maxGameSpeed, this.gameSpeed + 0.05);
          else {
            if (!this.stopped) {
              // decelerate if slowing down from acceleration
              if (this.gameSpeed >= this.minGameSpeed)
                this.gameSpeed = Math.max(this.minGameSpeed, this.gameSpeed - 0.1);
              // accelerate if starting up from stopped state
              else this.gameSpeed = Math.min(this.maxGameSpeed, this.gameSpeed + 0.1);
            }
          }

          // night mode calculations
          // calculate start time on game start
          if (startTime == null) {
            this.state.startTime = Date.now() / 1000;
          } else {
            const currentTime = Date.now() / 1000;
            this.timeElapsed = currentTime - this.state.startTime;
          }

          // toggle night mode
          if (this.timeElapsed > this.threshold) {
            this.night = !this.night;
            this.timeElapsed = 0;
            this.state.startTime = Date.now() / 1000;
            this.threshold = 50;
          }

          for (const obj of updateList) {
            obj.update(timeStamp);
          }
        }

        if (pause && newGameStarted) {
          this.state.startTime = Date.now() / 1000 + this.timeElapsed;
        }
    }
}

export default Washington;

// if (this.state.night) {
//   this.background = new Color(0x345063);
//   this.fog.color = new Color(0x345063);
// } else {
//   this.background = new Color(0x7ec0ee);
//   this.fog.color = new Color(0x7ec0ee);
// }
