import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
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
    Grass,
    Coin,
} from 'objects';
import { BasicLights } from 'lights';
import * as THREE from 'three';

class Washington extends Scene {
    constructor(camera) {
        super();

        this.state = {
            gui: new Dat.GUI(),
            updateList: [],
        };

<<<<<<< HEAD
        this.gameSpeed = 0.5;
=======
        this.gameSpeed = 0;
>>>>>>> 846c309fc9e4adc6e5185021a2f8f9f515cdfd3b

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

        const lights = new BasicLights();
        this.add(lights, car);

        // Add some coins
        for (let i = 0; i < 5; i++) {
          var coin = new Coin(this);
          coin.position.set(car.maxPos * Math.random() - 2, 0, -(50 + 5 * i * Math.random()));
          this.add(coin);
          this.collidableMeshList.push(coin);
        }
        // const coin = new Coin(this);
        // coin.position.set(5 * Math.random() - 2, 0, -(50 + 10 * Math.random()));
        // this.add(coin);
        // this.collidableMeshList.push(coin);
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
        const { updateList } = this.state;

        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default Washington;
