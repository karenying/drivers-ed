import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { FemalePedestrian, MalePedestrian } from 'objects';
import { BasicLights } from 'lights';

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
        const femalePedestrian = new FemalePedestrian(this);
        femalePedestrian.position.set(0, 0, 0)
        const malePedestrian = new MalePedestrian(this);
        malePedestrian.position.set(5, 0, 0)
        const lights = new BasicLights();
        this.add(femalePedestrian, malePedestrian, lights);

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
