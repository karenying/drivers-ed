import { Scene, Color, MeshLambertMaterial } from 'three';
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
} from 'objects';
import { BasicLights } from 'lights';
import * as THREE from 'three';

const backgroundColors = [];
class Washington extends Scene {
    constructor(camera) {
        super();

        this.state = {
            updateList: [],
            pause: true,
            timeElapsed: -1,
            threshold: 10,
            startTime: null,
        };

        this.gameSpeed = 1;
        this.camera = camera;
        this.background = new Color(0x7ec0ee);
        this.night = false;
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

        // lampPositions
        const lampPositions = [
            0,
            -40,
            -80,
            -120,
            -160,
            -200,
        ];

        for (let i = 0; i < 11; i++) {
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

        // Add obstacle
        let fox = new Fox(this);
        fox.position.set(Math.random() * 6 - 3, 0.5, -(50 + 5 * Math.random()));
        this.add(fox);
        this.collidableMeshList.push(fox);

        var chadMaterials = {
            eye: new MeshLambertMaterial({
                color: 0x36699c,
                flatShading: true,
            }),
            hair: new MeshLambertMaterial({
                color: 0xd1c569,
                flatShading: true,
            }),
            skin: new MeshLambertMaterial({
                color: 0xb48a78,
                flatShading: true,
            }),
            shorts: new MeshLambertMaterial({
                color: 0xed7490,
                flatShading: true,
            }),
            shirt: new MeshLambertMaterial({
                color: 0x72afed,
                flatShading: true,
            }),
            shoes: new MeshLambertMaterial({
                color: 0x3b2403,
                flatShading: true,
            }),
        };
        let chad = new MalePedestrianShorts(this, chadMaterials);
        chad.position.set(
            Math.random() * 6 - 3,
            0.5,
            -(70 + 5 * Math.random())
        );
        this.add(chad);
        // this.collidableMeshList.push(chad);

        const lights = new BasicLights(this);
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
        const { startTime, updateList, pause } = this.state;

        if (!pause){

          // change color of sky at night
          // figures out time elapsed since beginning
          if (startTime == null) {
            this.state.startTime = Date.now() / 1000;
          } else {
            const currentTime = Date.now() / 1000;
            this.state.timeElapsed = currentTime - this.state.startTime;
          }

          // toggle night mode
          if (this.state.timeElapsed > this.state.threshold) {
            this.state.night = !this.state.night;
            this.state.startTime = Date.now() / 1000;
            this.state.threshold = 20;
          }

          if (this.state.night) {
            this.background = new Color(0x0c0052);
          } else {
            this.background = new Color(0x7ec0ee);
          }

          for (const obj of updateList) {
              obj.update(timeStamp);
          }
        }
    }
}

export default Washington;
