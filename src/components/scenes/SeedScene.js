import * as Dat from 'dat.gui';
import { Scene, Color, MeshLambertMaterial} from 'three';
import { FemalePedestrianDress, MalePedestrianShorts } from 'objects';
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
        var femaleDressMaterials = {
            eye: new MeshLambertMaterial({
                color: 0x3b2606,
                flatShading: true
            }),
            hair: new MeshLambertMaterial({
                color: 0x000000,
                flatShading: true
            }),
            skin: new MeshLambertMaterial({
                color: 0xb48A78,
                flatShading: true
            }),
            dress: new MeshLambertMaterial({
                color: 0x7015d1,
                flatShading: true
            }),
            shoes: new MeshLambertMaterial({
                color: 0xd8d1e0,
                flatShading: true
            })
        };
        const femalePedestrian = new FemalePedestrianDress(this, femaleDressMaterials);
        femalePedestrian.position.set(0, 0, 0);

        var maleShortsMaterials = {
            eye: new MeshLambertMaterial({
                color: 0x36699c,
                flatShading: true
            }),
            hair: new MeshLambertMaterial({
                color: 0xd1c569,
                flatShading: true
            }),
            skin: new MeshLambertMaterial({
                color: 0xb48A78,
                flatShading: true
            }),
            shorts: new MeshLambertMaterial({
                color: 0xed7490,
                flatShading: true
            }),
            shirt: new MeshLambertMaterial({
                color: 0x72afed,
                flatShading: true
            }),
            shoes: new MeshLambertMaterial({
                color: 0x3b2403,
                flatShading: true
            })
        };
        const malePedestrian = new MalePedestrianShorts(this, maleShortsMaterials);
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
