import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Driver, Pedestrian, Ground } from 'objects';
import { BasicLights } from 'lights';

import * as THREE from 'three';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        const land = new Land();
        const flower = new Flower(this);
        const lights = new BasicLights();
        lights.position.set(0, 15, 15);
        this.add(lights);

        // Add driver
        const driver = new Driver(this);
        driver.position.set(0, 1, -2);
        this.add(driver);

        // Add pedestrian
        const pedestrian = new Pedestrian(this);
        this.add(pedestrian);
        pedestrian.position.set(-pedestrian.maxPos, 0, 2 + 2 * Math.random());

        // Add ground
        // groundR = []
        // groundL = []
        // road = []
        for (let i = 0; i < 8; i++) {
          var groundR = new Ground(this, 10, 10, new THREE.Color("rgb(10, 200, 30)"), true);
          var groundL = new Ground(this, 10, 10, new THREE.Color("rgb(0, 255, 0)"), true);
          var road = new Ground(this, 10, 10, new THREE.Color("rgb(50, 50, 50)"), false);
          groundR.position.set(-10, 0, 9.5 * i)
          groundL.position.set(10, 0, 9.5 * i)
          road.position.set(0, 0, 9.5 * i)
          this.add(groundR, groundL, road);
        }
        // const groundR = new Ground(this, 10, 10, new THREE.Color("rgb(10, 200, 30)"), true);
        // const groundL = new Ground(this, 10, 10, new THREE.Color("rgb(0, 255, 0)"), true);
        // const road = new Ground(this, 10, 10, new THREE.Color("rgb(50, 50, 50)"), false);
        // groundR.position.set(-10, 0, 0)
        // groundL.position.set(10, 0, 0)
        // this.add(groundR, groundL, road);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }

}

export default SeedScene;
