import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Coin, Fox, Tree, Building } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        const land = new Land();
        const flower = new Flower(this);
        const coin = new Coin(this);
        const fox = new Fox(this);
        const tree = new Tree(this);
        const building = new Building(this);
        building.state.type = 3;
        building.init();
        tree.state.type = 2;
        tree.create();
        tree.position.set(2, 0, 2);
        const lights = new BasicLights();
        this.add(building, lights);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
